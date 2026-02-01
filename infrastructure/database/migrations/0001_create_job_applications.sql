-- Migration: Create job_applications table
-- Description: Stores job applications and their status tracking
-- Author: resume-cli backend construction

CREATE TABLE IF NOT EXISTS job_applications (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL,
    job_id TEXT NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    url TEXT NOT NULL,
    location TEXT,
    salary TEXT,
    deadline TEXT,
    status TEXT NOT NULL DEFAULT 'saved',
    match_score INTEGER DEFAULT 0,
    resume_id TEXT,
    cover_letter TEXT,
    notes TEXT,
    job_details JSON,
    ai_analysis JSON,
    status_history JSON DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    applied_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_job_applications_platform ON job_applications(platform);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at);
