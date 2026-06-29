import { useState } from "react";
import type { ApplicationCreate } from "../types/application";
import { createApplication } from "../api/applications";

interface CreateApplicationFormProps {
  onCreated: () => void;
  onCancel: () => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #2a2a2a",
  backgroundColor: "#0a0a0a",
  color: "#fff",
  fontSize: "14px",
  marginBottom: "12px",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "13px",
  display: "block",
  marginBottom: "4px",
};

export default function CreateApplicationForm({ onCreated, onCancel }: CreateApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationCreate>({
    company_name: "",
    job_title: "",
    job_description: "",
    job_url: "",
    location: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof ApplicationCreate, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.company_name || !formData.job_title) {
      setError("Company name and job title are required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createApplication(formData);
      onCreated();
    } catch (err) {
      setError("Failed to create application. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #2a2a2a",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "24px",
        backgroundColor: "#1a1a1a",
      }}
    >
      <h3 style={{ color: "#fff", marginTop: 0 }}>New Application</h3>

      <label style={labelStyle}>Company Name *</label>
      <input
        style={inputStyle}
        value={formData.company_name}
        onChange={(e) => handleChange("company_name", e.target.value)}
        placeholder="e.g. Stripe"
      />

      <label style={labelStyle}>Job Title *</label>
      <input
        style={inputStyle}
        value={formData.job_title}
        onChange={(e) => handleChange("job_title", e.target.value)}
        placeholder="e.g. Frontend Engineer"
      />

      <label style={labelStyle}>Location</label>
      <input
        style={inputStyle}
        value={formData.location}
        onChange={(e) => handleChange("location", e.target.value)}
        placeholder="e.g. Remote, San Francisco"
      />

      <label style={labelStyle}>Job URL</label>
      <input
        style={inputStyle}
        value={formData.job_url}
        onChange={(e) => handleChange("job_url", e.target.value)}
        placeholder="https://..."
      />

      <label style={labelStyle}>Job Description</label>
      <textarea
        style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
        value={formData.job_description}
        onChange={(e) => handleChange("job_description", e.target.value)}
        placeholder="Paste the job description here..."
      />

      {error && <p style={{ color: "#ef4444", fontSize: "13px" }}>{error}</p>}

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#3b82f6",
            color: "#fff",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Creating..." : "Create Application"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid #2a2a2a",
            backgroundColor: "transparent",
            color: "#9ca3af",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}