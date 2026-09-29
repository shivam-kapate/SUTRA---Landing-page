import React from 'react';
import { ViewMode } from '../types';
import { playSound } from '../utils/soundEffects';
import { 
  Rocket, 
  Volume2, 
  VolumeX, 
  Play, 
  Bot,
  Activity,
  Layers,
  BarChart3,
  BookOpen
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: SUTRA Space AI Branding */}
        <div className="flex items-center space-x-5">
          <button 
            onClick={() => {
              playSound('whoosh');
              onViewChange('landing');
            }} 
            className="flex items-center space-x-2.5 text-left group focus:outline-none"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20">
              S
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              SUTRA
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              SPACE AI
            </span>
          </button>

          {/* Minimal Status Dot */}
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-600 pl-3 border-l border-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-700 font-medium text-[11px]">JETSON ORIN: <strong className="text-emerald-600">ONLINE</strong></span>
          </div>
        </div>

        {/* Center: Clean Navigation Links */}
        {currentView === 'landing' ? (
          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold tracking-wide text-slate-600">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-blue-600 transition-colors py-1"
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('copilot-showcase')}
              className="hover:text-blue-600 text-blue-700 font-bold flex items-center space-x-1.5 transition-colors py-1 bg-blue-50/80 px-2.5 rounded-full border border-blue-200/70"
            >
              <Bot className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Copilot & RAG</span>
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className="hover:text-blue-600 transition-colors py-1"
            >
              Architecture
            </button>
            <button
              onClick={() => handleNavClick('benchmarks')}
              className="hover:text-blue-600 transition-colors py-1"
            >
              Metrics
            </button>
            <button
              onClick={() => handleNavClick('research')}
              className="hover:text-blue-600 transition-colors py-1"
            >
              Research
            </button>
          </nav>
        ) : (
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            <span className="font-bold">MISSION CONTROL SANDBOX ACTIVE</span>
          </div>
        )}

        {/* Right: Audio Toggle & Action Pill */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              playSound('click');
              onToggleSound();
            }}
            title={isSoundOn ? 'Mute Audio' : 'Unmute Audio'}
            className="p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all"
          >
            {isSoundOn ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {currentView === 'landing' ? (
            <button
              onClick={() => {
                playSound('success');
                onViewChange('dashboard');
              }}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs tracking-wide transition-all shadow-md shadow-blue-500/20 active:scale-95 group"
            >
              <span className="font-bold">+</span>
              <span>Launch Mission Control</span>
            </button>
          ) : (
            <button
              onClick={() => {
                playSound('whoosh');
                onViewChange('landing');
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-medium transition-all"
            >
              <span>← Back to Overview</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
