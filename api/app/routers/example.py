"""API router for the /example/ endpoint."""

from datetime import timedelta

from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session

from ..sql import crud, schemas
from ..dependencies import get_db

router = APIRouter(prefix="/example", tags=["example"])


@router.get("/")
async def root():
    return {"message": "Hello World"}
