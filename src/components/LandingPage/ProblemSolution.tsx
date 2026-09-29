import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Orbit, 
  Layers, 
  Cpu, 
  FileText, 
  Sparkles, 
  ShieldAlert, 
  Zap 
} from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="problem-solution" className="py-20 px-6 sm:px-12 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-blue-700 font-mono mb-2 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>SPACE OPERATIONAL GAP VS EDGE AI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            The Microgravity Challenge & <span className="text-gradient-cyan-blue">Edge Solution</span>
          </h2>
        </div>

        {/* 2-Column Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PROBLEM CARD */}
          <div className="p-8 rounded-3xl bg-rose-50/40 border border-rose-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-2xl bg-rose-100 text-rose-600 border border-rose-200 shadow-sm">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose-700 font-bold">
                    CRITICAL SPACE VULNERABILITY
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Ground-Dependent Telemetry Lag
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-sm space-y-1">
                  <div className="flex items-center space-x-2 text-rose-700 font-mono text-xs font-bold">
                    <Radio className="w-4 h-4 text-rose-600" />
                    <span>15+ Min Ground Latency & LOS Blackouts</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    Orbital passes cause communication loss. Relying on ground control risks irreversible sample degradation during rapid chemical/cellular steps.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-sm space-y-1">
                  <div className="flex items-center space-x-2 text-rose-700 font-mono text-xs font-bold">
                    <Orbit className="w-4 h-4 text-rose-600" />
                    <span>6-DOF Floating Tool Drift & Occlusion</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    In zero gravity, micropipettes, cryo-vials, and reagents float freely with unconstrained 3D orientations, breaking standard 2D bounding box vision.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-sm space-y-1">
                  <div className="flex items-center space-x-2 text-rose-700 font-mono text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>48 MB/s Video Downlink Saturation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    Downlinking uncompressed 4K video overburdens Deep Space Network channels and incurs immense spacecraft RF power draw.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-200 flex items-center justify-between text-xs font-mono text-rose-700 font-bold">
              <span>Risk: Experiment Abort / Protocol Failure</span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 border border-rose-300">HIGH RISK</span>
            </div>
          </div>

          {/* SOLUTION CARD */}
          <div className="p-8 rounded-3xl bg-emerald-50/40 border border-emerald-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold">
                    EDGE-NATIVE AUTONOMY
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    The SUTRA Solution
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-700 font-mono text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Real-Time Edge Vision (YOLOv11 + Video Swin)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    42+ FPS on NVIDIA Jetson AGX Orin with 3D shifted window attention to track zero-g tool dynamics with zero cloud reliance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-700 font-mono text-xs font-bold">
                    <Cpu className="w-4 h-4 text-emerald-600" />
                    <span>Causal Action Segmentation (1D-TCN)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    Dilated temporal convolutional networks verify SOP procedural adherence in real time, alerting astronauts in &lt;50ms upon skipped steps.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-700 font-mono text-xs font-bold">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Local Offline RAG (Llama-3-8B + FAISS GPU)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    Instant &lt;3ms semantic query over 10,000+ pages of ISRO flight manuals, with hands-free Whisper.cpp speech recognition.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200 flex items-center justify-between text-xs font-mono text-emerald-700 font-bold">
              <span>Operational Autonomy: 100% Offline Edge</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300">OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
