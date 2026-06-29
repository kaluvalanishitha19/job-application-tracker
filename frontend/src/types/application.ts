export interface Application {
  id: number;
  company_name: string;
  job_title: string;
  job_description: string | null;
  job_url: string | null;
  status: string;
  applied_date: string;
  location: string | null;
  salary_range: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationCreate {
  company_name: string;
  job_title: string;
  job_description?: string;
  job_url?: string;
  status?: string;
  location?: string;
  salary_range?: string;
  notes?: string;
}

export interface InterviewStage {
  id: number;
  application_id: number;
  stage_name: string;
  scheduled_date: string | null;
  completed: boolean;
  feedback: string | null;
  created_at: string;
}

export interface RecruiterContact {
  id: number;
  application_id: number;
  name: string;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  notes: string | null;
  created_at: string;
}

export interface AIInsight {
  id: number;
  application_id: number;
  insight_type: "keyword_extraction" | "jd_summary" | "interview_prep";
  content: string;
  created_at: string;
}

export const APPLICATION_STATUSES = [
  "applied",
  "interviewing",
  "offer",
  "rejected",
] as const;