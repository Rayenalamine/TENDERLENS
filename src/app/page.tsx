'use client';

import Link from 'next/link';
import { ArrowRight, Upload, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-100 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-48 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
          AI-Powered Bid Readiness
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          Know before <br className="hidden sm:block" /> you bid.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Turn complex tenders into a clear bid-readiness decision — with evidence. Upload a tender and your company evidence to get an instant readiness score and action plan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/analyzer" 
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Analyze a Tender
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl w-full"
      >
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6">
            <Upload className="w-6 h-6 text-slate-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-400 mb-1 tracking-wider uppercase">01 — Upload</h3>
          <h4 className="text-xl font-bold text-slate-900 mb-2">Tender + Documents</h4>
          <p className="text-slate-600">Drag and drop your target RFP and your company's existing evidence documents.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-slate-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-400 mb-1 tracking-wider uppercase">02 — Analyze</h3>
          <h4 className="text-xl font-bold text-slate-900 mb-2">AI Extraction</h4>
          <p className="text-slate-600">Our engine extracts requirements and instantly cross-references them with your evidence.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-slate-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-400 mb-1 tracking-wider uppercase">03 — Act</h3>
          <h4 className="text-xl font-bold text-slate-900 mb-2">Prioritized Plan</h4>
          <p className="text-slate-600">Get a clear readiness score, discover risks, and follow a prioritized action plan to win.</p>
        </div>
      </motion.div>
    </div>
  );
}
