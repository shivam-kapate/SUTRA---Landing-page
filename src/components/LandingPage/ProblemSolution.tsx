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
  Zap,
  ArrowRight
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="problem-solution" className="py-24 px-6 sm:px-12 bg-black border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-blue-400 font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>OPERATIONAL GAP VS SUTRA PARADIGM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-sans">
            The Microgravity Challenge & <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-400">Edge Solution</span>
          </h2>
        </div>

        {/* 2-Column High-Impact Minimalist Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PROBLEM CARD (Minimalist Dark Glass with subtle red border) */}
          <div className="p-8 rounded-3xl bg-slate-950/90 border border-rose-500/20 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
                    SPACE TELEMETRY BOTTLENECK
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Ground-Dependent Limitations
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center space-x-2 text-rose-300 font-mono text-xs font-semibold">
                    <Radio className="w-4 h-4 text-rose-400" />
                    <span>15+ Min Ground Latency & LOS Blackouts</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    Orbital passes cause communication loss. Relying on ground control risks sample destruction during critical bio-reactions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center space-x-2 text-rose-300 font-mono text-xs font-semibold">
                    <Orbit className="w-4 h-4 text-rose-400" />
                    <span>6-DOF Floating Tool Drift & Occlusion</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    In zero gravity, pipettes and vials drift freely with arbitrary 3D orientations, breaking standard 2D detection models.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center space-x-2 text-rose-300 font-mono text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>48 MB/s Telemetry Bandwidth Saturation</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    Raw 4K video downlink consumes extreme satellite RF power and incurs heavy transmission costs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-500/20 flex items-center justify-between text-xs font-mono text-rose-400">
              <span>Risk: Protocol Failure</span>
              <span className="font-bold">HIGH RISK</span>
            </div>
          </div>

          {/* SOLUTION CARD (Minimalist Dark Glass with emerald border) */}
          <div className="p-8 rounded-3xl bg-slate-950/90 border border-emerald-500/30 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    EDGE-NATIVE AUTONOMY
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    The SUTRA Solution
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Real-Time Edge Vision (YOLOv11 + Video Swin)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    42+ FPS on Jetson AGX Orin with 3D shifted window attention to track zero-g tool dynamics with zero cloud reliance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-semibold">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>Causal Step Verification (1D-TCN)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    Dilated temporal networks segment multi-step protocols in real time, alerting astronauts in &lt;50ms upon skipped steps.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-semibold">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Local Offline RAG (Llama-3-8B + FAISS GPU)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    Instant &lt;3ms semantic query over 10,000+ pages of ISRO flight manuals, with Whisper.cpp voice command execution.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-400">
              <span>Operational Autonomy: 100% Offline</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 font-bold border border-emerald-500/40">OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
