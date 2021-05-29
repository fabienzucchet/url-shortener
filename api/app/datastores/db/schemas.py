"""Data schema used for validation in API requests and responses."""

from datetime import timedelta, datetime
from typing import Optional
import validators

from pydantic import BaseModel, ValidationError, validator, AnyUrl

class UrlBase(BaseModel):
    original_url: AnyUrl
    short_url: Optional[AnyUrl] = None

class Url(UrlBase):
    id: int
    is_active: bool
    is_delete: bool

    class Config:
        orm_mode = True

class UrlCreate(UrlBase):
    pass

