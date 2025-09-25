"use client";

import React from "react";

interface Quiz {
  testType: "Objective" | "Subjective";
  testFor: string; // Doctor / Nurse
  specialization: string;
  totalQuestions: number;
  marking: string;
}

interface Props {
  quizzes: Quiz[];
}

export default function TestData({ quizzes }: Props) {
  const styles: Record<string, React.CSSProperties> = {
    card: {
      background: "#fff",
      borderRadius: 12,
      padding: 16,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: 24,
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    cardTitle: { fontSize: 18, fontWeight: 600 },
    cardAction: {
      fontSize: 14,
      color: "#4f46e5",
      cursor: "pointer",
    },
    cardBody: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse" },
    tableHeader: { textAlign: "left", padding: 8, color: "#64748b", fontWeight: 500 },
    tableRow: { borderBottom: "1px solid #e5e7eb" },
    tableCell: { padding: 8, verticalAlign: "middle" },
    statusBadge: {
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 500,
    },
    viewAllButton: {
      marginTop: 12,
      padding: "8px 16px",
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      background: "#f8fafc",
      color: "#64748b",
      cursor: "pointer",
      fontWeight: 500,
      transition: "all 0.2s",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>Recent Tests</h2>
        <div style={styles.cardAction}>
          View All
        </div>
      </div>

      <div style={styles.cardBody}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Type</th>
              <th style={styles.tableHeader}>For</th>
              <th style={styles.tableHeader}>Specialization</th>
              <th style={styles.tableHeader}>Questions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background: quiz.testType === "Objective" ? "#dbeafe" : "#fef3c7",
                      color: quiz.testType === "Objective" ? "#1e40af" : "#92400e",
                    }}
                  >
                    {quiz.testType}
                  </span>
                </td>
                <td style={styles.tableCell}>{quiz.testFor}</td>
                <td style={styles.tableCell}>{quiz.specialization}</td>
                <td style={styles.tableCell}>
                  {quiz.totalQuestions} Qs ({quiz.marking})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        style={styles.viewAllButton}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.background = "#e2e8f0";
          (e.target as HTMLButtonElement).style.color = "#4f46e5";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.background = "#f8fafc";
          (e.target as HTMLButtonElement).style.color = "#64748b";
        }}
      >
        View All Tests
      </button>
    </div>
  );
}
