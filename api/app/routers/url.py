"""API router for the /example/ endpoint."""

from datetime import timedelta

from fastapi import FastAPI, Depends, Request, HTTPException, Cookie, Response, status, Header, APIRouter
from sqlalchemy.orm import Session
from starlette.status import HTTP_403_FORBIDDEN

from ..datastores.db import crud, schemas
from ..dependencies import get_db, get_timeseries_client, get_current_user

from ..datastores.common import EnrichedUrl
from ..datastores.tsdb import queries


from typing import List

import datetime


router = APIRouter(prefix="/url", tags=["url"])


@router.get("/", response_model=List[schemas.Url])
async def get_my_urls(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.get_user_urls(db=db, username=user["login"])


@router.put("/", response_model=schemas.Url, status_code=status.HTTP_201_CREATED)
async def put_url(url: schemas.UrlBase, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if crud.get_url_by_short_url(db=db, short_url=url.short_url):
        raise HTTPException(
            status_code=400, detail="Short url already registered")
    url = schemas.UrlCreate(**url.dict(), owner_username=user["login"])
    return crud.put_url(db=db, url=url)

 
@router.get("/id/{url_id}", response_model=EnrichedUrl)
async def get_url_by_id(url_id: int, db: Session = Depends(get_db), tsdb=Depends(get_timeseries_client), start: int = -60, step: int = 5, user=Depends(get_current_user)):
    url = crud.get_url_by_id(db=db, url_id=url_id)
    if url.owner_username != user["login"]:
        raise HTTPException(
            status_code=403, detail="You are not the owner of this URL")
    stats = []
    if url is not None:
        stats = queries.get_stats_url(
            q=tsdb.query_api(),
            _start=datetime.timedelta(minutes=start),
            _every=datetime.timedelta(minutes=step),
            url_id=url_id
        )
    enriched_url = EnrichedUrl(url=url, stats=stats)
    return enriched_url


@router.delete("/{url_id}", response_model=schemas.Url)
async def delete_url(url_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    url = crud.get_url_by_id(db=db, url_id=url_id)
    if url is None:
        raise HTTPException(
            status_code=400, detail="There is no such URL to delete")
    if url.owner_username != user["login"]:
        raise HTTPException(
            status_code=403, detail="You are not the owner of this URL")
    return crud.delete_url(db=db, url_id=url_id)
