"""Main module of Website Monitoring Tool"""
import os

from datetime import timedelta

from fastapi import FastAPI, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session


from .sql import crud, models, schemas
from .dependencies import get_db
from .sql.database import engine

from .routers import example

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
app.include_router(example.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
