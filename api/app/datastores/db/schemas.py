"""Data schema used for validation in API requests and responses."""

from typing import Optional, List

from pydantic import BaseModel, AnyUrl

import datetime

#### URLs ####


class UrlBase(BaseModel):
    original_url: AnyUrl
    short_url: Optional[str] = None
    name: Optional[str] = None


class Url(UrlBase):
    id: int
    is_active: bool
    is_delete: bool

    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None

    class Config:
        orm_mode = True


class UrlCreate(UrlBase):
    owner_username: str


#### Users ####


class UserBase(BaseModel):
    username: str
    email: str


class User(UserBase):
    id: int
    urls: List[Url] = []

    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    pass
