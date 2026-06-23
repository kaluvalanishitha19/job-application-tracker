from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import applications

app = FastAPI(title="Job Application Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applications.router)


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}