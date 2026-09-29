import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Zap, 
  Thermometer, 
  Activity, 
  HardDrive, 
  Radio, 
  ShieldCheck, 
  Flame,
  Binary
} from 'lucide-react';

export const HardwareTelemetryDrawer: React.FC = () => {
  const [telemetry, setTelemetry] = useState({
    vramUsed: 6.2,
    vramTotal: 32.0,
    power: 38.5,
    fps: 42.4,
    temp: 48,
    tensorUsage: 78,
    cudaFreq: 1300,
    fanRpm: 2400
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        vramUsed: +(6.1 + Math.random() * 0.3).toFixed(1),
        vramTotal: 32.0,
        power: +(37.8 + Math.random() * 1.8).toFixed(1),
        fps: +(41.8 + Math.random() * 1.8).toFixed(1),
        temp: Math.floor(47 + Math.random() * 3),
        tensorUsage: Math.floor(76 + Math.random() * 6),
        cudaFreq: 1300,
        fanRpm: Math.floor(2350 + Math.random() * 120)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 border-t border-slate-800/90 px-4 sm:px-6 py-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Target Device Badge */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                NVIDIA Jetson AGX Orin
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                MAXN 50W
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Ampere 2048 CUDA Cores • 64 Tensor Cores • 275 TOPS
            </p>
          </div>
        </div>

        {/* Center/Right: Live Animated Metric Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-6 flex-1 max-w-4xl">
          {/* Gauge 1: GPU VRAM */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
              <HardDrive className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                GPU VRAM
              </div>
              <div className="text-xs font-mono font-bold text-white">
                {telemetry.vramUsed} GB <span className="text-slate-500 text-[10px]">/ {telemetry.vramTotal} GB</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-blue-500 h-full transition-all duration-500" 
                  style={{ width: `${(telemetry.vramUsed / telemetry.vramTotal) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Gauge 2: Power Draw */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                POWER DRAW
              </div>
              <div className="text-xs font-mono font-bold text-amber-400">
                {telemetry.power} W <span className="text-slate-500 text-[10px]">(Envelope 15-60W)</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-500" 
                  style={{ width: `${(telemetry.power / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Gauge 3: Inference Speed */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                INFERENCE SPEED
              </div>
              <div className="text-xs font-mono font-bold text-purple-300">
                {telemetry.fps} FPS <span className="text-slate-500 text-[10px]">@ 18ms</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-purple-500 h-full transition-all duration-500" 
                  style={{ width: `${(telemetry.fps / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Gauge 4: Thermal Temp */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Thermometer className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                THERMAL TEMP
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400">
                {telemetry.temp}°C <span className="text-slate-500 text-[10px]">Nominal (&lt;75°C)</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${(telemetry.temp / 85) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
