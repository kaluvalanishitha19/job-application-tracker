from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.database import get_db
from app.models.application import RecruiterContact, Application
from app.schemas.recruiter_contact import (
    RecruiterContactCreate, RecruiterContactUpdate, RecruiterContactResponse
)

router = APIRouter(prefix="/api/recruiter-contacts", tags=["recruiter-contacts"])


@router.post("/", response_model=RecruiterContactResponse, status_code=201)
async def create_recruiter_contact(payload: RecruiterContactCreate, db: AsyncSession = Depends(get_db)):
    application = await db.get(Application, payload.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    contact = RecruiterContact(**payload.model_dump())
    db.add(contact)
    await db.commit()
    await db.refresh(contact)
    return contact


@router.get("/", response_model=List[RecruiterContactResponse])
async def list_recruiter_contacts(application_id: Optional[int] = None, db: AsyncSession = Depends(get_db)):
    query = select(RecruiterContact)
    if application_id:
        query = query.where(RecruiterContact.application_id == application_id)
    result = await db.execute(query)
    return result.scalars().all()


@router.patch("/{contact_id}", response_model=RecruiterContactResponse)
async def update_recruiter_contact(
    contact_id: int, payload: RecruiterContactUpdate, db: AsyncSession = Depends(get_db)
):
    contact = await db.get(RecruiterContact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Recruiter contact not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(contact, field, value)

    await db.commit()
    await db.refresh(contact)
    return contact


@router.delete("/{contact_id}", status_code=204)
async def delete_recruiter_contact(contact_id: int, db: AsyncSession = Depends(get_db)):
    contact = await db.get(RecruiterContact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Recruiter contact not found")
    await db.delete(contact)
    await db.commit()