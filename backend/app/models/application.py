from sqlalchemy import (
    Column, Integer, String, Text, Boolean, DateTime, Date, ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(255), nullable=False)
    job_title = Column(String(255), nullable=False)
    job_description = Column(Text)
    job_url = Column(String(500))
    status = Column(String(50), nullable=False, default="applied")
    applied_date = Column(Date, server_default=func.current_date())
    location = Column(String(255))
    salary_range = Column(String(100))
    notes = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    interview_stages = relationship(
        "InterviewStage", back_populates="application", cascade="all, delete-orphan"
    )
    recruiter_contacts = relationship(
        "RecruiterContact", back_populates="application", cascade="all, delete-orphan"
    )
    ai_insights = relationship(
        "AIInsight", back_populates="application", cascade="all, delete-orphan"
    )


class InterviewStage(Base):
    __tablename__ = "interview_stages"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id", ondelete="CASCADE"), nullable=False)
    stage_name = Column(String(100), nullable=False)
    scheduled_date = Column(DateTime)
    completed = Column(Boolean, default=False)
    feedback = Column(Text)
    created_at = Column(DateTime, server_default=func.now())

    application = relationship("Application", back_populates="interview_stages")


class RecruiterContact(Base):
    __tablename__ = "recruiter_contacts"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    email = Column(String(255))
    phone = Column(String(50))
    linkedin_url = Column(String(500))
    notes = Column(Text)
    created_at = Column(DateTime, server_default=func.now())

    application = relationship("Application", back_populates="recruiter_contacts")


class AIInsight(Base):
    __tablename__ = "ai_insights"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id", ondelete="CASCADE"), nullable=False)
    insight_type = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    application = relationship("Application", back_populates="ai_insights")