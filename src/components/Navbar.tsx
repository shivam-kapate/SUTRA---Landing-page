import React from 'react';
import { ViewMode } from '../types';
import { playSound } from '../utils/soundEffects';
import { 
  Rocket, 
  Activity, 
  Layers, 
  Cpu, 
  BarChart3, 
  BookOpen, 
  Play, 
  Volume2, 
  VolumeX, 
  Radio
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  isSoundOn,
  onToggleSound,
  activeSection = 'hero',
  onNavigateSection
}) => {
  const handleNavClick = (sectionId: string) => {
    playSound('click');
    if (currentView !== 'landing') {
      onViewChange('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigateSection) onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Branding & Status Badge */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              playSound('whoosh');
              onViewChange('landing');
            }} 
            className="flex items-center space-x-3 text-left group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 group-hover:border-blue-400 group-hover:bg-blue-500/20 transition-all duration-300">
              <Rocket className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 rounded-lg bg-blue-400/10 animate-ping pointer-events-none opacity-40"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xl font-extrabold tracking-wider text-white group-hover:text-blue-300 transition-colors">
                  SUTRA
                </span>
                <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-medium border border-blue-500/30">
                  v2.4-EDGE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Autonomous Space AI Assistant
              </p>
            </div>
          </button>

          {/* Blinking Green Edge Node Indicator */}
          <div className="hidden lg:flex items-center space-x-2 pl-4 border-l border-slate-800 text-xs font-mono">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-medium text-[11px] tracking-wide">
              EDGE NODE: ONLINE
            </span>
            <span className="text-slate-500 text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              JETSON AGX ORIN
            </span>
          </div>
        </div>

        {/* Center: Navigation Links (Landing mode) */}
        {currentView === 'landing' ? (
          <nav className="hidden md:flex items-center space-x-1 font-mono text-xs text-slate-300">
            <button
              onClick={() => handleNavClick('architecture')}
              className={`px-3 py-1.5 rounded-md hover:text-white hover:bg-slate-800/60 transition-colors flex items-center space-x-1.5 ${activeSection === 'architecture' ? 'text-blue-400 bg-blue-500/10' : ''}`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture</span>
            </button>
            <button
              onClick={() => handleNavClick('problem-solution')}
              className={`px-3 py-1.5 rounded-md hover:text-white hover:bg-slate-800/60 transition-colors flex items-center space-x-1.5 ${activeSection === 'problem-solution' ? 'text-blue-400 bg-blue-500/10' : ''}`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Modules</span>
            </button>
            <button
              onClick={() => handleNavClick('benchmarks')}
              className={`px-3 py-1.5 rounded-md hover:text-white hover:bg-slate-800/60 transition-colors flex items-center space-x-1.5 ${activeSection === 'benchmarks' ? 'text-blue-400 bg-blue-500/10' : ''}`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Performance</span>
            </button>
            <button
              onClick={() => handleNavClick('research')}
              className={`px-3 py-1.5 rounded-md hover:text-white hover:bg-slate-800/60 transition-colors flex items-center space-x-1.5 ${activeSection === 'research' ? 'text-blue-400 bg-blue-500/10' : ''}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research</span>
            </button>
          </nav>
        ) : (
          <div className="flex items-center space-x-2 text-xs font-mono bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="text-slate-400">TELEMETRY STREAM:</span>
            <span className="text-blue-400 font-bold">42.8 FPS @ 18.2ms</span>
          </div>
        )}

        {/* Right: Sound Toggle & CTA Switcher */}
        <div className="flex items-center space-x-3">
          {/* Sound Mute/Unmute */}
          <button
            onClick={() => {
              playSound('click');
              onToggleSound();
            }}
            title={isSoundOn ? 'Mute HUD Audio' : 'Unmute HUD Audio'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            {isSoundOn ? (
              <Volume2 className="w-4 h-4 text-blue-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Launch Interactive Demo / Back to Overview Button */}
          {currentView === 'landing' ? (
            <button
              onClick={() => {
                playSound('success');
                onViewChange('dashboard');
              }}
              className="relative group inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-mono font-semibold tracking-wide border border-blue-400/40 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current group-hover:translate-x-0.5 transition-transform" />
              <span>Launch Interactive Demo</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            </button>
          ) : (
            <button
              onClick={() => {
                playSound('whoosh');
                onViewChange('landing');
              }}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono font-medium hover:bg-slate-800 hover:border-slate-600 transition-all"
            >
              <span>← Back to Architecture</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
