import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  LATENCY_BENCHMARK_DATA, 
  BANDWIDTH_BENCHMARK_DATA 
} from '../../data/mockData';
import { 
  BarChart3, 
  Zap, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  Gauge,
  Radio,
  Cpu
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
    <section id="benchmarks" className="py-20 border-b border-slate-800/60 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>EMPIRICAL PERFORMANCE VALIDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Quantitative Benchmarks & Edge Metrics
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Validated across simulated microgravity parabolic flight datasets and NVIDIA Jetson AGX Orin 64GB edge hardware.
          </p>
        </div>

        {/* Big Impact Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="hud-panel p-6 rounded-2xl bg-slate-900/60 border border-blue-500/30 flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-mono font-extrabold text-white tracking-tight">
                50x <span className="text-sm font-sans font-normal text-blue-300">Faster</span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                53ms Edge Pipeline vs 2,640ms Ground Telemetry Roundtrip
              </p>
            </div>
          </div>

          <div className="hud-panel p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/30 flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Radio className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-mono font-extrabold text-emerald-400 tracking-tight">
                99.8% <span className="text-sm font-sans font-normal text-emerald-300">Saved</span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                0.08 MB/s Vector Telemetry vs 48.0 MB/s Raw 4K Video
              </p>
            </div>
          </div>

          <div className="hud-panel p-6 rounded-2xl bg-slate-900/60 border border-purple-500/30 flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Gauge className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-mono font-extrabold text-purple-300 tracking-tight">
                98.0% <span className="text-sm font-sans font-normal text-purple-200">Accuracy</span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                1D-TCN Microgravity Action Segmentation & Error Detection
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Chart Container */}
        <div className="hud-panel rounded-2xl p-6 sm:p-8 bg-slate-900/80 border border-slate-700/80">
          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  playSound('tab');
                  setActiveTab('latency');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'latency'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Frame Latency Distribution (ms)
              </button>
              <button
                onClick={() => {
                  playSound('tab');
                  setActiveTab('bandwidth');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'bandwidth'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Telemetry Bandwidth Downlink (MB/s)
              </button>
              <button
                onClick={() => {
                  playSound('tab');
                  setActiveTab('accuracy');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'accuracy'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Zero-G Action Segmentation Accuracy (%)
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Benchmark Target: <span className="text-blue-400 font-semibold">Jetson AGX Orin 64GB (MAXN 50W)</span>
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
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                    label={{ value: 'Latency (Milliseconds - Logarithmic Impact)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#090d16', 
                      borderColor: '#334155', 
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '15px', fontFamily: 'JetBrains Mono', fontSize: '12px' }} 
                  />
                  <Bar dataKey="edgeOrin" name="SUTRA Onboard Jetson Edge (ms)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cloudRelay" name="Traditional Ground Telemetry Relay (ms)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
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
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                    label={{ value: 'Downlink Bandwidth Consumed (MB / Second)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11 }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="mode" 
                    stroke="#64748b" 
                    tick={{ fill: '#e2e8f0', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#090d16', 
                      borderColor: '#334155', 
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="dataRateMBs" name="Data Rate (MB/s)" fill="#10b981" radius={[0, 4, 4, 0]}>
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
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                  />
                  <YAxis 
                    domain={[50, 100]}
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
                    label={{ value: 'Accuracy Score (%)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#090d16', 
                      borderColor: '#334155', 
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '15px', fontFamily: 'JetBrains Mono', fontSize: '12px' }} 
                  />
                  <Bar dataKey="baseline" name="Traditional 2D CNN (Baseline)" fill="#64748b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sutra" name="SUTRA 1D-TCN + Video Swin" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Bottom Insights */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Validated against ISRO Biological & Physical Sciences microgravity operational criteria.</span>
            </div>
            <span className="text-blue-400 font-semibold">99.8% Uplink Telemetry Compression Ratio</span>
          </div>
        </div>
      </div>
    </section>
  );
};
