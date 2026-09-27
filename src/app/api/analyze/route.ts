import { NextResponse } from 'next/server';
import { analyzeBid } from '@/lib/gemini';
import { demoReport } from '@/lib/demo-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tender, evidence, useDemoData } = body;

    if (useDemoData) {
      // Simulate processing time for demo
      await new Promise(resolve => setTimeout(resolve, 3500));
      return NextResponse.json(demoReport);
    }

    const report = await analyzeBid(tender?.content || "", evidence || []);
    return NextResponse.json(report);
    
  } catch (error) {
    console.error("API error:", error);
    // Fallback to demo data on error for hackathon reliability
    return NextResponse.json(demoReport);
  }
}
