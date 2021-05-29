"""Dependencies from the project"""

from .sql.database import SessionLocal


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
