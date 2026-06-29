import { useEffect, useState } from "react";
import type { Application } from "../types/application";
import { getApplications } from "../api/applications";
import ApplicationCard from "./ApplicationCard";

const STATUS_FILTERS = ["all", "applied", "interviewing", "offer", "rejected"];

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function loadApplications() {
      setLoading(true);
      setError(null);
      try {
        const filter = statusFilter === "all" ? undefined : statusFilter;
        const data = await getApplications(filter);
        setApplications(data);
      } catch (err) {
        setError("Failed to load applications. Is the backend running?");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, [statusFilter]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h1 style={{ color: "#fff", fontSize: "24px", marginBottom: "8px" }}>
        Job Application Tracker
      </h1>
      <p style={{ color: "#9ca3af", marginBottom: "24px" }}>
        {applications.length} application{applications.length !== 1 ? "s" : ""}
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
              padding: "6px 14px",
              borderRadius: "16px",
              border: "1px solid #2a2a2a",
              backgroundColor: statusFilter === status ? "#3b82f6" : "#1a1a1a",
              color: "#fff",
              fontSize: "13px",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: "#9ca3af" }}>Loading...</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      {!loading && !error && applications.length === 0 && (
        <p style={{ color: "#9ca3af" }}>No applications yet.</p>
      )}

      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  );
}