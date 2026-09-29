import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  Legend
} from 'recharts';
import { 
  LATENCY_BENCHMARK_DATA, 
  BANDWIDTH_BENCHMARK_DATA 
} from '../../data/mockData';
import { 
  BarChart3, 
  Zap, 
  Activity, 
  Gauge, 
  Radio 
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

const STEP_ACCURACY_DATA = [
  { protocol: 'Tool Extraction', baseline: 76.4, sutra: 98.7 },
  { protocol: 'Sample Aspiration', baseline: 68.2, sutra: 96.4 },
  { protocol: 'Vortex Mixing', baseline: 81.0, sutra: 97.8 },
  { protocol: 'Cryo-Sealing', baseline: 72.5, sutra: 99.1 },
  { protocol: 'Mean Overall', baseline: 74.5, sutra: 98.0 },
];

export const BenchmarksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'latency' | 'bandwidth' | 'accuracy'>('latency');

  return (
    <section id="benchmarks" className="py-20 px-6 sm:px-12 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>EMPIRICAL PERFORMANCE VALIDATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Quantitative Benchmarks & Edge Metrics
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Validated across simulated microgravity parabolic flight datasets and NVIDIA Jetson AGX Orin 64GB edge hardware.
          </p>
        </div>

        {/* Big Impact Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-blue-50/60 border border-blue-200 flex items-center space-x-4 shadow-sm">
            <div className="p-4 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-mono font-extrabold text-slate-900">
                50x <span className="text-sm font-sans font-normal text-blue-700">Faster</span>
              </div>
              <p className="text-xs text-slate-600 font-mono mt-0.5">
                53ms Edge Pipeline vs 2,640ms Ground Telemetry
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200 flex items-center space-x-4 shadow-sm">
            <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-mono font-extrabold text-emerald-700">
                99.8% <span className="text-sm font-sans font-normal text-emerald-800">Saved</span>
              </div>
              <p className="text-xs text-slate-600 font-mono mt-0.5">
                0.08 MB/s Vector Telemetry vs 48.0 MB/s Raw Video
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-purple-50/60 border border-purple-200 flex items-center space-x-4 shadow-sm">
            <div className="p-4 rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-mono font-extrabold text-purple-800">
                98.0% <span className="text-sm font-sans font-normal text-purple-700">Accuracy</span>
              </div>
              <p className="text-xs text-slate-600 font-mono mt-0.5">
                1D-TCN Microgravity Action Segmentation
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Chart Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-lg">
          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center space-x-2 bg-slate-200/80 p-1.5 rounded-2xl">
              <button
                onClick={() => {
                  playSound('tab');
                  setActiveTab('latency');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'latency'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                1. Frame Latency (ms)
              </button>
              <button
                onClick={() => {
                  playSound('tab');
                  setActiveTab('bandwidth');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'bandwidth'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                2. Telemetry Downlink (MB/s)
              </button>
              <button
                onClick={() => {
                  playSound('tab');
                  setActiveTab('accuracy');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'accuracy'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                3. Zero-G Action Accuracy (%)
              </button>
            </div>

            <div className="text-xs font-mono text-slate-600">
              Benchmark Target: <span className="text-blue-700 font-bold">NVIDIA Jetson AGX Orin 64GB</span>
            </div>
          </div>

          {/* Chart Rendering Area */}
          <div className="mt-6 h-80 sm:h-96 w-full">
            {activeTab === 'latency' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={LATENCY_BENCHMARK_DATA}
                  margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
                >
                  <XAxis 
                    dataKey="module" 
                    stroke="#64748b" 
                    tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                    label={{ value: 'Latency (Milliseconds)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderColor: '#cbd5e1', 
                      borderRadius: '12px',
                      color: '#0f172a',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '15px', fontFamily: 'JetBrains Mono', fontSize: '12px' }} 
                  />
                  <Bar dataKey="edgeOrin" name="SUTRA Onboard Jetson Edge (ms)" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="cloudRelay" name="Traditional Ground Telemetry Relay (ms)" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeTab === 'bandwidth' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={BANDWIDTH_BENCHMARK_DATA}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                >
                  <XAxis 
                    type="number" 
                    stroke="#64748b" 
                    tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                    label={{ value: 'Downlink Bandwidth Consumed (MB / Second)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11 }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="mode" 
                    stroke="#64748b" 
                    tick={{ fill: '#1e293b', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderColor: '#cbd5e1', 
                      borderRadius: '12px',
                      color: '#0f172a',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="dataRateMBs" name="Data Rate (MB/s)" fill="#10b981" radius={[0, 6, 6, 0]}>
                    {BANDWIDTH_BENCHMARK_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? '#10b981' : index === 1 ? '#f59e0b' : '#f43f5e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeTab === 'accuracy' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={STEP_ACCURACY_DATA}
                  margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
                >
                  <XAxis 
                    dataKey="protocol" 
                    stroke="#64748b" 
                    tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                  />
                  <YAxis 
                    domain={[50, 100]}
                    stroke="#64748b" 
                    tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                    label={{ value: 'Accuracy Score (%)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderColor: '#cbd5e1', 
                      borderRadius: '12px',
                      color: '#0f172a',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '15px', fontFamily: 'JetBrains Mono', fontSize: '12px' }} 
                  />
                  <Bar dataKey="baseline" name="Traditional 2D CNN (Baseline)" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="sutra" name="SUTRA 1D-TCN + Video Swin" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
