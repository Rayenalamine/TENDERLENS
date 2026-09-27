import { create } from 'zustand';
import { UploadedFile, BidReadinessReport } from './types';

interface AppState {
  tenderFiles: UploadedFile[];
  evidenceFiles: UploadedFile[];
  isAnalyzing: boolean;
  analysisReport: BidReadinessReport | null;
  isDemoMode: boolean;
  addTenderFile: (file: UploadedFile) => void;
  removeTenderFile: (name: string) => void;
  addEvidenceFile: (file: UploadedFile) => void;
  removeEvidenceFile: (name: string) => void;
  setAnalyzing: (status: boolean) => void;
  setAnalysisReport: (report: BidReadinessReport | null) => void;
  setDemoMode: (status: boolean) => void;
  auditedItems: Record<string, { audited: boolean, timestamp: string }>;
  toggleAuditedItem: (requirementId: string) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  tenderFiles: [],
  evidenceFiles: [],
  isAnalyzing: false,
  analysisReport: null,
  isDemoMode: false,
  addTenderFile: (file) => set((state) => ({ tenderFiles: [...state.tenderFiles, file] })),
  removeTenderFile: (name) => set((state) => ({ tenderFiles: state.tenderFiles.filter(f => f.name !== name) })),
  addEvidenceFile: (file) => set((state) => ({ evidenceFiles: [...state.evidenceFiles, file] })),
  removeEvidenceFile: (name) => set((state) => ({ evidenceFiles: state.evidenceFiles.filter(f => f.name !== name) })),
  setAnalyzing: (status) => set({ isAnalyzing: status }),
  setAnalysisReport: (report) => set({ analysisReport: report }),
  setDemoMode: (status) => set({ isDemoMode: status }),
  auditedItems: {},
  toggleAuditedItem: (requirementId: string) => set((state) => {
    const isCurrentlyAudited = state.auditedItems[requirementId]?.audited;
    return {
      auditedItems: {
        ...state.auditedItems,
        [requirementId]: {
          audited: !isCurrentlyAudited,
          timestamp: new Date().toISOString()
        }
      }
    };
  }),
  reset: () => set({ tenderFiles: [], evidenceFiles: [], isAnalyzing: false, analysisReport: null, isDemoMode: false, auditedItems: {} })
}));
