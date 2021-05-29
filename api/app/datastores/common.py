from .db import schemas
from typing import List

from pydantic import BaseModel


class EnrichedUrl(BaseModel):
    url: schemas.Url
    stats: List
