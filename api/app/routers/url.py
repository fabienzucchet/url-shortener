"""API router for the /example/ endpoint."""

from datetime import timedelta

from fastapi import FastAPI, Depends, Request, HTTPException, Cookie, Response, status, Header, APIRouter
from sqlalchemy.orm import Session

from ..datastores.db import crud, schemas
from ..dependencies import get_db, get_timeseries_client, get_current_user

from ..datastores.common import EnrichedUrl
from ..datastores.tsdb import queries


from typing import List

import datetime


router = APIRouter(prefix="/url", tags=["url"])


@router.get("/", response_model=List[schemas.Url])
async def get_my_urls(username: str, db: Session = Depends(get_db)):
    return crud.get_user_urls(db=db, username=username)


@router.put("/", response_model=schemas.Url, status_code=status.HTTP_201_CREATED)
async def put_url(url: schemas.UrlCreate, db: Session = Depends(get_db)):
    if crud.get_url_by_short_url(db=db, short_url=url.short_url):
        raise HTTPException(
            status_code=400, detail="Short url already registered")
    return crud.put_url(db=db, url=url)


@router.get("/stats/{url_id}", response_model=EnrichedUrl)
async def get_url_by_id(url_id: int, db: Session = Depends(get_db), tsdb=Depends(get_timeseries_client), start: int = -60, step: int = 5):
    resp = crud.get_url_by_id(db=db, url_id=url_id)
    stats = []
    if resp is not None:
        stats = queries.get_stats_url(
            q=tsdb.query_api(),
            _start=datetime.timedelta(minutes=start),
            _every=datetime.timedelta(minutes=step),
            url_id=url_id
        )
    enriched_url = EnrichedUrl(url=resp, stats=stats)
    return enriched_url


@router.delete("/{url_id}", response_model=schemas.Url)
async def delete_url(url_id: int, db: Session = Depends(get_db)):
    if crud.get_url_by_id(db=db, url_id=url_id) is None:
        raise HTTPException(
            status_code=400, detail="There is no such URL to delete")
    return crud.delete_url(db=db, url_id=url_id)
