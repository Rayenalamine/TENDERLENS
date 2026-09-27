import { BidReadinessReport, UploadedFile } from "./types";

export const demoTenderFiles: UploadedFile[] = [
  {
    name: "Tender_2026_Enterprise_Digital_Services.pdf",
    size: 2048576,
    type: "application/pdf",
    status: "ready",
    content: "Enterprise Digital Services Platform - Technical Procurement. Requirements: ..."
  }
];

export const demoEvidenceFiles: UploadedFile[] = [
  {
    name: "Company_Profile.pdf",
    size: 1548576,
    type: "application/pdf",
    status: "ready"
  },
  {
    name: "Projects_Alpha_Beta.pdf",
    size: 3548576,
    type: "application/pdf",
    status: "ready"
  },
  {
    name: "Team_CVs.pdf",
    size: 548576,
    type: "application/pdf",
    status: "ready"
  }
];

export const demoReport: BidReadinessReport = {
  score: 74,
  verifiedCount: 8,
  partialCount: 3,
  missingCount: 2,
  highRiskCount: 2,
  summary: "Moderate readiness — resolve 2 critical requirements before preparing the final bid.",
  results: [
    {
      requirementId: "req-1",
      requirement: "Minimum 3 years of software development experience",
      status: "VERIFIED",
      evidence: "Company Profile indicates 5 years of operation.",
      sourceDocument: "Company_Profile.pdf",
      explanation: "The company profile explicitly states establishment in 2021, providing 5 years of continuous software development experience.",
      confidence: 0.98,
      risk: "LOW",
      mandatory: true
    },
    {
      requirementId: "TECH-04",
      requirement: "Clause TECH-04 [TECHNICAL]: 'Minimum of three (3) delivered enterprise production deployments using Java / Spring Boot microservices within the last 36 months.'",
      status: "PARTIAL",
      evidence: "Found 1 verified match (Project Alpha - Spring Boot 3.1). Two additional projects required. Project Gamma uses Node.js and does not qualify.",
      sourceDocument: "Projects_Alpha_Beta.pdf",
      explanation: "Found 1 verified match (Project Alpha - Spring Boot 3.1). Two additional projects required. Project Gamma uses Node.js and does not qualify.",
      actionItem: "Source two additional enterprise Java case studies or request consortium partner credit.",
      confidence: 0.95,
      risk: "HIGH",
      mandatory: true
    },
    {
      requirementId: "req-3",
      requirement: "Java / Spring Boot experience",
      status: "VERIFIED",
      evidence: "Project Alpha used Java/Spring Boot.",
      sourceDocument: "Projects_Alpha_Beta.pdf",
      explanation: "Project Alpha architecture details explicitly list Java and Spring Boot as the core backend technologies.",
      confidence: 0.99,
      risk: "LOW",
      mandatory: true
    },
    {
      requirementId: "req-4",
      requirement: "React experience",
      status: "VERIFIED",
      evidence: "Project Beta frontend built with React.",
      sourceDocument: "Projects_Alpha_Beta.pdf",
      explanation: "Project Beta describes a modern SPA frontend built exclusively with React and Redux.",
      confidence: 0.99,
      risk: "LOW",
      mandatory: true
    },
    {
      requirementId: "REQ-01",
      requirement: "Clause REQ-01 [MANDATORY]: 'ISO/IEC 27001 or ISO 9001:2015 Certification in Software Engineering Services.'",
      status: "MISSING",
      evidence: null,
      sourceDocument: null,
      explanation: "Scanned uploaded company dossier (profile.pdf, certifications.pdf). Zero matching certification records found. Immediate bid-disqualification risk.",
      actionItem: "Procure or verify accredited ISO certificate before bid deadline.",
      confidence: 0.99,
      risk: "CRITICAL",
      mandatory: true
    },
    {
      requirementId: "req-6",
      requirement: "At least 5 qualified technical staff",
      status: "VERIFIED",
      evidence: "7 technical CVs provided.",
      sourceDocument: "Team_CVs.pdf",
      explanation: "The CV document contains resumes for 7 technical staff members, exceeding the minimum requirement of 5.",
      confidence: 0.99,
      risk: "LOW",
      mandatory: true
    },
    {
      requirementId: "req-7",
      requirement: "Financial statements for the previous 2 years",
      status: "MISSING",
      evidence: null,
      sourceDocument: null,
      explanation: "No financial documents were included in the uploaded evidence.",
      confidence: 0.95,
      risk: "CRITICAL",
      mandatory: true
    },
    {
      requirementId: "req-8",
      requirement: "Project delivery within 60 days",
      status: "AMBIGUOUS",
      evidence: "Past projects delivered in 3-4 months.",
      sourceDocument: "Projects_Alpha_Beta.pdf",
      explanation: "Past projects show 90-120 day delivery timelines. No explicit commitment or methodology for a 60-day delivery is present.",
      confidence: 0.85,
      risk: "MODERATE",
      mandatory: true
    },
    {
      requirementId: "GOV-02",
      requirement: "Clause GOV-02 [COMPLIANCE]: 'Demonstrated compliance with regional data residency and GDPR/local privacy frameworks.'",
      status: "VERIFIED",
      evidence: "Section 4.2 of Security Whitepaper (data_residency_policy.pdf). Fully compliant.",
      sourceDocument: "data_residency_policy.pdf",
      explanation: "Section 4.2 of Security Whitepaper (data_residency_policy.pdf). Fully compliant.",
      confidence: 0.98,
      risk: "LOW",
      mandatory: true
    },
    {
      requirementId: "req-10",
      requirement: "Data protection compliance",
      status: "PARTIAL",
      evidence: "Basic privacy policy mentioned.",
      sourceDocument: "Company_Profile.pdf",
      explanation: "A standard privacy policy is mentioned, but specific compliance with national data protection laws (INPDP) is not explicitly detailed.",
      confidence: 0.78,
      risk: "MODERATE",
      mandatory: true
    },
    {
      requirementId: "req-11",
      requirement: "Technical support after delivery",
      status: "VERIFIED",
      evidence: "SLA included in past projects.",
      sourceDocument: "Projects_Alpha_Beta.pdf",
      explanation: "Previous projects indicate a standard 12-month SLA post-delivery, meeting the typical support requirement.",
      confidence: 0.90,
      risk: "LOW",
      mandatory: false
    },
    {
      requirementId: "req-12",
      requirement: "Previous government/public-sector project experience",
      status: "PARTIAL",
      evidence: "One quasi-public project.",
      sourceDocument: "Projects_Alpha_Beta.pdf",
      explanation: "Project Beta was for a state-owned enterprise, but not a direct ministry. May or may not fully satisfy strict public sector definitions.",
      confidence: 0.80,
      risk: "MODERATE",
      mandatory: false
    },
    {
      requirementId: "req-13",
      requirement: "Dedicated project manager",
      status: "VERIFIED",
      evidence: "Project Manager CV included.",
      sourceDocument: "Team_CVs.pdf",
      explanation: "A CV for a dedicated IT Project Manager with PMP certification is included in the team documents.",
      confidence: 0.98,
      risk: "LOW",
      mandatory: true
    },
    {
      requirementId: "req-14",
      requirement: "Arabic and French communication capability",
      status: "VERIFIED",
      evidence: "Language skills in CVs.",
      sourceDocument: "Team_CVs.pdf",
      explanation: "Team CVs list native Arabic and professional French fluency for key client-facing roles.",
      confidence: 0.97,
      risk: "LOW",
      mandatory: true
    }
  ]
};
