from pydantic import BaseModel, ConfigDict
from datetime import date, datetime
from typing import Optional


class ApplicationBase(BaseModel):
    company_name: str
    job_title: str
    job_description: Optional[str] = None
    job_url: Optional[str] = None
    status: str = "applied"
    applied_date: Optional[date] = None
    location: Optional[str] = None
    salary_range: Optional[str] = None
    notes: Optional[str] = None


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(BaseModel):
    company_name: Optional[str] = None
    job_title: Optional[str] = None
    job_description: Optional[str] = None
    job_url: Optional[str] = None
    status: Optional[str] = None
    location: Optional[str] = None
    salary_range: Optional[str] = None
    notes: Optional[str] = None


class ApplicationResponse(ApplicationBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime