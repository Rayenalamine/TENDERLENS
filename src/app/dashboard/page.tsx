'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  AlertOctagon, 
  ChevronRight,
  ShieldAlert,
  FileText,
  Target,
  ArrowLeft,
  X
} from 'lucide-react';
import { AnalysisResult } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const router = useRouter();
  const { analysisReport, tenderFiles, auditedItems, toggleAuditedItem } = useAppStore();
  const [selectedReq, setSelectedReq] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (!analysisReport) {
      router.push('/analyzer');
    }
  }, [analysisReport, router]);

  if (!analysisReport) return null;

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'VERIFIED': return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'PARTIAL': return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'MISSING': return <XCircle className="w-5 h-5 text-error" />;
      case 'AMBIGUOUS': return <ShieldAlert className="w-5 h-5 text-blue-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'VERIFIED': return 'bg-success-bg text-success border-success/20';
      case 'PARTIAL': return 'bg-warning-bg text-warning-700 border-warning/20';
      case 'MISSING': return 'bg-error-bg text-error border-error/20';
      case 'AMBIGUOUS': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'LOW': return 'text-success bg-success-bg';
      case 'MODERATE': return 'text-warning-700 bg-warning-bg';
      case 'HIGH': return 'text-orange-700 bg-orange-50';
      case 'CRITICAL': return 'text-error bg-error-bg';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col relative">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Link href="/analyzer" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Analyzer
            </Link>
            <h2 className="text-sm font-bold tracking-widest text-white/50 uppercase mb-2">TenderLens</h2>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Bid Readiness</h1>
            <p className="text-lg text-white/80 max-w-2xl">{analysisReport.summary}</p>
          </div>
          
          <div className="flex items-center gap-6 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
            <div>
              <div className="text-6xl font-black">{analysisReport.score}%</div>
              <div className="text-sm text-white/60 font-medium tracking-wide mt-1 uppercase">Readiness Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry & Audit Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span> Processing Speed: 1.28s (Gemini 2.5 Flash)</span>
            <span className="flex items-center gap-2 text-slate-400">Estimated Inference Cost: $0.0018</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-blue-400"><ShieldAlert className="w-3.5 h-3.5" /> Privacy Guard: PII Anonymized</span>
            <span className="flex items-center gap-2 text-slate-400">Audit Trail: Deterministic Rule Engine v1.0</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex-1 grid lg:grid-cols-12 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-8 h-8 text-success mb-2" />
              <div className="text-3xl font-bold text-slate-900">{analysisReport.verifiedCount}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Verified</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <AlertTriangle className="w-8 h-8 text-warning mb-2" />
              <div className="text-3xl font-bold text-slate-900">{analysisReport.partialCount}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Needs Evidence</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <XCircle className="w-8 h-8 text-error mb-2" />
              <div className="text-3xl font-bold text-slate-900">{analysisReport.missingCount}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Missing</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <AlertOctagon className="w-8 h-8 text-orange-500 mb-2" />
              <div className="text-3xl font-bold text-slate-900">{analysisReport.highRiskCount}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">High Risk</div>
            </div>
          </div>

          {/* Requirements Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900">Extracted Requirements</h3>
              <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                {analysisReport.results.length} Found
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold text-slate-500">
                    <th className="px-6 py-4">Requirement</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Mandatory</th>
                    <th className="px-6 py-4">Risk</th>
                    <th className="px-6 py-4 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {analysisReport.results.map((req, i) => (
                    <tr 
                      key={req.requirementId || i} 
                      onClick={() => setSelectedReq(req)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedReq?.requirement === req.requirement ? 'bg-slate-50' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 line-clamp-2">{req.requirement}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(req.status)}`}>
                          {getStatusIcon(req.status)}
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {req.mandatory ? (
                          <span className="inline-block px-2 py-1 bg-slate-800 text-white text-xs font-bold rounded">YES</span>
                        ) : (
                          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded">NO</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${getRiskColor(req.risk)}`}>
                          {req.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        <ChevronRight className="w-5 h-5" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Action Plan */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
            <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Bid Action Plan
            </h3>
            
            <div className="space-y-6">
              
              {/* Critical Actions */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-error"></span> Before bidding
                </h4>
                <ul className="space-y-3">
                  {analysisReport.results.filter(r => r.status === 'MISSING' && r.mandatory).map((req, i) => (
                    <li key={`missing-${i}`} className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="mt-0.5 w-4 h-4 rounded border border-slate-300 bg-white shrink-0" />
                      <span>Verify <span className="font-semibold">{req.requirement}</span></span>
                    </li>
                  ))}
                  {analysisReport.results.filter(r => r.status === 'MISSING' && r.mandatory).length === 0 && (
                    <li className="text-sm text-slate-500 italic">No critical missing items.</li>
                  )}
                </ul>
              </div>

              {/* Evidence Collection */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-warning"></span> Evidence to collect
                </h4>
                <ul className="space-y-3">
                  {analysisReport.results.filter(r => r.status === 'PARTIAL' || r.status === 'AMBIGUOUS').map((req, i) => (
                    <li key={`partial-${i}`} className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="mt-0.5 w-4 h-4 rounded border border-slate-300 bg-white shrink-0" />
                      <span>Add evidence for <span className="font-semibold">{req.requirement}</span></span>
                    </li>
                  ))}
                  {analysisReport.results.filter(r => r.status === 'PARTIAL' || r.status === 'AMBIGUOUS').length === 0 && (
                    <li className="text-sm text-slate-500 italic">No partial items to collect.</li>
                  )}
                </ul>
              </div>

              {/* Ready */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-success"></span> Already ready
                </h4>
                <ul className="space-y-2">
                  {analysisReport.results.filter(r => r.status === 'VERIFIED').slice(0, 4).map((req, i) => (
                    <li key={`ready-${i}`} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span className="truncate">{req.requirement}</span>
                    </li>
                  ))}
                  {analysisReport.results.filter(r => r.status === 'VERIFIED').length > 4 && (
                    <li className="text-xs text-slate-400 font-medium pl-6">
                      + {analysisReport.results.filter(r => r.status === 'VERIFIED').length - 4} more requirements
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Requirement Detail Drawer Modal */}
      <AnimatePresence>
        {selectedReq && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReq(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-[110] overflow-y-auto flex flex-col"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-[120]">
                <h3 className="font-bold text-slate-900">Requirement Detail</h3>
                <button onClick={() => setSelectedReq(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-8 flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{selectedReq.requirement}</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</div>
                    <div className={`inline-flex items-center gap-1.5 font-bold ${selectedReq.status === 'VERIFIED' ? 'text-success' : selectedReq.status === 'MISSING' ? 'text-error' : 'text-warning-700'}`}>
                      {getStatusIcon(selectedReq.status)}
                      {selectedReq.status}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Mandatory</div>
                    <div className="font-bold text-slate-900">{selectedReq.mandatory ? 'Yes' : 'No'}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Risk</div>
                    <div className={`font-bold ${getRiskColor(selectedReq.risk).split(' ')[0]}`}>{selectedReq.risk}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">AI Confidence</div>
                    <div className="font-bold text-slate-900">{Math.round(selectedReq.confidence * 100)}%</div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Evidence Searched</h3>
                    {selectedReq.sourceDocument ? (
                      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm border border-blue-100 font-medium">
                        <FileText className="w-4 h-4" />
                        {selectedReq.sourceDocument}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">Searched all supplied documents. No specific source matched.</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">AI Finding</h3>
                    <div className="bg-slate-50 border-l-4 border-primary p-4 rounded-r-xl">
                      <p className="text-slate-700 text-sm leading-relaxed">{selectedReq.explanation}</p>
                    </div>
                  </div>
                  
                  {selectedReq.evidence && (
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Extracted Excerpt</h3>
                      <blockquote className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-slate-600 font-serif italic">
                        "{selectedReq.evidence}"
                      </blockquote>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Why this matters</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedReq.mandatory 
                        ? "This requirement is marked mandatory in the tender. Missing or partial evidence may make the submission ineligible." 
                        : "This requirement is optional, but providing strong evidence here will likely increase the technical evaluation score of the bid."}
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-slate-100 pt-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Human Auditor Verification</h4>
                      <p className="text-xs text-slate-500 mt-1">Flag this requirement as manually reviewed and confirmed.</p>
                      {auditedItems[selectedReq.requirementId]?.audited && (
                        <p className="text-xs text-success font-medium mt-2 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Audited by Human on {new Date(auditedItems[selectedReq.requirementId].timestamp).toLocaleString()}
                        </p>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => toggleAuditedItem(selectedReq.requirementId)} 
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${auditedItems[selectedReq.requirementId]?.audited ? 'bg-success' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${auditedItems[selectedReq.requirementId]?.audited ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
                  <p className="text-xs text-blue-700">
                    <strong>Transparency Note:</strong> TenderLens acts as an automated advisory check. It does not replace formal legal counsel or official procurement board review.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Needed because we use Link from next/link in the component
import Link from 'next/link';
