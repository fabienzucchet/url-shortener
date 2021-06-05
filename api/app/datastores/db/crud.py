"""Create Read Update Delete operations related to the database."""

from sqlalchemy.orm import Session
from sqlalchemy import or_
from sqlalchemy.sql.expression import true


from . import models, schemas


#### URLs ####
def get_url_by_id(db: Session, url_id: int):
    return db.query(models.Url).filter(models.Url.id == url_id, models.Url.is_delete != True).first()


def get_url_by_short_url(db: Session, short_url: str):
    return db.query(models.Url).filter(models.Url.short_url == short_url, models.Url.is_active == True).first()


def delete_url(db: Session, url_id: str):
    url_to_delete = db.query(models.Url).filter(
        models.Url.id == url_id).first()
    url_to_delete.is_delete = True
    url_to_delete.is_active = False
    db.commit()
    db.refresh(url_to_delete)
    return url_to_delete


def put_url(db: Session, url: schemas.UrlCreate):
    db_url = models.Url(**url.dict())
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url


def get_all_urls(db: Session):
    return db.query(models.Url).all()


def get_user_urls(db: Session, username: str):
    return db.query(models.Url).filter(models.Url.owner_username == username).all()

#### Users ####


def get_user(db: Session, user: schemas.UserCreate):
    return db.query(models.User).filter(or_(models.User.username == user.username, models.User.email == user.email)).first()

def update_user_username(db: Session, user_id: int, username: str):
    db_user = (db.query(models.User).filter(models.User.id == user_id).first())
    db_user.username = username
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user_email(db: Session, user_id: int, email: str):
    db_user = (db.query(models.User).filter(models.User.id == user_id).first())
    db_user.email = email
    db.commit()
    db.refresh(db_user)
    return db_user

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(email=user.email, username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
