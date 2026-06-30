import { useState } from "react";
import { createRecruiterContact } from "../api/recruiterContacts";

interface AddRecruiterContactFormProps {
  applicationId: number;
  onAdded: () => void;
  onCancel: () => void;
}

export default function AddRecruiterContactForm({
  applicationId,
  onAdded,
  onCancel,
}: AddRecruiterContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createRecruiterContact(applicationId, name.trim(), email.trim() || undefined);
      setName("");
      setEmail("");
      onAdded();
    } catch (err) {
      setError("Failed to add recruiter contact.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #2a2a2a",
    backgroundColor: "#0a0a0a",
    color: "#fff",
    fontSize: "14px",
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "12px" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Recruiter name"
          style={inputStyle}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          style={inputStyle}
        />
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
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