from .db import schemas
from typing import List, Optional

from pydantic import BaseModel


class EnrichedUrl(BaseModel):
    url: Optional[schemas.Url] = None
    stats: List


class RequestMetadata:
    def __init__(
        self, referer: str = "", os: str = "", browser: str = "", device: str = ""
    ):
        self.referer = referer
        self.os = os
        self.browser = browser
        self.device = device
