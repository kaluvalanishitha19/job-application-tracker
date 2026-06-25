from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import applications
from app.routes import applications, interview_stages
from app.routes import applications, interview_stages, recruiter_contacts

app = FastAPI(title="Job Application Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applications.router)
app.include_router(applications.router)
app.include_router(interview_stages.router)
app.include_router(applications.router)
app.include_router(interview_stages.router)
app.include_router(recruiter_contacts.router)


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}