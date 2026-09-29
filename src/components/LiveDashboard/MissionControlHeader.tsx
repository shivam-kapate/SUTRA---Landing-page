import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Clock, 
  RotateCcw, 
  Download, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface MissionControlHeaderProps {
  currentProtocolKey: string;
  onSelectProtocol: (key: string) => void;
  onResetSimulation: () => void;
  isDeviationActive: boolean;
  onTriggerDeviation: () => void;
  onExportReport: () => void;
}

export const MissionControlHeader: React.FC<MissionControlHeaderProps> = ({
  currentProtocolKey,
  onSelectProtocol,
  onResetSimulation,
  isDeviationActive,
  onTriggerDeviation,
  onExportReport
}) => {
  const [missionElapsedSec, setMissionElapsedSec] = useState(148);

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionElapsedSec(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMissionTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `T+${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="bg-slate-950/90 border-b border-slate-800/90 px-4 sm:px-6 py-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Mission & Experiment Selection */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-400">MISSION TIMER:</span>
            <span className="text-emerald-400 font-bold text-sm tracking-wider">
              {formatMissionTime(missionElapsedSec)}
            </span>
          </div>

          {/* Experiment Protocol Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-mono text-slate-400 hidden sm:inline-block">PROTOCOL:</label>
            <select
              value={currentProtocolKey}
              onChange={e => {
                playSound('tab');
                onSelectProtocol(e.target.value);
              }}
              className="bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="bio-incubation">BIO-SAMP-04: Biological Sample Incubation</option>
              <option value="crystal-growth">PCG-VD-01: Protein Crystal Growth Vapor Diffusion</option>
            </select>
          </div>

          {/* Telemetry Status Indicator */}
          <div className="hidden xl:flex items-center space-x-2 bg-blue-950/40 border border-blue-500/30 px-2.5 py-1 rounded-lg text-[11px] font-mono text-blue-300">
            <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>LOCAL BUS: CAN-FD / 10 GbE</span>
          </div>
        </div>

        {/* Right: Simulation Controls & Triggers */}
        <div className="flex items-center space-x-2">
          {/* Deviation Simulator Button */}
          <button
            onClick={() => {
              playSound('alert');
              onTriggerDeviation();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border flex items-center space-x-1.5 transition-all ${
              isDeviationActive
                ? 'bg-rose-600/30 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-900 border-amber-500/40 text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>{isDeviationActive ? 'CLEAR SIMULATED ERROR' : 'TRIGGER STEP DEVIATION'}</span>
          </button>

          {/* Reset Protocol */}
          <button
            onClick={() => {
              playSound('whoosh');
              onResetSimulation();
            }}
            title="Reset Experiment Steps"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Export Telemetry Report */}
          <button
            onClick={() => {
              playSound('beep');
              onExportReport();
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono hover:bg-slate-800 hover:text-white transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline-block">Export Flight Telemetry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
