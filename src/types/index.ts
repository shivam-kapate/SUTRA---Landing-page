export type ViewMode = 'landing' | 'dashboard';

export interface TelemetryData {
  fps: number;
  latencyMs: number;
  vramUsedGB: number;
  vramTotalGB: number;
  powerWatts: number;
  gpuTempC: number;
  tensorCoreUsage: number;
  bandwidthSavedPercent: number;
}

export interface ExperimentStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'deviation';
  confidence: number;
  expectedDuration: string;
  actualDuration?: string;
  validationCheck: string;
  toolInUse?: string;
}

export interface BoundingBox {
  id: string;
  label: string;
  confidence: number;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  velocity?: { vx: number; vy: number };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sutra';
  text: string;
  timestamp: string;
  sourceCitations?: {
    manual: string;
    section: string;
    similarityScore: number;
    chunkText: string;
  }[];
  modelUsed?: string;
  inferenceTimeMs?: number;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  category: 'Vision & Perception' | 'Temporal Modeling' | 'Cognitive LLM' | 'Edge Systems';
  summary: string;
  doiOrUrl: string;
  badge: string;
}
