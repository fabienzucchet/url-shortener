"""Create Read Update Delete operations related to the database."""

from datetime import datetime, timedelta

from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from sqlalchemy import case, literal_column
from sqlalchemy.sql.expression import true


from . import models, schemas

def get_url_by_id(db:Session, url_id: int):
    return db.query(models.Url).filter(models.Url.id == url_id, models.Url.is_delete != True).first()

def get_url_by_short_url(db:Session, short_url: str):
    return db.query(models.Url).filter(models.Url.short_url == short_url, models.Url.is_active == True).first()

def get_all_urls(db:Session):
    return db.query(models.Url).all()

def get_user_urls(db:Session):
    pass

def delete_url(db:Session, url_id: str):
    url_to_delete = db.query(models.Url).filter(models.Url.id == url_id).first()
    url_to_delete.is_delete = True
    url_to_delete.is_active = False
    db.commit()
    db.refresh(url_to_delete)
    return url_to_delete

def put_url(db:Session, url:schemas.UrlCreate):
    db_url = models.Url(original_url = url.original_url, short_url = url.short_url)
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url
