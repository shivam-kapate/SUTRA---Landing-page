import React, { useState, useEffect } from 'react';
import { playSound } from '../../utils/soundEffects';
import { 
  Play, 
  Activity, 
  Eye, 
  Radar, 
  Radio, 
  Compass, 
  Sparkles, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';

interface CockpitHudShowcaseProps {
  onLaunchDemo: () => void;
}

export const CockpitHudShowcase: React.FC<CockpitHudShowcaseProps> = ({ onLaunchDemo }) => {
  const [hudStats, setHudStats] = useState({
    speedFps: 42.8,
    azimuth: 65,
    altitudeKm: 420,
    confidence: 98.4
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setHudStats(prev => ({
        speedFps: +(41.8 + Math.random() * 2.2).toFixed(1),
        azimuth: 64 + Math.floor(Math.random() * 3),
        altitudeKm: 420 + Math.floor(Math.random() * 4),
        confidence: +(98.2 + Math.random() * 1.1).toFixed(1)
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="cockpit-hud" className="relative py-24 px-6 sm:px-12 bg-black overflow-hidden border-t border-b border-white/10">
      {/* Background Cinematic Cockpit Image (Image 2 Style) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('/assets/astronaut_hud_cockpit.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading with Minimal Luxury Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>COCKPIT HUD INTERFACE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-sans">
              Curved Visor <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Telemetry HUD</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-md font-light leading-relaxed">
            Real-time microgravity situational awareness. Zero-occlusion tool tracking and biological experiment verification.
          </p>
        </div>

        {/* Cockpit HUD Interactive Visual Window (Inspired by Image 2 Visor Arc) */}
        <div className="relative rounded-3xl bg-slate-950/80 border border-cyan-500/30 overflow-hidden shadow-2xl p-6 sm:p-10 backdrop-blur-2xl">
          {/* Top Arc Telemetry Readouts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase">
                INFERENCE VELOCITY
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white mt-1">
                {hudStats.speedFps} <span className="text-xs font-normal text-cyan-300">FPS</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                TensorRT FP16 Active
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-amber-400 tracking-wider uppercase">
                AZIMUTH VISOR ANGLE
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-amber-300 mt-1">
                {hudStats.azimuth}° <span className="text-xs font-normal text-amber-400">NORTH</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                6-DOF Invariant Matrix
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-emerald-400 tracking-wider uppercase">
                ZERO-G CONFIDENCE
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 mt-1">
                {hudStats.confidence}%
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                HO-RCNN Contact Verified
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-blue-400 tracking-wider uppercase">
                ORBITAL ALTITUDE
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-blue-300 mt-1">
                {hudStats.altitudeKm} <span className="text-xs font-normal text-blue-400">KM</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Low Earth Orbit (LEO)
              </div>
            </div>
          </div>

          {/* Central Interactive HUD Graphic / Waveform */}
          <div className="py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Visual Waveform & Audio Spectrum */}
            <div className="flex-1 w-full space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>1D-TCN TEMPORAL FREQUENCY SPECTRUM</span>
                </span>
                <span className="text-cyan-400 font-bold">120 Hz SAMPLING</span>
              </div>

              {/* Animated Futuristic Bars */}
              <div className="h-20 bg-slate-900/90 rounded-2xl p-3 border border-slate-800 flex items-end space-x-1.5 overflow-hidden">
                {[45, 60, 25, 80, 55, 90, 70, 40, 65, 85, 95, 60, 45, 75, 88, 50, 68, 92, 40, 60, 80, 55, 70, 85, 60].map((h, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm transition-all duration-300 hover:from-amber-400 hover:to-rose-400"
                    style={{ 
                      height: `${(h + Math.sin(idx + Date.now() * 0.001) * 15)}%`,
                      opacity: 0.7 + (idx % 3) * 0.1
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Launch CTA */}
            <div className="shrink-0 flex flex-col items-center sm:items-start space-y-3">
              <button
                onClick={() => {
                  playSound('success');
                  onLaunchDemo();
                }}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-cyan-500/20 hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Enter Live Mission Control</span>
              </button>
              <span className="text-[11px] font-mono text-slate-500">
                Simulated Camera & Voice RAG Sandbox
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
