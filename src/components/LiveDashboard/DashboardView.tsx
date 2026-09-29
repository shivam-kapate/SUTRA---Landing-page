import React, { useState } from 'react';
import { EXPERIMENT_PROTOCOLS } from '../../data/mockData';
import { ExperimentStep } from '../../types';
import { MissionControlHeader } from './MissionControlHeader';
import { SimulatedStreamWindow } from './SimulatedStreamWindow';
import { StepTracker } from './StepTracker';
import { VoiceRagAssistant } from './VoiceRagAssistant';
import { HardwareTelemetryDrawer } from './HardwareTelemetryDrawer';
import { playSound } from '../../utils/soundEffects';
import { 
  Download, 
  X, 
  FileCheck, 
  CheckCircle2, 
  Terminal, 
  Activity,
  Layers
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const [protocolKey, setProtocolKey] = useState<string>('bio-incubation');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);
  const [isDeviationActive, setIsDeviationActive] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const currentProtocol = EXPERIMENT_PROTOCOLS[protocolKey] || EXPERIMENT_PROTOCOLS['bio-incubation'];
  const steps = currentProtocol.steps;

  const handleAdvanceStep = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
      setIsDeviationActive(false);
    }
  };

  const handlePreviousStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
      setIsDeviationActive(false);
    }
  };

  const handleReset = () => {
    setActiveStepIndex(0);
    setIsDeviationActive(false);
  };

  const handleTriggerDeviation = () => {
    setIsDeviationActive(!isDeviationActive);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      {/* Top Mission Control Header */}
      <MissionControlHeader
        currentProtocolKey={protocolKey}
        onSelectProtocol={(key) => {
          setProtocolKey(key);
          setActiveStepIndex(0);
          setIsDeviationActive(false);
        }}
        onResetSimulation={handleReset}
        isDeviationActive={isDeviationActive}
        onTriggerDeviation={handleTriggerDeviation}
        onExportReport={() => setShowExportModal(true)}
      />

      {/* Main Mission Control Workspace (16:9 optimized split layout) */}
      <div className="flex-1 p-4 sm:p-6 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Live Simulated Camera Stream & Fast Telemetry Event Log (7 Cols ~ 58%) */}
        <div className="lg:col-span-7 space-y-4">
          <SimulatedStreamWindow
            isDeviationActive={isDeviationActive}
            onTriggerDeviation={handleTriggerDeviation}
            activeStepIndex={activeStepIndex}
          />

          {/* Real-time Sub-Action Boundary Log */}
          <div className="hud-panel p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="flex items-center space-x-1.5 text-blue-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>1D-TCN TEMPORAL BOUNDARY LOG</span>
              </span>
              <span className="text-[10px] text-slate-500">POLLING: 120 HZ</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="text-emerald-400">
                [T+00:02:14] EVENT: Step 1 boundary confirmed (P1000 tool grip duration 41s, confidence 98.7%)
              </div>
              <div className="text-blue-300">
                [T+00:02:55] INGEST: Step 2 active - HO-RCNN tracking hand contact with Cryo-Vial #A3 (meniscus angle nominal)
              </div>
              {isDeviationActive && (
                <div className="text-rose-400 font-bold animate-pulse">
                  [T+00:03:12] ANOMALY WARNING: Reagent bottle uncapped out-of-order. Action vector deviated by Δ=0.48.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Step Tracker & Cognitive RAG Copilot (5 Cols ~ 42%) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col">
          {/* Step Tracker */}
          <div className="h-auto">
            <StepTracker
              steps={steps}
              activeStepIndex={activeStepIndex}
              isDeviationActive={isDeviationActive}
              onAdvanceStep={handleAdvanceStep}
              onPreviousStep={handlePreviousStep}
              onSelectStep={(idx) => {
                setActiveStepIndex(idx);
                setIsDeviationActive(false);
              }}
            />
          </div>

          {/* Voice & Cognitive RAG Assistant */}
          <div className="h-[420px]">
            <VoiceRagAssistant />
          </div>
        </div>
      </div>

      {/* Hardware Telemetry Drawer (Bottom Bar) */}
      <HardwareTelemetryDrawer />

      {/* Export Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="hud-panel p-6 sm:p-8 rounded-2xl bg-slate-900 border border-blue-500/50 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => {
                playSound('click');
                setShowExportModal(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-mono">
                  Export Flight Telemetry Log
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  ISRO BAS Telemetry Formatted JSON / HDF5
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2 mb-6">
              <div><strong>Protocol:</strong> {currentProtocol.name}</div>
              <div><strong>Target SoC:</strong> NVIDIA Jetson AGX Orin 64GB</div>
              <div><strong>Active Step:</strong> {steps[activeStepIndex].title}</div>
              <div><strong>Bandwidth Downlink:</strong> 0.08 MB/s (99.8% compressed)</div>
              <div><strong>Anomaly Status:</strong> {isDeviationActive ? '1 DEVIATION LOGGED' : '0 ERRORS (NOMINAL)'}</div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  playSound('success');
                  const reportData = {
                    mission: 'ISRO BAS Experiment Glovebox #02',
                    system: 'SUTRA Autonomous Edge AI Assistant',
                    protocol: currentProtocol,
                    timestamp: new Date().toISOString(),
                    telemetryStatus: 'NOMINAL',
                    stepIndex: activeStepIndex,
                    deviationReport: isDeviationActive ? 'OutOfSequenceAttempted' : 'None'
                  };
                  const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `SUTRA_FLIGHT_LOG_${Date.now()}.json`;
                  a.click();
                  setShowExportModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all text-center flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON Payload</span>
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-mono text-xs hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
