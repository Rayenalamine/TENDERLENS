'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { demoTenderFiles, demoEvidenceFiles } from '@/lib/demo-data';
import { Upload, FileText, CheckCircle2, XCircle, File, Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadedFile } from '@/lib/types';

export default function AnalyzerPage() {
  const router = useRouter();
  const { 
    tenderFiles, 
    evidenceFiles, 
    addTenderFile, 
    addEvidenceFile, 
    removeTenderFile, 
    removeEvidenceFile,
    setAnalyzing,
    setAnalysisReport,
    setDemoMode,
    isDemoMode,
    reset
  } = useAppStore();

  const [loadingStep, setLoadingStep] = useState<number>(-1);

  const steps = [
    "Extracting requirements...",
    "Finding evidence...",
    "Checking mandatory criteria...",
    "Cross-referencing documents...",
    "Evaluating risks...",
    "Building bid readiness report..."
  ];

  const handleTenderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'ready'
      };
      
      // In a real app we'd read the file content here.
      // For the hackathon MVP, if it's not demo mode, we just store the metadata.
      addTenderFile(newFile);
    }
  };

  const handleEvidenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => {
        addEvidenceFile({
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'ready'
        });
      });
    }
  };

  const loadDemoData = () => {
    reset();
    setDemoMode(true);
    demoTenderFiles.forEach(addTenderFile);
    demoEvidenceFiles.forEach(addEvidenceFile);
  };

  const startAnalysis = async () => {
    setAnalyzing(true);
    setLoadingStep(0);
    
    // Animation sequence
    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(i);
      await new Promise(r => setTimeout(r, 600)); // 600ms per step
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tender: tenderFiles[0],
          evidence: evidenceFiles,
          useDemoData: isDemoMode || (tenderFiles.length === 0 && evidenceFiles.length === 0)
        })
      });

      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setAnalysisReport(data);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert("Failed to analyze. Check console.");
      setAnalyzing(false);
      setLoadingStep(-1);
    }
  };

  const isReady = tenderFiles.length > 0 && evidenceFiles.length > 0;

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col relative">
      
      <AnimatePresence>
        {loadingStep >= 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[150] bg-slate-50/95 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8" />
            <div className="h-8 relative overflow-hidden w-full max-w-sm text-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={loadingStep}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-medium text-slate-800 absolute inset-x-0"
                >
                  {steps[loadingStep]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Upload Documents</h1>
          <p className="text-slate-600 mt-2">Provide the tender requirements and your company evidence.</p>
        </div>
        <button 
          onClick={loadDemoData}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors border border-blue-100"
        >
          <Play className="w-4 h-4" />
          Try Demo
        </button>
      </div>

      {isDemoMode && (
        <div className="mb-8 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">DEMO DATA MODE ACTIVE</p>
            <p className="text-sm mt-0.5 opacity-90">You are viewing synthetic demo data. Click "Analyze Bid" to proceed.</p>
          </div>
          <button onClick={reset} className="ml-auto text-sm underline hover:text-blue-900">Reset</button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 flex-1">
        {/* LEFT: Tender */}
        <div className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
            <h2 className="font-semibold text-slate-900">Tender / RFP</h2>
            <p className="text-sm text-slate-500">Upload the primary requirement document.</p>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            {tenderFiles.length === 0 ? (
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 hover:border-primary transition-colors cursor-pointer min-h-[200px]">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <span className="text-sm font-medium text-slate-600">Click or drag file to upload</span>
                <span className="text-xs text-slate-400 mt-1">Accepts PDF, DOCX, TXT</span>
                <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleTenderUpload} />
              </label>
            ) : (
              <div className="space-y-3">
                {tenderFiles.map(file => (
                  <div key={file.name} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="font-medium text-sm text-slate-900 truncate max-w-[200px]" title={file.name}>{file.name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" /> Ready
                        </p>
                      </div>
                    </div>
                    <button onClick={() => removeTenderFile(file.name)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                
                {tenderFiles.length > 0 && (
                  <label className="text-sm text-primary font-medium cursor-pointer hover:underline inline-block mt-4">
                    + Replace tender document
                    <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={(e) => {
                      removeTenderFile(tenderFiles[0].name);
                      handleTenderUpload(e);
                    }} />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Evidence */}
        <div className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
            <h2 className="font-semibold text-slate-900">Company Evidence</h2>
            <p className="text-sm text-slate-500">Upload profiles, CVs, financial docs.</p>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 hover:border-primary transition-colors cursor-pointer py-8 mb-6">
              <span className="text-sm font-medium text-slate-600">Add evidence document</span>
              <span className="text-xs text-slate-400 mt-1">Multiple files supported</span>
              <input type="file" className="hidden" multiple accept=".pdf,.docx,.txt" onChange={handleEvidenceUpload} />
            </label>

            {evidenceFiles.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Uploaded ({evidenceFiles.length})</span>
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Ready for analysis</span>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {evidenceFiles.map(file => (
                    <div key={file.name} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-white shadow-sm">
                      <div className="flex items-center gap-3">
                        <File className="w-5 h-5 text-slate-400" />
                        <p className="font-medium text-sm text-slate-700 truncate max-w-[180px]" title={file.name}>{file.name}</p>
                      </div>
                      <button onClick={() => removeEvidenceFile(file.name)} className="text-slate-400 hover:text-red-500">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <button 
          disabled={!isReady || loadingStep >= 0}
          onClick={startAnalysis}
          className={`px-12 py-4 rounded-xl font-bold text-lg shadow-sm transition-all ${isReady ? 'bg-primary text-white hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          ANALYZE BID
        </button>
        <p className="text-xs text-slate-500 mt-4 max-w-md text-center">
          Your documents are analyzed locally and/or through the configured AI provider. No document is submitted until analysis begins.
        </p>
      </div>
    </div>
  );
}
