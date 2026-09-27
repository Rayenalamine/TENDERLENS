import { GoogleGenAI } from '@google/genai';
import { BidReadinessReport } from './types';
import { demoReport } from './demo-data';
import { parseGeminiResponse } from './readinessEngine';

export async function analyzeBid(
  tenderContent: string,
  evidenceContents: { name: string; content: string }[]
): Promise<BidReadinessReport> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log("No GEMINI_API_KEY found, falling back to demo mode.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    return demoReport;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
You are an expert procurement and bid-readiness analyzer.
Your task is to analyze a Tender/RFP document against provided Company Evidence documents.

Tender Document:
${tenderContent.substring(0, 5000)} // Limiting size for hackathon safety

Company Evidence Documents:
${evidenceContents.map(doc => `--- Document: ${doc.name} ---\n${doc.content.substring(0, 5000)}\n`).join("\n")}

Extract the requirements from the Tender and verify them against the Evidence.

Return a JSON object strictly matching this TypeScript interface:
interface AnalysisResult {
  requirementId: string;
  requirement: string;
  status: "VERIFIED" | "PARTIAL" | "MISSING" | "AMBIGUOUS";
  evidence: string | null;
  sourceDocument: string | null;
  explanation: string;
  confidence: number;
  risk: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  mandatory: boolean;
}

interface BidReadinessReport {
  score: number; // 0-100
  verifiedCount: number;
  partialCount: number;
  missingCount: number;
  highRiskCount: number;
  results: AnalysisResult[];
  summary: string;
}

Ensure the output is valid JSON without markdown wrapping. Only output JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    return parseGeminiResponse(response.text);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return demoReport;
  }
}
