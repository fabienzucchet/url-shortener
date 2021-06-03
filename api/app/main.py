"""Main module of Website Monitoring Tool"""
import os

from typing import List, Optional


from fastapi import FastAPI, Depends, Request, HTTPException, Cookie, Response, status, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session


from .datastores.db import crud, models, schemas
from .dependencies import get_db, get_timeseries_client, get_current_user
from .datastores.db.database import engine

from .datastores.tsdb import queries
from influxdb_client.client.write_api import SYNCHRONOUS

from .datastores.common import RequestMetadata
from user_agents import parse

from .exceptions.RequiresLoginException import RequiresLoginException

from .routers import auth, url, user


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

# CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(auth.router)
app.include_router(url.router)
app.include_router(user.router)


@app.exception_handler(RequiresLoginException)
async def exception_handler(request: Request, exc: RequiresLoginException) -> Response:
    return RedirectResponse(url='/auth/login')


@app.get('/me')
async def show_me(user=Depends(get_current_user)):
    return {"user": user}


@app.get("/", response_model=schemas.Url)
async def get_url_by_short_url(short_url: str, username: str = None, db: Session = Depends(get_db), tsdb=Depends(get_timeseries_client), ua_string: Optional[str] = Header(None), referer: Optional[str] = Header(None)):
    print(short_url)
    url = crud.get_url_by_short_url(db=db, short_url=short_url)
    if url is None:
        return Response(status_code=204)
    request_metadata = RequestMetadata(referer=referer)
    if ua_string is not None:
        user_agent = parse(ua_string)
        request_metadata.browser = user_agent.browser.family
        request_metadata.os = user_agent.os.family
        request_metadata.device = user_agent.device.family
    queries.new_access_url(
        w=tsdb.write_api(write_options=SYNCHRONOUS),
        url_id=url.id,
        username=username,
        metadata=request_metadata
    )
    return url


@app.on_event("shutdown")
def shutdown_event(tsdb=Depends(get_timeseries_client)):
    tsdb.Close()
