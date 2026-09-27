export type RequirementCategory = 
  | "Experience"
  | "Technical"
  | "Certification"
  | "Financial"
  | "Legal"
  | "Staffing"
  | "Delivery"
  | "Compliance"
  | "Language";

export type RequirementStatus = "VERIFIED" | "PARTIAL" | "MISSING" | "AMBIGUOUS";
export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface Requirement {
  id: string;
  requirement: string;
  category: RequirementCategory | string;
  mandatory: boolean;
  evidenceNeeded: string;
  deadline?: string;
  importance: "LOW" | "MEDIUM" | "HIGH";
}

export interface AnalysisResult {
  requirementId: string;
  requirement: string;
  status: RequirementStatus;
  evidence: string | null;
  sourceDocument: string | null;
  explanation: string;
  actionItem?: string;
  confidence: number;
  risk: RiskLevel;
  mandatory: boolean;
}

export interface BidReadinessReport {
  score: number;
  verifiedCount: number;
  partialCount: number;
  missingCount: number;
  highRiskCount: number;
  results: AnalysisResult[];
  summary: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: "ready" | "uploading" | "error";
  content?: string; // For text/demo content
}
