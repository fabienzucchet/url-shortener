"""Data schema used for validation in API requests and responses."""

from typing import Optional, List

from pydantic import BaseModel, AnyUrl

#### URLs ####


class UrlBase(BaseModel):
    original_url: AnyUrl
    short_url: Optional[AnyUrl] = None
    owner_username: str


class Url(UrlBase):
    id: int
    is_active: bool
    is_delete: bool

    class Config:
        orm_mode = True


class UrlCreate(UrlBase):
    pass

#### Users ####


class UserBase(BaseModel):
    username: str
    email: str


class User(UserBase):
    id: int
    urls: List[Url] = []

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    pass
