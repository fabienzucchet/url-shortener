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


router = APIRouter(prefix="/user", tags=["user"])


@router.put("/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user(db=db, user=user) is not None:
        raise HTTPException(status_code=400,
                            detail="User with this username or email already exists")
    return crud.create_user(db=db, user=user)


@router.get("/url/", response_model=List[schemas.Url])
async def get_user_urls(username: str, db: Session = Depends(get_db)):
    return crud.get_user_urls(db=db, username=username)
