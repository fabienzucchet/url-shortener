"""Definition of the database session."""

import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

docker = os.getenv("DOCKER")
db_user = os.getenv("DB_USER", "postgres")
db_name = os.getenv("DB_NAME", "postgres")
db_host = os.getenv("DB_HOST", "localhost")
db_password = os.getenv("DB_PASSWORD")

if docker:  # With docker-compose, we use a postgresql database
    SQLALCHEMY_DATABASE_URL = "postgresql://{}:{}@{}/{}".format(
        db_user, db_password, db_host, db_name
    )
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    print("Database connected", flush=True)

else:  # For tests, we use a sqlite database
    SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
