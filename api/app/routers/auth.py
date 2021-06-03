"""API router for the /login/ endpoint."""
import os

from typing import Optional

from fastapi import APIRouter, Response
from fastapi.responses import RedirectResponse
from jose import jwt
from requests_oauthlib import OAuth2Session

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
async def login(code: Optional[str] = None, state: Optional[str] = None):

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

        token = jwt.encode({"sub": user_data['login'], "user": user_data}, JWT_SECRET_KEY)

        response = RedirectResponse(os.getenv("FRONT_URL",'http://localhost:3000'))
        response.set_cookie("session", token)

        return response


@router.get("/logout")
async def logout():
    response = RedirectResponse('/example')
    response.delete_cookie("session")

    return response
