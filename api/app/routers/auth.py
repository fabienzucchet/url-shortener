"""API router for the /login/ endpoint."""
import os

from typing import Optional
from datetime import datetime

from fastapi import APIRouter, Response, Depends
from fastapi.responses import RedirectResponse
from jose import jwt
from requests_oauthlib import OAuth2Session
from sqlalchemy.orm import Session

from ..datastores.db import crud
from ..dependencies import get_db
from ..datastores.db.schemas import UserCreate

router = APIRouter(prefix="/auth", tags=["login"])

OAUTH_SERVER = os.getenv("OAUTH_SERVER")
AUTHORIZATION_URL = os.getenv("OAUTH_AUTHORIZATION_URL", "/oauth/authorize")
TOKEN_URL = os.getenv("OAUTH_TOKEN_URL", "/oauth/token")
USERINFO_URL = os.getenv("OAUTH_USERINFO_URL", "/api/user/show/me")
REDIRECT_URI = os.getenv("OAUTH_REDIRECT_URI", "http://localhost:8000/auth/login")
CLIENT_ID = os.getenv("OAUTH_CLIENT_ID")
CLIENT_SECRET = os.getenv("OAUTH_CLIENT_SECRET")
SCOPE = os.getenv("OAUTH_SCOPE", "default")

oauth = OAuth2Session(CLIENT_ID, redirect_uri=REDIRECT_URI, scope=SCOPE)

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")


@router.get("/login")
async def login(code: Optional[str] = None, state: Optional[str] = None, db: Session = Depends(get_db)):

    if code is None:
        authorization_url, state = oauth.authorization_url(OAUTH_SERVER + AUTHORIZATION_URL)
        return RedirectResponse(authorization_url)

    else:
        token = oauth.fetch_token(
            OAUTH_SERVER + TOKEN_URL,
            authorization_response=REDIRECT_URI,
            code=code,
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET
        )

        res = oauth.get(OAUTH_SERVER + USERINFO_URL)

        user_data = res.json()


        user = UserCreate(username=user_data['login'], email=user_data['email'])

        # Register user
        db_user = crud.get_user(db=db, user=user)

        if db_user is None:
            crud.create_user(db=db, user=user)

        else:
            if db_user.username != user_data['login']:
                crud.update_user_username(db=db, user_id=db_user.id, username=user_data['login'])

            if db_user.email != user_data['email']:
                crud.update_user_email(db=db, user_id=db_user.id, email=user_data['email'])

        # JWT login
        token = jwt.encode({"sub": user_data['login'], "user": user_data}, JWT_SECRET_KEY)

        response = RedirectResponse(os.getenv("FRONT_URL",'http://localhost:3000'))
        response.set_cookie("session", token)

        return response


@router.get("/logout")
async def logout():
    response = RedirectResponse('/')
    response.delete_cookie("session")

    return response
