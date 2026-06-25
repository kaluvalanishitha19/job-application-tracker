from pydantic import BaseModel, ConfigDict
from datetime import datetime


class AIInsightRequest(BaseModel):
    application_id: int
    insight_type: str  # "keyword_extraction", "jd_summary", or "interview_prep"


class AIInsightResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    application_id: int
    insight_type: str
    content: str
    created_at: datetime