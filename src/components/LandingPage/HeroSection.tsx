import React, { useState, useEffect } from 'react';
import { playSound } from '../../utils/soundEffects';
import { ArrowRight, Play, Compass, Sparkles, Activity, ShieldCheck, Zap, Radio, Layers } from 'lucide-react';

interface HeroSectionProps {
  onLaunchDemo: () => void;
  onExploreArch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchDemo, onExploreArch }) => {
  const [telemetry, setTelemetry] = useState({
    latency: 18.4,
    bandwidthSaved: 99.8,
    fps: 42.6,
    power: 38.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        latency: +(17.1 + Math.random() * 2.8).toFixed(1),
        bandwidthSaved: 99.8,
        fps: +(41.9 + Math.random() * 2.1).toFixed(1),
        power: +(37.9 + Math.random() * 1.5).toFixed(1)
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 bg-black overflow-hidden select-none">
      {/* Cinematic Orbital Backdrop (Image 1 Style) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 transition-transform duration-1000 scale-100"
        style={{ backgroundImage: `url('/assets/space_orbital_arc.jpg')` }}
      >
        {/* Soft Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/50 pointer-events-none" />
      </div>

      {/* Top / Main Hero Content Area (Image 1 & 3 Typography) */}
      <div className="relative z-10 max-w-4xl pt-8 sm:pt-16">
        {/* Mission Pill Header */}
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-blue-300 font-mono mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
          <span>MISSION SUTRA-01 • ISRO BAS PAYLOAD</span>
        </div>

        {/* Large Elegant Heading (Inspired by "The Spacecraft" / "Moon Mission") */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white leading-tight font-sans">
          The Space <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">AI</span>
        </h1>

        {/* Minimal High-Impact Subtitle */}
        <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
          Zero-cloud edge intelligence for microgravity experiments. Real-time human activity recognition, 
          causal action segmentation, and offline cognitive RAG on NVIDIA Jetson AGX Orin.
        </p>

        {/* Clean Pill Buttons (Image 3 Style: + Explore Missions) */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              playSound('success');
              onLaunchDemo();
            }}
            className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-white text-slate-950 hover:bg-blue-400 hover:text-white font-medium text-sm tracking-wide transition-all shadow-xl shadow-white/10 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="text-lg font-bold">+</span>
            <span>Launch Mission Control</span>
          </button>

          <button
            onClick={() => {
              playSound('tab');
              onExploreArch();
            }}
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/20 text-sm font-medium tracking-wide transition-all backdrop-blur-md"
          >
            <span>Explore 4-Layer Architecture</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>

      {/* Bottom Orbital Metadata & Minimalist Live Telemetry Bar */}
      <div className="relative z-10 w-full pt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl bg-slate-950/75 border border-white/10 backdrop-blur-xl shadow-2xl">
          {/* Stat 1 */}
          <div className="p-3 border-r border-white/10 last:border-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Inference Latency</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-white">&lt; {telemetry.latency}</span>
              <span className="text-xs font-mono text-blue-400">ms</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">50x faster than ground relay</p>
          </div>

          {/* Stat 2 */}
          <div className="p-3 border-r border-white/10 last:border-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>Telemetry Downlink</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">&gt; {telemetry.bandwidthSaved}%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">0.08 MB/s vector compression</p>
          </div>

          {/* Stat 3 */}
          <div className="p-3 border-r border-white/10 last:border-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cloud Reliance</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-300">0%</span>
              <span className="text-xs font-mono text-slate-400">(Offline)</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Zero LOS blackout risk</p>
          </div>

          {/* Stat 4 */}
          <div className="p-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>Edge Target</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-xl sm:text-2xl font-mono font-bold text-white">Jetson Orin</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">{telemetry.power}W Power Envelope</p>
          </div>
        </div>

        {/* Minimalist Timestamp & Mission Badge (Image 1 Style) */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-2">
          <div>
            ISRO Human Space Flight Mission (HSFC) Compatible Standard
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>275 TOPS Ampere Edge TensorRT</span>
            <span>•</span>
            <span className="text-emerald-400">FLIGHT READY 🇮🇳</span>
          </div>
        </div>
      </div>
    </section>
  );
};
