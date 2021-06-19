"""Dependencies from the project"""
import os

from typing import Optional

from fastapi import Cookie
from jose import jwt, JWTError

from .datastores.db.database import SessionLocal
from .datastores.tsdb.database import client
from .exceptions.RequiresLoginException import RequiresLoginException

# AUTHENTICATION DEPENDENCY #

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")


def get_current_user(session: Optional[str] = Cookie(None)):
    if session is None:
        raise RequiresLoginException
    try:
        payload = jwt.decode(session, JWT_SECRET_KEY)
    except JWTError:
        raise RequiresLoginException

    return payload["user"]


# POSTGRESQL DATABASE DEPENDENCY #


def get_db():
    """Create a connection to the database and make sure it is close at the end

    Yields:
        sqlalchemy.Session: Database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# TIMESERIES DATABASE DEPENDENCY #


def get_timeseries_client():
    tsdb = client
    yield tsdb
