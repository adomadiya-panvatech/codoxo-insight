export type AuditStatus = "completed" | "in-progress" | "pending" | "review";
export type AuditCategory = "claims-processing" | "payment-integrity" | "provider-network" | "compliance" | "utilization-management";

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
