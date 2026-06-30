import { useNavigate } from "react-router-dom";
import type { Application } from "../types/application";

interface ApplicationCardProps {
  application: Application;
}

const STATUS_COLORS: Record<string, string> = {
  applied: "#3b82f6",
  interviewing: "#f59e0b",
  offer: "#10b981",
  rejected: "#ef4444",
};

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const navigate = useNavigate();
  const statusColor = STATUS_COLORS[application.status] ?? "#6b7280";

  return (
    <div
      onClick={() => navigate(`/applications/${application.id}`)}
      style={{
        border: "1px solid #2a2a2a",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#1a1a1a",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "16px", color: "#fff" }}>
            {application.job_title}
          </h3>
          <p style={{ margin: "4px 0 0", color: "#9ca3af", fontSize: "14px" }}>
            {application.company_name}
          </p>
        </div>
        <span
          style={{
            backgroundColor: statusColor,
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "12px",
            textTransform: "capitalize",
          }}
        >
          {application.status}
        </span>
      </div>
      {application.location && (
        <p style={{ margin: "8px 0 0", color: "#6b7280", fontSize: "13px" }}>
          📍 {application.location}
        </p>
      )}
      <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "12px" }}>
        Applied {new Date(application.applied_date).toLocaleDateString()}
      </p>
    </div>
  );
}