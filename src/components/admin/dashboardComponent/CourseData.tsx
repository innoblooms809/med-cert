'use client';

import React from "react";

interface Course {
  title: string;
  author: string;
  courseRole: string;
  specialization: string;
}

interface Props {
  courses: Course[];
}

export default function RecentCoursesCard({ courses }: Props) {
  const styles = {
    card: {
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      background: "#fff",
      padding: 24,
      marginBottom: 24,
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 600,
      margin: 0,
    },
    cardAction: {
      fontSize: 14,
      fontWeight: 500,
      color: "#4f46e5",
      cursor: "pointer",
    },
    cardBody: {
      overflowX: "auto" as const,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
    },
    tableHeader: {
      textAlign: "left" as const,
      fontWeight: 600,
      padding: "12px 8px",
      borderBottom: "1px solid #e5e7eb",
      color: "#334155",
    },
    tableRow: {
      borderBottom: "1px solid #e5e7eb",
    },
    tableCell: {
      padding: "12px 8px",
      color: "#475569",
    },
    statusBadge: {
      padding: "4px 8px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 500,
    },
    viewAllButton: {
      marginTop: 16,
      padding: "8px 16px",
      borderRadius: 8,
      border: "none",
      background: "#f8fafc",
      color: "#64748b",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>Recent Courses</h2>
        <div style={styles.cardAction}>View All</div>
      </div>

      <div style={styles.cardBody}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Title</th>
              <th style={styles.tableHeader}>For</th>
              <th style={styles.tableHeader}>Specialization</th>
              <th style={styles.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={idx} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <div style={{ fontWeight: 500 }}>{course.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{course.author}</div>
                </td>
                <td style={styles.tableCell}>{course.courseRole}</td>
                <td style={styles.tableCell}>{course.specialization}</td>
                <td style={styles.tableCell}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background: "#dcfce7",
                      color: "#166534",
                    }}
                  >
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        style={styles.viewAllButton}
        onMouseEnter={(e: any) => {
          e.target.style.background = "#e2e8f0";
          e.target.style.color = "#4f46e5";
        }}
        onMouseLeave={(e: any) => {
          e.target.style.background = "#f8fafc";
          e.target.style.color = "#64748b";
        }}
      >
        View All Courses
      </button>
    </div>
  );
}
