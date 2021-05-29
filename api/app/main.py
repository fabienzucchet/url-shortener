"""Main module of Website Monitoring Tool"""
import os

from typing import List, Optional


from fastapi import FastAPI, Depends, Request, HTTPException, Cookie, Response, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session


from .datastores.db import crud, models, schemas
from .dependencies import get_db, get_timeseries_client, get_current_user
from .datastores.db.database import engine

from .datastores.tsdb import queries
from influxdb_client.client.write_api import SYNCHRONOUS
from .datastores.common import EnrichedUrl

from .exceptions.RequiresLoginException import RequiresLoginException

from .routers import example, auth

import datetime

docker = os.getenv("DOCKER")

models.Base.metadata.create_all(bind=engine)

# Define tags to categorize routes
tags_metadata = [
    {
        "name": "example",
        "description": "Description",
    },
]

# Create the API instance
app = FastAPI(
    title="URL shortener",
    description="URL shortener",
    version="0.1.0",
    openapi_tags=tags_metadata,
)

# Include routers
app.include_router(auth.router)
app.include_router(example.router)


@app.exception_handler(RequiresLoginException)
async def exception_handler(request: Request, exc: RequiresLoginException) -> Response:
    return RedirectResponse(url='/auth/login')


@app.get('/me')
async def show_me(user=Depends(get_current_user)):
    return {"user": user}


@app.get("/url", response_model=List[schemas.Url])
async def get_my_urls(db: Session = Depends(get_db)):
    return crud.get_all_urls(db=db)


@app.put("/url/", response_model=schemas.Url, status_code=status.HTTP_201_CREATED)
async def put_url(url: schemas.UrlCreate, db: Session = Depends(get_db)):
    if crud.get_url_by_short_url(db=db, short_url=url.short_url):
        raise HTTPException(
            status_code=400, detail="Short url already registered")
    return crud.put_url(db=db, url=url)


@app.get("/url/id/{url_id}", response_model=EnrichedUrl)
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


@app.delete("/url/{url_id}", response_model=schemas.Url)
async def delete_url(url_id: int, db: Session = Depends(get_db)):
    if crud.get_url_by_id(db=db, url_id=url_id) is None:
        raise HTTPException(
            status_code=400, detail="There is no such URL to delete")
    return crud.delete_url(db=db, url_id=url_id)


@app.get("/{short_url:path}", response_model=schemas.Url)
async def get_url_by_short_url(short_url: str, username: str, db: Session = Depends(get_db), tsdb=Depends(get_timeseries_client)):
    url = crud.get_url_by_short_url(db=db, short_url=short_url)
    if url is None:
        raise HTTPException(
            status_code=204, detail="There is no such short URL")
    queries.new_access_url(
        w=tsdb.write_api(write_options=SYNCHRONOUS),
        url_id=url.id,
        username=username
    )
    return url


@app.put("/user/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user(db=db, user=user) is None:
        raise HTTPException(status_code=400,
                            detail="User with this username or email already exists")
    return crud.create_user(db=db, user=user)


@app.on_event("shutdown")
def shutdown_event(tsdb=Depends(get_timeseries_client)):
    tsdb.Close()
