from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.database import get_db
from app.models.application import InterviewStage, Application
from app.schemas.interview_stage import (
    InterviewStageCreate, InterviewStageUpdate, InterviewStageResponse
)

router = APIRouter(prefix="/api/interview-stages", tags=["interview-stages"])


@router.post("/", response_model=InterviewStageResponse, status_code=201)
async def create_interview_stage(payload: InterviewStageCreate, db: AsyncSession = Depends(get_db)):
    application = await db.get(Application, payload.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    stage = InterviewStage(**payload.model_dump())
    db.add(stage)
    await db.commit()
    await db.refresh(stage)
    return stage


@router.get("/", response_model=List[InterviewStageResponse])
async def list_interview_stages(application_id: Optional[int] = None, db: AsyncSession = Depends(get_db)):
    query = select(InterviewStage)
    if application_id:
        query = query.where(InterviewStage.application_id == application_id)
    result = await db.execute(query)
    return result.scalars().all()


@router.patch("/{stage_id}", response_model=InterviewStageResponse)
async def update_interview_stage(
    stage_id: int, payload: InterviewStageUpdate, db: AsyncSession = Depends(get_db)
):
    stage = await db.get(InterviewStage, stage_id)
    if not stage:
        raise HTTPException(status_code=404, detail="Interview stage not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(stage, field, value)

    await db.commit()
    await db.refresh(stage)
    return stage


@router.delete("/{stage_id}", status_code=204)
async def delete_interview_stage(stage_id: int, db: AsyncSession = Depends(get_db)):
    stage = await db.get(InterviewStage, stage_id)
    if not stage:
        raise HTTPException(status_code=404, detail="Interview stage not found")
    await db.delete(stage)
    await db.commit()