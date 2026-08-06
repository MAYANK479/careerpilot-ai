import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

function ScheduledInterviews() {
  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Upcoming Interviews</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
            Manage and join your confirmed recruiter meetings.
          </p>
        </div>
      </div>

      <div
        className="stat-card"
        style={{
          marginTop: "2rem",
          padding: "4rem 2rem",
          textAlign: "center",
          border: "1px dashed var(--input-border)",
          borderRadius: "var(--radius-card)"
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--text-main)", marginBottom: "0.5rem" }}>
          No Interviews Scheduled
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto 1.5rem auto", lineHeight: "1.5" }}>
          When a recruiter invites you to an interview, you'll see it here. Keep applying and polishing your skills!
        </p>
        <Link
          to="/interview"
          className="btn-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "auto",
            padding: "0.75rem 1.5rem",
            textDecoration: "none"
          }}
        >
          Practice Mock Interview <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default ScheduledInterviews;
