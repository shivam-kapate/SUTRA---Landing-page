import React, { useState, useEffect } from 'react';
import { ViewMode } from '../../types';
import { playSound } from '../../utils/soundEffects';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Play, 
  FileCode2, 
  Sparkles, 
  ArrowRight,
  Database,
  Radio,
  Eye,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

interface HeroSectionProps {
  onLaunchDemo: () => void;
  onExploreArch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchDemo, onExploreArch }) => {
  const [activeTelemetry, setActiveTelemetry] = useState({
    fps: 42.4,
    latency: 18.6,
    bandwidthSaved: 99.8,
    vram: 6.2,
    temp: 48
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTelemetry(prev => ({
        fps: +(41.8 + Math.random() * 2.2).toFixed(1),
        latency: +(17.2 + Math.random() * 3.1).toFixed(1),
        bandwidthSaved: +(99.7 + Math.random() * 0.2).toFixed(1),
        vram: +(6.1 + Math.random() * 0.3).toFixed(1),
        temp: Math.floor(47 + Math.random() * 3)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden space-bg-pattern border-b border-slate-800/60">
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Mission Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono backdrop-blur-md shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
            <span className="font-semibold text-blue-200">BAS MICROGRAVITY EXPERIMENTS</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-300 font-mono">100% OFFLINE ZERO-G AI</span>
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-sans">
            Edge-Native AI Intelligence for{' '}
            <span className="text-gradient-cyan drop-shadow-sm">
              Zero-G Autonomous
            </span>{' '}
            Experimentation
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            Eliminating satellite telemetry latency with zero-cloud, 100% offline computer vision, 
            temporal action segmentation, and local cognitive RAG for human spaceflight & orbital science racks.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                playSound('success');
                onLaunchDemo();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-semibold text-sm tracking-wide shadow-xl shadow-blue-600/30 border border-blue-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              <Play className="w-4 h-4 fill-current text-white group-hover:scale-110 transition-transform" />
              <span>Launch Interactive Mission Control</span>
              <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                playSound('tab');
                onExploreArch();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-mono text-sm font-medium border border-slate-700 hover:border-slate-500 transition-all"
            >
              <FileCode2 className="w-4 h-4 text-blue-400" />
              <span>Explore 4-Layer Architecture</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry Banner (High-Impact HUD Component) */}
        <div className="mt-12 rounded-2xl bg-slate-900/80 border border-blue-500/30 p-4 sm:p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden hud-panel">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    ONBOARD EDGE TELEMETRY
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 font-semibold">
                    REAL-TIME SYNC
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Autonomous payload rack status • ISRO BAS Experiment Glovebox #02
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-500">TARGET SOC:</span>
                <span className="text-blue-400 font-bold">NVIDIA Jetson AGX Orin</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-500">ENVELOPE:</span>
                <span className="text-emerald-400 font-bold">15W – 60W</span>
              </div>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {/* Metric 1 */}
            <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>INFERENCE LATENCY</span>
                <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-white">
                  &lt; {activeTelemetry.latency}
                </span>
                <span className="text-xs font-mono font-medium text-amber-400">ms</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                Sub-100ms budget • Zero ground uplink lag
              </p>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 to-blue-500 h-full w-[85%] animate-pulse"></div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>BANDWIDTH SAVED</span>
                <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400">
                  &gt; {activeTelemetry.bandwidthSaved}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                Vector telemetry vs 48 MB/s raw video
              </p>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[99%]"></div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>CLOUD DEPENDENCY</span>
                <ShieldCheck className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-blue-400">
                  0%
                </span>
                <span className="text-xs font-mono font-medium text-slate-400">(Fully Edge)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                Zero LOS blackout vulnerability
              </p>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full w-[100%]"></div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>EDGE INFERENCE FPS</span>
                <Cpu className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-purple-400">
                  {activeTelemetry.fps}
                </span>
                <span className="text-xs font-mono font-medium text-slate-400">FPS</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                YOLOv11 + Video Swin + 1D-TCN pipeline
              </p>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-purple-500 h-full w-[90%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
