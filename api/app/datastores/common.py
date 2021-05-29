from .db import schemas
from typing import List, Optional

from pydantic import BaseModel


class EnrichedUrl(BaseModel):
    url: Optional[schemas.Url] = None
    stats: List
