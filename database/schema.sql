-- Job Application Tracker Database Schema

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_description TEXT,
    job_url VARCHAR(500),
    status VARCHAR(50) NOT NULL DEFAULT 'applied',
    applied_date DATE NOT NULL DEFAULT CURRENT_DATE,
    location VARCHAR(255),
    salary_range VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE interview_stages (
    id SERIAL PRIMARY KEY,
    application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    stage_name VARCHAR(100) NOT NULL,
    scheduled_date TIMESTAMP,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    feedback TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE recruiter_contacts (
    id SERIAL PRIMARY KEY,
    application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ai_insights (
    id SERIAL PRIMARY KEY,
    application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    insight_type VARCHAR(50) NOT NULL, -- 'keyword_extraction', 'jd_summary', 'interview_prep'
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_interview_stages_application_id ON interview_stages(application_id);
CREATE INDEX idx_recruiter_contacts_application_id ON recruiter_contacts(application_id);
CREATE INDEX idx_ai_insights_application_id ON ai_insights(application_id);