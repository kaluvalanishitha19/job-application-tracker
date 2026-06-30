# AI-Powered Job Application Tracker

A full-stack platform for managing the job search end-to-end — tracking applications, interview stages, and recruiter contacts, with an integrated AI layer that extracts resume keywords, summarizes job descriptions, and generates tailored interview prep notes.

<!-- 🔧 TODO: Replace with a real screenshot or GIF of the dashboard once available -->
<!-- ![Dashboard Screenshot](./screenshots/dashboard.png) -->

**🔗 Live Demo:** _coming soon_
<!-- 🔧 TODO: Replace with your deployed URL once live, e.g. https://job-tracker.vercel.app -->

---

## Overview

Job searching at scale means juggling dozens of applications, each with its own status, contacts, and notes — and re-reading every job description to figure out what to emphasize. This project solves both problems: a structured tracker for the operational side, and an AI layer that does the repetitive reading and writing work for you.

I built this as both a real tool I use during my own job search and a project to demonstrate a production-style full-stack + AI architecture: a typed React frontend, a FastAPI backend with a relational schema, and an LLM integration layer built on LangChain and the OpenAI API.

## Features

**Application Tracking**
- Add, update, and manage job applications with company, role, status, and source
- Track interview stages and recruiter contacts per application
- Notes and history per application
- Status-based dashboard view across the pipeline

**AI Layer (LangChain + OpenAI API)**
- **Resume keyword extraction** — pulls the key skills and terms from a resume to compare against a job description
- **Job description summarization** — condenses long postings into the requirements and responsibilities that actually matter
- **Interview prep generation** — produces tailored prep notes from the application's job description and history, so prep time goes into the highest-leverage roles first

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript |
| Backend | FastAPI (Python) |
| Database | PostgreSQL |
| AI / LLM | OpenAI API, LangChain |
| Styling | CSS |

## Architecture

```
job-application-tracker/
├── frontend/    # React + TypeScript client
├── backend/     # FastAPI application, REST endpoints, LangChain AI pipelines
└── database/    # PostgreSQL schema and migrations
```

The frontend communicates with the FastAPI backend over REST. The backend handles CRUD operations against PostgreSQL for application data, and routes AI-feature requests (keyword extraction, JD summarization, interview prep) through LangChain to the OpenAI API, returning structured results to the client.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- PostgreSQL
- An OpenAI API key

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set environment variables
cp .env.example .env  # add your DATABASE_URL and OPENAI_API_KEY

uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Database
```bash
cd database
# Run the schema/migration files against your PostgreSQL instance
```

<!-- 🔧 TODO: Confirm these commands match your actual entry point / scripts before publishing -->

## What I Learned / Built

- Designed a relational schema to model applications, interview stages, and contacts as related entities rather than flat records
- Built REST endpoints in FastAPI with request validation and structured error handling
- Integrated LangChain to chain prompts for three distinct AI tasks (extraction, summarization, generation) against a single OpenAI backend
- Connected a typed React frontend to a Python backend, including handling async AI responses in the UI

## Roadmap

- [ ] Deploy frontend (Vercel) and backend (Railway/Render)
- [ ] Application detail view with full history and notes
- [ ] Authentication for multi-user support
- [ ] Export application data to CSV

---

Built by [Nishitha Kaluvala](https://github.com/kaluvalanishitha19) — [Portfolio](https://nishithakaluvala-portfolio.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/kaluvalanishitha)
