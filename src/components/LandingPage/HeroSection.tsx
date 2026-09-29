import React, { useState, useEffect } from 'react';
import { playSound } from '../../utils/soundEffects';
import { ArrowRight, Play, Sparkles, Activity, ShieldCheck, Zap, Radio, Bot, Layers } from 'lucide-react';

interface HeroSectionProps {
  onLaunchDemo: () => void;
  onExploreArch: () => void;
  onExploreCopilot?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onLaunchDemo, 
  onExploreArch,
  onExploreCopilot
}) => {
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

  const handleCopilotScroll = () => {
    playSound('tab');
    const el = document.getElementById('copilot-showcase');
    el?.scrollIntoView({ behavior: 'smooth' });
    if (onExploreCopilot) onExploreCopilot();
  };

  return (
    <section id="hero" className="relative min-h-[92vh] w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 overflow-hidden bg-slate-950 select-none">
      {/* Cinematic Orbital Backdrop Image (Retained as user requested) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95 transition-transform duration-1000 scale-100"
        style={{ backgroundImage: `url('/assets/space_orbital_arc.jpg')` }}
      >
        {/* Crisp Gradient Transition into Light Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-slate-950/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-4xl pt-6 sm:pt-14">
        {/* Mission Pill Header */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20 text-xs font-mono mb-4 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-semibold">MISSION SUTRA-01</span>
          <span className="text-white/40">|</span>
          <span className="text-blue-300">ISRO BAS EXPERIMENT PAYLOAD</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white leading-tight font-sans">
          The Space <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-300 to-white">AI</span>
        </h1>

        {/* Minimal Subtitle */}
        <p className="mt-4 text-base sm:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed drop-shadow-md">
          Zero-cloud edge intelligence for microgravity experiments. Real-time human activity recognition, 
          causal action segmentation, and offline cognitive RAG on NVIDIA Jetson AGX Orin.
        </p>

        {/* Action Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              playSound('success');
              onLaunchDemo();
            }}
            className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide transition-all shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95"
          >
            <span className="text-lg font-bold">+</span>
            <span>Launch Mission Control</span>
          </button>

          <button
            onClick={handleCopilotScroll}
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-white text-sm font-semibold tracking-wide transition-all shadow-lg backdrop-blur-md hover:scale-105"
          >
            <Bot className="w-4 h-4 text-blue-600" />
            <span>Try AI Copilot & RAG</span>
          </button>

          <button
            onClick={() => {
              playSound('tab');
              onExploreArch();
            }}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm font-medium tracking-wide transition-all backdrop-blur-md"
          >
            <span>Architecture</span>
            <ArrowRight className="w-4 h-4 text-sky-300" />
          </button>
        </div>
      </div>

      {/* Floating Light Aerospace Telemetry Bar */}
      <div className="relative z-10 w-full pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-2xl">
          {/* Stat 1 */}
          <div className="p-3 border-r border-slate-200 last:border-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Inference Latency</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900">&lt; {telemetry.latency}</span>
              <span className="text-xs font-mono font-bold text-blue-600">ms</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">50x faster than ground uplink</p>
          </div>

          {/* Stat 2 */}
          <div className="p-3 border-r border-slate-200 last:border-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-emerald-600" />
              <span>Telemetry Downlink</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-600">&gt; {telemetry.bandwidthSaved}%</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">0.08 MB/s vector compression</p>
          </div>

          {/* Stat 3 */}
          <div className="p-3 border-r border-slate-200 last:border-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Cloud Reliance</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-blue-700">0%</span>
              <span className="text-xs font-mono text-slate-500">(100% Offline)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Zero LOS blackout risk</p>
          </div>

          {/* Stat 4 */}
          <div className="p-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-purple-600" />
              <span>Edge Target</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900">Jetson Orin</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">{telemetry.power}W Power Envelope</p>
          </div>
        </div>
      </div>
    </section>
  );
};
