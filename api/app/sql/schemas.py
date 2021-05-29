"""Data schema used for validation in API requests and responses."""

from datetime import timedelta, datetime
from typing import Optional
import validators

from pydantic import BaseModel, ValidationError, validator
