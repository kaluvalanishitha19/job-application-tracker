import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Application, InterviewStage, RecruiterContact, AIInsight } from "../types/application";
import { getApplication } from "../api/applications";
import { getInterviewStages } from "../api/interviewStages";
import { getRecruiterContacts } from "../api/recruiterContacts";
import { getAIInsights, generateAIInsight } from "../api/aiInsights";
import AddInterviewStageForm from "./AddInterviewStageForm";
import AddRecruiterContactForm from "./AddRecruiterContactForm";

const INSIGHT_LABELS: Record<string, string> = {
  keyword_extraction: "Keywords",
  jd_summary: "Summary",
  interview_prep: "Interview Prep",
};

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const applicationId = Number(id);

  const [application, setApplication] = useState<Application | null>(null);
  const [stages, setStages] = useState<InterviewStage[]>([]);
  const [contacts, setContacts] = useState<RecruiterContact[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingType, setGeneratingType] = useState<string | null>(null);
  const [showStageForm, setShowStageForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  async function loadAll() {
    setLoading(true);
    try {
      const [app, stageList, contactList, insightList] = await Promise.all([
        getApplication(applicationId),
        getInterviewStages(applicationId),
        getRecruiterContacts(applicationId),
        getAIInsights(applicationId),
      ]);
      setApplication(app);
      setStages(stageList);
      setContacts(contactList);
      setInsights(insightList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, [applicationId]);

  async function handleGenerateInsight(type: "keyword_extraction" | "jd_summary" | "interview_prep") {
    setGeneratingType(type);
    try {
      await generateAIInsight(applicationId, type);
      const updated = await getAIInsights(applicationId);
      setInsights(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to generate insight. Make sure the application has a job description.");
    } finally {
      setGeneratingType(null);
    }
  }

  async function refreshStages() {
    const updated = await getInterviewStages(applicationId);
    setStages(updated);
  }

  async function refreshContacts() {
    const updated = await getRecruiterContacts(applicationId);
    setContacts(updated);
  }

  if (loading) {
    return <p style={{ color: "#9ca3af", padding: "24px" }}>Loading...</p>;
  }

  if (!application) {
    return <p style={{ color: "#ef4444", padding: "24px" }}>Application not found.</p>;
  }

  const sectionStyle: React.CSSProperties = {
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "#1a1a1a",
  };

  const smallButtonStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #2a2a2a",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "13px",
    cursor: "pointer",
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px", boxSizing: "border-box" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "none",
          color: "#9ca3af",
          cursor: "pointer",
          marginBottom: "16px",
          fontSize: "14px",
        }}
      >
        ← Back to all applications
      </button>

      <h1 style={{ color: "#fff", marginBottom: "4px" }}>{application.job_title}</h1>
      <p style={{ color: "#9ca3af", marginBottom: "24px" }}>{application.company_name}</p>

      {application.job_description && (
        <div style={sectionStyle}>
          <h3 style={{ color: "#fff", marginTop: 0 }}>Job Description</h3>
          <p style={{ color: "#9ca3af", fontSize: "14px", whiteSpace: "pre-wrap" }}>
            {application.job_description}
          </p>
        </div>
      )}

      <div style={sectionStyle}>
        <h3 style={{ color: "#fff", marginTop: 0 }}>AI Insights</h3>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {(["keyword_extraction", "jd_summary", "interview_prep"] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleGenerateInsight(type)}
              disabled={generatingType === type}
              style={{
                ...smallButtonStyle,
                cursor: generatingType === type ? "not-allowed" : "pointer",
              }}
            >
              {generatingType === type ? "Generating..." : `Generate ${INSIGHT_LABELS[type]}`}
            </button>
          ))}
        </div>

        {insights.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "13px" }}>No insights generated yet.</p>
        ) : (
          [...insights].reverse().map((insight) => (
            <div key={insight.id} style={{ marginBottom: "12px" }}>
              <p style={{ color: "#3b82f6", fontSize: "12px", marginBottom: "4px" }}>
                {INSIGHT_LABELS[insight.insight_type]}
              </p>
              <p style={{ color: "#d1d5db", fontSize: "14px", whiteSpace: "pre-wrap" }}>
                {insight.content}
              </p>
            </div>
          ))
        )}
      </div>

      <div style={sectionStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ color: "#fff", margin: 0 }}>Interview Stages</h3>
          <button onClick={() => setShowStageForm(!showStageForm)} style={smallButtonStyle}>
            {showStageForm ? "Cancel" : "+ Add Stage"}
          </button>
        </div>

        {showStageForm && (
          <AddInterviewStageForm
            applicationId={applicationId}
            onAdded={() => {
              setShowStageForm(false);
              refreshStages();
            }}
            onCancel={() => setShowStageForm(false)}
          />
        )}

        {stages.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "12px" }}>
            No interview stages yet.
          </p>
        ) : (
          <div style={{ marginTop: "12px" }}>
            {stages.map((stage) => (
              <p key={stage.id} style={{ color: "#d1d5db", fontSize: "14px" }}>
                {stage.completed ? "✅" : "⏳"} {stage.stage_name}
              </p>
            ))}
          </div>
        )}
      </div>

      <div style={sectionStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ color: "#fff", margin: 0 }}>Recruiter Contacts</h3>
          <button onClick={() => setShowContactForm(!showContactForm)} style={smallButtonStyle}>
            {showContactForm ? "Cancel" : "+ Add Contact"}
          </button>
        </div>

        {showContactForm && (
          <AddRecruiterContactForm
            applicationId={applicationId}
            onAdded={() => {
              setShowContactForm(false);
              refreshContacts();
            }}
            onCancel={() => setShowContactForm(false)}
          />
        )}

        {contacts.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "12px" }}>
            No recruiter contacts yet.
          </p>
        ) : (
          <div style={{ marginTop: "12px" }}>
            {contacts.map((contact) => (
              <p key={contact.id} style={{ color: "#d1d5db", fontSize: "14px" }}>
                {contact.name} {contact.email && `· ${contact.email}`}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}