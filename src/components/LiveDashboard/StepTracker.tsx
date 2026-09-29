import React from 'react';
import { ExperimentStep } from '../../types';
import { 
  CheckCircle2, 
  CircleDot, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  Activity, 
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface StepTrackerProps {
  steps: ExperimentStep[];
  activeStepIndex: number;
  isDeviationActive: boolean;
  onAdvanceStep: () => void;
  onPreviousStep: () => void;
  onSelectStep: (index: number) => void;
}

export const StepTracker: React.FC<StepTrackerProps> = ({
  steps,
  activeStepIndex,
  isDeviationActive,
  onAdvanceStep,
  onPreviousStep,
  onSelectStep
}) => {
  return (
    <div className="hud-panel rounded-2xl bg-slate-900/80 border border-slate-700/80 p-5 flex flex-col h-full justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded bg-blue-500/20 text-blue-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Procedural Step Tracker
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                1D-TCN Causal Action Segmentation Engine
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-xs font-mono">
            <span className="text-slate-400">STEP:</span>
            <span className="text-blue-400 font-bold">{activeStepIndex + 1} / {steps.length}</span>
          </div>
        </div>

        {/* Real-time Step Deviation Alert Banner */}
        {isDeviationActive && (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-xs font-mono text-rose-200 animate-pulse shadow-lg shadow-rose-950/50">
            <div className="flex items-center space-x-2 text-rose-300 font-bold mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>OUT-OF-SEQUENCE STEP DETECTED!</span>
            </div>
            <p className="text-[11px] leading-relaxed text-rose-100">
              1D-TCN boundary trigger: Step 3 (Chemical Agitation) attempted prior to complete aspiration of Vial #A3. 
              <strong> Remediation:</strong> Return pipette to Vial A3, aspirate remaining 50µL before vortex mix.
            </p>
          </div>
        )}

        {/* Timeline List */}
        <div className="mt-4 space-y-3">
          {steps.map((step, idx) => {
            const isCompleted = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            const isPending = idx > activeStepIndex;

            return (
              <div
                key={step.id}
                onClick={() => {
                  playSound('tab');
                  onSelectStep(idx);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isCurrent
                    ? isDeviationActive
                      ? 'bg-rose-950/40 border-rose-500/80 shadow-md shadow-rose-950/30'
                      : 'bg-blue-950/50 border-blue-500 shadow-md shadow-blue-500/10'
                    : isCompleted
                    ? 'bg-slate-950/70 border-emerald-500/30 opacity-85 hover:opacity-100'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-80'
                }`}
              >
                {/* Active Indicator Strip */}
                {isCurrent && (
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${isDeviationActive ? 'bg-rose-500' : 'bg-blue-500'}`} />
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-2.5">
                    {/* Status Icon */}
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <CircleDot className={`w-4 h-4 animate-pulse ${isDeviationActive ? 'text-rose-400' : 'text-blue-400'}`} />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-600" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-slate-100">
                          Step {step.id}: {step.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Tool and Verification details if active or completed */}
                      {(isCurrent || isCompleted) && (
                        <div className="mt-2 text-[10px] font-mono text-slate-400 bg-slate-900/90 p-1.5 rounded border border-slate-800">
                          <span className="text-blue-400 font-semibold">VALIDATION: </span>
                          <span>{step.validationCheck}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0 text-right">
                    {isCompleted ? (
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold">
                        COMPLETED (100%)
                      </span>
                    ) : isCurrent ? (
                      <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                        isDeviationActive
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/40 animate-pulse'
                      }`}>
                        {isDeviationActive ? 'DEVIATION' : 'IN PROGRESS'}
                      </span>
                    ) : (
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800">
                        PENDING
                      </span>
                    )}

                    <div className="text-[10px] font-mono text-slate-500 mt-1">
                      Conf: <strong className="text-emerald-400">{step.confidence}%</strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Navigation Controls */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={() => {
            playSound('click');
            onPreviousStep();
          }}
          disabled={activeStepIndex === 0}
          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          ← Prev Step
        </button>

        <span className="text-[11px] font-mono text-slate-500">
          Auto-Advance via 1D-TCN
        </span>

        <button
          onClick={() => {
            playSound('success');
            onAdvanceStep();
          }}
          disabled={activeStepIndex >= steps.length - 1}
          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-mono font-semibold text-white shadow-md shadow-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center space-x-1"
        >
          <span>Next Step</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
