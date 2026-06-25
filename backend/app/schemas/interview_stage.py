from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class InterviewStageBase(BaseModel):
    stage_name: str
    scheduled_date: Optional[datetime] = None
    completed: bool = False
    feedback: Optional[str] = None


class InterviewStageCreate(InterviewStageBase):
    application_id: int


class InterviewStageUpdate(BaseModel):
    stage_name: Optional[str] = None
    scheduled_date: Optional[datetime] = None
    completed: Optional[bool] = None
    feedback: Optional[str] = None


class InterviewStageResponse(InterviewStageBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    application_id: int
    created_at: datetime