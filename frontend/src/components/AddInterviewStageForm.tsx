import { useState } from "react";
import { createInterviewStage } from "../api/interviewStages";

interface AddInterviewStageFormProps {
  applicationId: number;
  onAdded: () => void;
  onCancel: () => void;
}

export default function AddInterviewStageForm({
  applicationId,
  onAdded,
  onCancel,
}: AddInterviewStageFormProps) {
  const [stageName, setStageName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stageName.trim()) {
      setError("Stage name is required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createInterviewStage(applicationId, stageName.trim());
      setStageName("");
      onAdded();
    } catch (err) {
      setError("Failed to add interview stage.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "12px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={stageName}
          onChange={(e) => setStageName(e.target.value)}
          placeholder="e.g. Phone Screen, Onsite, Final Round"
          style={{
            flex: 1,
            minWidth: 0,
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #2a2a2a",
            backgroundColor: "#0a0a0a",
            color: "#fff",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#3b82f6",
            color: "#fff",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Adding..." : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "8px 14px",
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
      {error && <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px" }}>{error}</p>}
    </form>
  );
}