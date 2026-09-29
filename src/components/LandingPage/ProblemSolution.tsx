import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Orbit, 
  Layers, 
  Cpu, 
  FileText, 
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="problem-solution" className="py-20 relative border-b border-slate-800/60 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>MISSION OPERATIONAL GAP ANALYSIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Microgravity Challenge vs.{' '}
            <span className="text-gradient-cyan">SUTRA Edge Intelligence</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Crewed space exploration and autonomous orbital biological payloads face severe telecommunication 
            and perceptual hurdles that cloud-based AI simply cannot resolve.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* PROBLEM CARD (Red/Amber Theme) */}
          <div className="hud-panel hud-panel-danger rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-rose-900/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
                    CRITICAL LIMITATIONS
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    The Problem in Microgravity Space Operations
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                {/* Problem Item 1 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/30 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 font-mono text-sm font-semibold">
                    <Radio className="w-4 h-4 text-rose-400" />
                    <span>1. Communication Blackouts & 15+ Min Ground Latency</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    Orbital passes and deep-space trajectories cause severe Loss-of-Signal (LOS). Relying on ground flight controllers for real-time experiment error intervention leads to irreversible sample degradation.
                  </p>
                </div>

                {/* Problem Item 2 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/30 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 font-mono text-sm font-semibold">
                    <Orbit className="w-4 h-4 text-rose-400" />
                    <span>2. Floating Tool Tracking & 6-DOF Visual Occlusions</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    In zero gravity, pipettes, vials, and reagents float freely with unconstrained 6-DOF rotations. Standard 2D bounding box models fail due to severe hand occlusions and arbitrary object orientations.
                  </p>
                </div>

                {/* Problem Item 3 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/30 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 font-mono text-sm font-semibold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>3. Satellite Telemetry Bandwidth Constraints</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    Downlinking uncompressed 4K video feeds consumes mission-critical radio bandwidth (&gt;48 MB/s), saturating Deep Space Network channels and incurring immense RF power penalties.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-900/30 flex items-center justify-between text-xs font-mono text-rose-300/80">
              <span>Risk: Experiment Abort / Protocol Failure</span>
              <span className="text-rose-400 font-bold">HIGH RISK</span>
            </div>
          </div>

          {/* SOLUTION CARD (Emerald/Blue Cyber Theme) */}
          <div className="hud-panel hud-panel-success rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-emerald-500/30 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    EDGE-NATIVE PARADIGM
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    The SUTRA Autonomous Solution
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                {/* Solution Item 1 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2 group hover:border-emerald-400/50 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>1. Real-Time On-Device Video Inference (YOLOv11 + Video Swin)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    Runs multi-stream edge computer vision at 42+ FPS on NVIDIA Jetson AGX Orin. Spatio-temporal transformer backbones track floating objects and astronaut hand-object interactions with zero cloud reliance.
                  </p>
                </div>

                {/* Solution Item 2 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2 group hover:border-emerald-400/50 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono text-sm font-semibold">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>2. Continuous Step Tracking & Deviation Detection (1D-TCN)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    Dilated Temporal Convolutional Networks (1D-TCN) segment complex multi-step SOPs in real time. Instant HUD & voice alerts trigger in &lt;50ms when an astronaut skips or misorders a critical step.
                  </p>
                </div>

                {/* Solution Item 3 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2 group hover:border-emerald-400/50 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono text-sm font-semibold">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>3. Onboard Offline Assistant with Llama-3-8B + FAISS Local RAG</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    Quantized GGUF LLM and local GPU vector database query 10,000+ pages of ISRO BAS flight manuals and contingency playbooks in &lt;3ms, with Whisper.cpp voice command execution.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
              <span>Operational Autonomy: 100% Offline Resilience</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
