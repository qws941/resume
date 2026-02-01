-- Migration: Add automation tracking tables
-- Description: Tables for automation runs, job matches, and platform sessions
-- Author: Sprint 1 - Career Automation OS

-- Automation run tracking
CREATE TABLE IF NOT EXISTS automation_runs (
    id TEXT PRIMARY KEY,
    run_type TEXT NOT NULL,  -- 'search', 'apply', 'sync', 'full'
    platform TEXT,           -- 'linkedin', 'saramin', 'jobkorea', 'wanted', 'all'
    status TEXT NOT NULL DEFAULT 'pending',  -- 'pending', 'running', 'completed', 'failed'
    jobs_found INTEGER DEFAULT 0,
    jobs_matched INTEGER DEFAULT 0,
    jobs_applied INTEGER DEFAULT 0,
    jobs_failed INTEGER DEFAULT 0,
    config JSON,
    error_log JSON DEFAULT '[]',
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_automation_runs_status ON automation_runs(status);
CREATE INDEX IF NOT EXISTS idx_automation_runs_created_at ON automation_runs(created_at);

-- AI job matching results
CREATE TABLE IF NOT EXISTS job_matches (
    id TEXT PRIMARY KEY,
    application_id TEXT NOT NULL,
    job_id TEXT NOT NULL,
    platform TEXT NOT NULL,
    match_score INTEGER NOT NULL,
    skill_score INTEGER DEFAULT 0,
    experience_score INTEGER DEFAULT 0,
    location_score INTEGER DEFAULT 0,
    salary_score INTEGER DEFAULT 0,
    ai_reasoning TEXT,
    keywords_matched JSON DEFAULT '[]',
    keywords_missing JSON DEFAULT '[]',
    recommendation TEXT,  -- 'strong_match', 'good_match', 'weak_match', 'skip'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES job_applications(id)
);

CREATE INDEX IF NOT EXISTS idx_job_matches_application_id ON job_matches(application_id);
CREATE INDEX IF NOT EXISTS idx_job_matches_score ON job_matches(match_score);

-- Platform session management
CREATE TABLE IF NOT EXISTS platform_sessions (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL UNIQUE,
    session_data JSON NOT NULL,
    cookies JSON,
    user_agent TEXT,
    is_valid INTEGER DEFAULT 1,
    last_validated_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_platform_sessions_platform ON platform_sessions(platform);

-- Resume variants for tailoring
CREATE TABLE IF NOT EXISTS resume_variants (
    id TEXT PRIMARY KEY,
    base_resume_id TEXT NOT NULL,
    company TEXT NOT NULL,
    job_id TEXT,
    variant_type TEXT NOT NULL,  -- 'tailored', 'cover_letter', 'portfolio'
    content TEXT NOT NULL,
    ai_optimizations JSON,
    match_score INTEGER,
    file_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resume_variants_company ON resume_variants(company);
CREATE INDEX IF NOT EXISTS idx_resume_variants_base ON resume_variants(base_resume_id);
