from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class RecruiterContactBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    notes: Optional[str] = None


class RecruiterContactCreate(RecruiterContactBase):
    application_id: int


class RecruiterContactUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    notes: Optional[str] = None


class RecruiterContactResponse(RecruiterContactBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    application_id: int
    created_at: datetime