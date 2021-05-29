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

from .database import Base

class Url(Base):
    __tablename__ = "urls"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    original_url = Column(String)
    short_url = Column(String, unique=True, index=True)

    is_active = Column(Boolean, default=True)
    is_delete = Column(Boolean, default=False)
