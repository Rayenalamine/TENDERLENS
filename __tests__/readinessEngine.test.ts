import { describe, it, expect } from 'vitest';
import { calculateScore, generateReport, parseGeminiResponse } from '../src/lib/readinessEngine';
import { AnalysisResult } from '../src/lib/types';
import { demoReport } from '../src/lib/demo-data';

describe('Readiness Engine', () => {
  describe('Score calculation', () => {
    it('calculates score proportionally based on verified items', () => {
      const results: AnalysisResult[] = [
        { requirementId: '1', requirement: 'Req 1', status: 'VERIFIED', evidence: 'x', explanation: 'x', confidence: 1, risk: 'LOW', mandatory: false, sourceDocument: null },
        { requirementId: '2', requirement: 'Req 2', status: 'MISSING', evidence: null, explanation: 'x', confidence: 1, risk: 'MODERATE', mandatory: false, sourceDocument: null },
      ];
      // 1 out of 2 verified = 50%
      expect(calculateScore(results)).toBe(50);
    });

    it('caps readiness score at 49% if critical blockers (mandatory+missing) exist', () => {
      const results: AnalysisResult[] = [
        { requirementId: '1', requirement: 'Req 1', status: 'VERIFIED', evidence: 'x', explanation: 'x', confidence: 1, risk: 'LOW', mandatory: false, sourceDocument: null },
        { requirementId: '2', requirement: 'Req 2', status: 'VERIFIED', evidence: 'x', explanation: 'x', confidence: 1, risk: 'LOW', mandatory: false, sourceDocument: null },
        { requirementId: '3', requirement: 'Req 3', status: 'VERIFIED', evidence: 'x', explanation: 'x', confidence: 1, risk: 'LOW', mandatory: false, sourceDocument: null },
        { requirementId: '4', requirement: 'Req 4', status: 'VERIFIED', evidence: 'x', explanation: 'x', confidence: 1, risk: 'LOW', mandatory: false, sourceDocument: null },
        // Critical blocker
        { requirementId: '5', requirement: 'Req 5', status: 'MISSING', evidence: null, explanation: 'x', confidence: 1, risk: 'CRITICAL', mandatory: true, sourceDocument: null },
      ];
      // 4 out of 5 is 80%, but capped because req 5 is missing AND mandatory
      expect(calculateScore(results)).toBe(49);
    });
  });

  describe('Edge case handling & Fallback activation', () => {
    it('falls back to demoReport on null, undefined, or empty text', () => {
      expect(parseGeminiResponse(null)).toEqual(demoReport);
      expect(parseGeminiResponse(undefined)).toEqual(demoReport);
      expect(parseGeminiResponse('')).toEqual(demoReport);
    });

    it('falls back to demoReport on invalid JSON or API error strings', () => {
      expect(parseGeminiResponse('API Error 500')).toEqual(demoReport);
      expect(parseGeminiResponse('{ invalid json ')).toEqual(demoReport);
    });

    it('gracefully handles missing fields in valid JSON', () => {
      const incompleteJSON = JSON.stringify({
        results: [
          { requirement: 'Req 1' } // Missing everything else
        ]
      });
      
      const parsed = parseGeminiResponse(incompleteJSON);
      expect(parsed.results).toHaveLength(1);
      expect(parsed.results[0].status).toBe('MISSING'); // Default status
      expect(parsed.results[0].confidence).toBe(0);
      expect(parsed.results[0].mandatory).toBe(false);
    });
  });

  describe('Responsible AI guard', () => {
    it('flags requirements as MISSING if status is VERIFIED but confidence is 0', () => {
      const fakeJson = JSON.stringify({
        results: [
          { requirement: 'Req 1', status: 'VERIFIED', confidence: 0, evidence: 'fake' }
        ]
      });
      const parsed = parseGeminiResponse(fakeJson);
      expect(parsed.results[0].status).toBe('MISSING');
    });

    it('flags requirements as MISSING if status is VERIFIED but evidence is empty', () => {
      const fakeJson = JSON.stringify({
        results: [
          { requirement: 'Req 1', status: 'VERIFIED', confidence: 0.9, evidence: '   ' }
        ]
      });
      const parsed = parseGeminiResponse(fakeJson);
      expect(parsed.results[0].status).toBe('MISSING');
    });
  });
});
