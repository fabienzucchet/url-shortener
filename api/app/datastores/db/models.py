"""Database models."""

from sqlalchemy import (
    Column,
    ForeignKey,
    Boolean,
    Integer,
    String,
    Interval,
    DateTime,
    Float,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql.elements import Null
from sqlalchemy.sql.expression import null

from .database import Base


class Url(Base):
    __tablename__ = "urls"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    original_url = Column(String, nullable=False)
    short_url = Column(String, unique=True, index=True)

    is_active = Column(Boolean, default=True)
    is_delete = Column(Boolean, default=False)

    owner_username = Column(String, ForeignKey('users.username'))
    owner = relationship("User", back_populates="urls")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)

    urls = relationship("Url", back_populates="owner")
