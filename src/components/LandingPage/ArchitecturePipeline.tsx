import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  Database, 
  Cpu, 
  Radio, 
  Terminal, 
  CheckCircle2, 
  Code2, 
  Zap, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Binary
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface ArchitectureLayer {
  id: number;
  name: string;
  subtitle: string;
  tag: string;
  icon: React.ReactNode;
  models: string[];
  latency: string;
  throughput: string;
  keyFunctions: string[];
  codeSnippet: string;
  tensorEngine: string;
  dataFlow: {
    input: string;
    transformation: string;
    output: string;
  };
}

const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 1,
    name: 'Vision & Microgravity Perception',
    subtitle: 'Zero-G 6-DOF Tool Tracking & Hand Pose Estimation',
    tag: 'LAYER 1: PERCEPTION',
    icon: <Eye className="w-5 h-5 text-blue-400" />,
    models: ['YOLOv11-Nano (TensorRT FP16)', 'Video Swin Transformer (3D Shifts)', 'MediaPipe Microgravity-Tuned Hands'],
    latency: '12.4 ms',
    throughput: '45.2 FPS',
    keyFunctions: [
      'Multi-camera synchronized ingest (Payload Glovebox Cam + Overhead Macro Cam).',
      'Floating micro-tool detection with invariant rotation angles in microgravity.',
      '21-point 3D astronaut hand skeleton tracking under partial optical occlusion.',
      'Real-time confidence scoring (>95%) for small bio-vials, pipettes, and syringes.'
    ],
    codeSnippet: `// SUTRA Edge Vision Pipeline - TensorRT Execution
import { TensorRTEngine, VideoSwinBackbone } from 'sutra-cv';

const visionNode = new TensorRTEngine({
  precision: 'FP16',
  dlaCore: 0, // Offload to Jetson DLA
  batchSize: 1,
  inputResolution: [640, 640, 3]
});

const detections = await visionNode.inferMultiScale({
  frameBuffer: payloadCamFeed.current,
  nmsThreshold: 0.45,
  trackMicrogravityDrift: true
});
// Outputs: BoundingBoxes, 3D Pose Keypoints, Hand-Object Contact Graph`,
    tensorEngine: 'NVIDIA TensorRT 10.0 + Jetson DLA (Deep Learning Accelerator)',
    dataFlow: {
      input: 'Dual 1080p@60fps RGB Sensor Streams',
      transformation: 'Spatio-Temporal Window Attention + Dynamic Anchorless Bounding Boxes',
      output: 'Normalized 6-DOF Tool Coordinates + Hand Keypoint Vector'
    }
  },
  {
    id: 2,
    name: 'Sequence Logic & Occlusion Engine',
    subtitle: 'Causal Action Segmentation & Procedural Error Alerting',
    tag: 'LAYER 2: SEQUENCE LOGIC',
    icon: <Layers className="w-5 h-5 text-emerald-400" />,
    models: ['Dilated 1D-TCN (Temporal Convolutional Network)', 'HO-RCNN (Hand-Object Interaction)', 'Markov State Automata'],
    latency: '5.8 ms',
    throughput: '120 Hz Eval Rate',
    keyFunctions: [
      'Continuous temporal segmentation over rolling 300-frame gesture window.',
      'Automated state transition verification against active ISRO SOP graph.',
      'Deviation & skip-step anomaly detection triggered in <50ms.',
      'Contact state classification (Grasping, Inverting, Aspirating, Capping).'
    ],
    codeSnippet: `// 1D-TCN Action Boundary & Step Verification
import { DilatedTCN, StateTransitionValidator } from 'sutra-temporal';

const tcnEngine = new DilatedTCN({
  layers: 6,
  kernelSize: 3,
  dilationRates: [1, 2, 4, 8, 16, 32],
  causalPadding: true
});

const { activeStep, stepConfidence, anomalyFlag } = tcnEngine.evaluateStepTransition({
  temporalPoseSequence: windowBuffer,
  activeProtocol: 'BIO-SAMP-04',
  expectedNextStep: 2
});

if (anomalyFlag.isDeviationDetected) {
  sutraHUD.raiseAuditoryWarning("Deviation: Skipped Reagent Agitation");
}`,
    tensorEngine: 'CUDA 12.2 Kernel Optimized Causal Convolutions',
    dataFlow: {
      input: 'Temporal Trajectory Sequence (T=300 Frames)',
      transformation: 'Multi-Scale Dilated Convolutions + Temporal Receptive Field Matching',
      output: 'Active Step ID, Completion Probability %, Anomaly Signals'
    }
  },
  {
    id: 3,
    name: 'Cognitive Local RAG Pipeline',
    subtitle: 'Zero-Cloud ISRO Manual QA & Intelligent Astronaut Copilot',
    tag: 'LAYER 3: COGNITIVE RAG',
    icon: <Database className="w-5 h-5 text-amber-400" />,
    models: ['Llama-3-8B-Instruct (4-Bit GGUF / llama.cpp)', 'BGE-Small-EN-v1.5 Quantized Embeddings', 'FAISS GPU Indexing'],
    latency: '2.8 ms (Vector Search)',
    throughput: '28.4 Tokens/Sec',
    keyFunctions: [
      '100% offline retrieval over full ISRO BAS mission manuals and safety directives.',
      'HNSW GPU indexing with Cosine Similarity filtering (>0.90 similarity threshold).',
      'Zero-hallucination prompt constraints tied to exact page/paragraph citations.',
      'Contextualized troubleshooting for unexpected zero-g fluid dynamics anomalies.'
    ],
    codeSnippet: `// Local Offline FAISS & Quantized Llama-3 Execution
import { FAISSGPUIndex, LlamaCppEngine } from 'sutra-rag';

const vectorStore = await FAISSGPUIndex.load('/opt/sutra/isro_manuals.index');
const topChunks = vectorStore.searchVectors(queryEmbedding, { topK: 3 });

const responseStream = await LlamaCppEngine.generate({
  modelPath: '/opt/models/llama-3-8b-instruct.Q4_K_M.gguf',
  systemPrompt: 'You are SUTRA, onboard space assistant for Gaganyaan/BAS.',
  contextSnippets: topChunks.map(c => c.text),
  maxTokens: 256,
  temperature: 0.1 // High precision, deterministic
});`,
    tensorEngine: 'Unified LPDDR5 Memory + llama.cpp CUDA BLAS Backing',
    dataFlow: {
      input: 'Natural Language Crew Voice / Text Query',
      transformation: 'GPU Dense Retrieval + Grounded In-Context Prompt Injection',
      output: 'Synthesized Procedural Guidance + Exact Manual Citation Hashes'
    }
  },
  {
    id: 4,
    name: 'Voice & Hardware Execution',
    subtitle: 'Ultra-Low Power Jetson AGX Orin Hardware Orchestration',
    tag: 'LAYER 4: HARDWARE & SPEECH',
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    models: ['Whisper.cpp Tiny/Base (Streaming STT)', 'Piper Neural TTS (Offline Audio Synthesis)', 'Jetson Power Governor'],
    latency: '85 ms (Speech-to-Text)',
    throughput: '38.5 W Average Power',
    keyFunctions: [
      'Real-time hands-free speech recognition in noisy cabin fan environments.',
      'Dynamic power throttling across 15W, 30W, and 50W MAXN power profiles.',
      'Radiation-hardened watchdog process monitoring with automated CUDA restart.',
      'Compact vector metadata serialization for lightweight ground downlink telemetry.'
    ],
    codeSnippet: `// Whisper.cpp Streaming + NV Power Governor
import { WhisperStreaming, JetsonPowerManager } from 'sutra-edge-hw';

const stt = new WhisperStreaming({
  model: 'ggml-base.en.bin',
  sampleRate: 16000,
  noiseSuppression: 'SpaceCabinFilter_v2'
});

JetsonPowerManager.setThermalProfile('ORIN_30W_ALL_CORES', {
  maxJunctionTemp: 75, // Celsius
  cudaFrequencyMHz: 1300
});

stt.on('transcriptionComplete', (utterance) => {
  sutraEventBus.emit('CREW_VOICE_COMMAND', utterance);
});`,
    tensorEngine: 'Jetson Orin 275 TOPS Ampere GPU + ARM Cortex-A78AE CPU',
    dataFlow: {
      input: 'Cockpit Microphone Stream + Cabin Ambient Acoustics',
      transformation: 'Streaming Mel Spectrograms + Beam Search Token Decoder',
      output: 'Low-latency Text Tokens & Telemetry Event Broadcast'
    }
  }
];

export const ArchitecturePipeline: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<number>(1);
  const activeLayer = ARCHITECTURE_LAYERS.find(l => l.id === activeLayerId) || ARCHITECTURE_LAYERS[0];

  return (
    <section id="architecture" className="py-20 border-b border-slate-800/60 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>4-LAYER MODULAR EDGE STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Technical Architecture Pipeline
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A vertically integrated edge AI stack engineered specifically for zero-gravity perception, 
            microsecond action sequencing, and local cognitive autonomy on NVIDIA Jetson AGX Orin.
          </p>
        </div>

        {/* 4 Layer Interactive Tab Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {ARCHITECTURE_LAYERS.map(layer => {
            const isSelected = layer.id === activeLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => {
                  playSound('tab');
                  setActiveLayerId(layer.id);
                }}
                className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-500/10 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-blue-400 font-bold uppercase">
                    {layer.tag}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-500'}`}>
                    {layer.icon}
                  </div>
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-slate-100">
                  {layer.name}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-2">
                  Latency: <span className="text-emerald-400 font-semibold">{layer.latency}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Layer Deep Dive Card */}
        <div className="hud-panel rounded-2xl p-6 sm:p-8 bg-slate-900/80 border border-slate-700/80 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Specs & Key Functions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 mb-1">
                  <span>SYSTEM LAYER {activeLayer.id} SPECIFICATION</span>
                  <span>•</span>
                  <span>{activeLayer.tensorEngine}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {activeLayer.name}
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  {activeLayer.subtitle}
                </p>
              </div>

              {/* Hardware & Latency Badges */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  ⚡ Inference Latency: <strong className="text-emerald-400">{activeLayer.latency}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  📊 Throughput: <strong className="text-blue-400">{activeLayer.throughput}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  🎯 Engine: <strong className="text-purple-400">TensorRT / CUDA</strong>
                </span>
              </div>

              {/* Models Deployed */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  ACTIVE NEURAL ARCHITECTURES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.models.map((model, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-mono"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Capabilities */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  OPERATIONAL CAPABILITIES:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-normal">
                  {activeLayer.keyFunctions.map((func, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{func}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Input-Transformation-Output Pipeline */}
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-[11px] text-slate-400 font-bold uppercase">
                  Data Flow Pipeline:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">INPUT</span>
                    <span className="text-xs text-blue-300">{activeLayer.dataFlow.input}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">TRANSFORM</span>
                    <span className="text-xs text-emerald-300">{activeLayer.dataFlow.transformation}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">OUTPUT</span>
                    <span className="text-xs text-purple-300">{activeLayer.dataFlow.output}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Live Code & Execution Simulator (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-full">
                {/* Code Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                    <span className="ml-2 text-slate-300 text-[11px]">sutra_layer_{activeLayer.id}_engine.ts</span>
                  </div>
                  <span className="text-[10px] text-blue-400 font-mono">TypeScript / TensorRT</span>
                </div>

                {/* Code Body */}
                <div className="p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed flex-1 bg-[#050914]">
                  <pre className="text-[11px] leading-5 text-slate-300">
                    <code>{activeLayer.codeSnippet}</code>
                  </pre>
                </div>

                {/* Bottom Execution Bar */}
                <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <Binary className="w-3.5 h-3.5" />
                    <span>CUDA KERNEL COMPILED (SM_87)</span>
                  </span>
                  <span className="text-slate-500">0 KB CLOUD UPLINK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
