"""Main module of Website Monitoring Tool"""
import os

from typing import List


from fastapi import FastAPI, Depends, Request, HTTPException
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

@app.get("/url", response_model=List[schemas.Url])
async def get_my_urls(db: Session = Depends(get_db)):
    return crud.get_all_urls(db=db)

@app.put("/url/", response_model=schemas.Url)
async def put_url(url: schemas.UrlCreate, db: Session = Depends(get_db)):
    if crud.get_url_by_short_url(db=db, short_url=url.short_url):
        raise HTTPException(status_code=400, detail="Short url already registered")
    return crud.put_url(db=db, url=url)

@app.get("/url/id/{url_id}", response_model=schemas.Url)
async def get_url_by_id(url_id: int, db: Session = Depends(get_db)):
    return crud.get_url_by_id(db=db, url_id=url_id)

@app.delete("/url/{url_id}", response_model=schemas.Url)
async def delete_url(url_id: int, db: Session = Depends(get_db)):
    if crud.get_url_by_id(db=db, url_id=url_id) is None:
        raise HTTPException(status_code=400, detail="There is no such URL to delete")
    return crud.delete_url(db=db, url_id=url_id)

@app.get("/{short_url:path}", response_model=schemas.Url)
async def get_url_by_short_url(short_url: str, db: Session = Depends(get_db)):
    url = crud.get_url_by_short_url(db=db, short_url=short_url)
    if url is None:
        raise HTTPException(status_code=204, detail="There is no such short URL")
    return url
