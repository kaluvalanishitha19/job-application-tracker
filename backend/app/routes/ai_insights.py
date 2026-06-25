from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.database import get_db
from app.models.application import AIInsight, Application
from app.schemas.ai_insight import AIInsightRequest, AIInsightResponse
from app.services import ai_service

router = APIRouter(prefix="/api/ai-insights", tags=["ai-insights"])

VALID_INSIGHT_TYPES = {"keyword_extraction", "jd_summary", "interview_prep"}


@router.post("/", response_model=AIInsightResponse, status_code=201)
async def generate_insight(payload: AIInsightRequest, db: AsyncSession = Depends(get_db)):
    if payload.insight_type not in VALID_INSIGHT_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"insight_type must be one of {VALID_INSIGHT_TYPES}"
        )

    application = await db.get(Application, payload.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    if not application.job_description:
        raise HTTPException(
            status_code=400,
            detail="Application has no job_description to analyze"
        )

    if payload.insight_type == "keyword_extraction":
        content = await ai_service.extract_keywords(application.job_description)
    elif payload.insight_type == "jd_summary":
        content = await ai_service.summarize_job_description(application.job_description)
    else:
        content = await ai_service.generate_interview_prep(application.job_description)

    insight = AIInsight(
        application_id=payload.application_id,
        insight_type=payload.insight_type,
        content=content,
    )
    db.add(insight)
    await db.commit()
    await db.refresh(insight)
    return insight


@router.get("/", response_model=List[AIInsightResponse])
async def list_insights(application_id: Optional[int] = None, db: AsyncSession = Depends(get_db)):
    query = select(AIInsight)
    if application_id:
        query = query.where(AIInsight.application_id == application_id)
    result = await db.execute(query)
    return result.scalars().all()