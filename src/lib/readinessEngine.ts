import { AnalysisResult, BidReadinessReport } from './types';
import { demoReport } from './demo-data';

export function calculateScore(results: AnalysisResult[]): number {
  if (!results || results.length === 0) return 0;

  const total = results.length;
  const verified = results.filter(r => r.status === 'VERIFIED').length;
  const partial = results.filter(r => r.status === 'PARTIAL').length;
  
  // Base score calculation
  let score = Math.round(((verified + (partial * 0.5)) / total) * 100);

  // Critical blocker cap
  const hasCriticalMissing = results.some(r => r.mandatory && r.status === 'MISSING');
  if (hasCriticalMissing) {
    score = Math.min(score, 49); // Cap at 49% if critical blockers exist
  }

  return score;
}

export function generateReport(results: AnalysisResult[]): BidReadinessReport {
  const verifiedCount = results.filter(r => r.status === 'VERIFIED').length;
  const partialCount = results.filter(r => r.status === 'PARTIAL' || r.status === 'AMBIGUOUS').length;
  const missingCount = results.filter(r => r.status === 'MISSING').length;
  const highRiskCount = results.filter(r => r.risk === 'HIGH' || r.risk === 'CRITICAL').length;
  
  const score = calculateScore(results);
  
  let summary = "";
  if (score >= 80 && highRiskCount === 0) {
    summary = "High readiness — proceed with bid preparation.";
  } else if (score >= 50) {
    summary = `Moderate readiness — resolve ${highRiskCount} critical/high risks before preparing the final bid.`;
  } else {
    summary = "Low readiness — significant gaps. Do not bid without major evidence collection.";
  }

  return {
    score,
    verifiedCount,
    partialCount,
    missingCount,
    highRiskCount,
    results,
    summary
  };
}

export function parseGeminiResponse(text: string | null | undefined): BidReadinessReport {
  if (!text) {
    return demoReport;
  }

  try {
    const rawData = JSON.parse(text);
    
    // Partial validation of schema
    if (!rawData || !Array.isArray(rawData.results)) {
      return demoReport;
    }

    // Responsible AI Guard: Enforce strict rules on the parsed results
    const guardedResults = rawData.results.map((r: any) => {
      let status = r.status || 'MISSING';
      
      // If confidence is 0 or evidence is empty, it cannot be VERIFIED
      if (status === 'VERIFIED' && (r.confidence === 0 || !r.evidence || r.evidence.trim() === '')) {
        status = 'MISSING';
      }
      
      return {
        ...r,
        status,
        requirementId: r.requirementId || `req-${Math.random().toString(36).substring(7)}`,
        requirement: r.requirement || 'Unknown Requirement',
        risk: r.risk || 'MODERATE',
        mandatory: !!r.mandatory,
        confidence: r.confidence || 0,
        explanation: r.explanation || 'No explanation provided.',
        evidence: r.evidence || null,
        sourceDocument: r.sourceDocument || null,
      } as AnalysisResult;
    });

    return generateReport(guardedResults);
  } catch (error) {
    // Clean fallback to demo report on API JSON error
    console.warn("Failed to parse Gemini response, falling back to demo report", error);
    return demoReport;
  }
}
