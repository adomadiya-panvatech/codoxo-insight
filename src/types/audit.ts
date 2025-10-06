export type AuditStatus = "completed" | "in-progress" | "pending" | "review";
export type AuditCategory = "compliance" | "security" | "financial" | "operational" | "technical";

export interface Audit {
  id: string;
  name: string;
  category: AuditCategory;
  status: AuditStatus;
  progress: number;
  startDate: string;
  endDate: string;
  auditor: string;
  findings: number;
  riskLevel: "low" | "medium" | "high";
}
