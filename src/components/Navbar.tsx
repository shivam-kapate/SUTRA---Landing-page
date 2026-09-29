import React from 'react';
import { ViewMode } from '../types';
import { playSound } from '../utils/soundEffects';
import { 
  Rocket, 
  Volume2, 
  VolumeX, 
  Layers, 
  Cpu, 
  BarChart3, 
  BookOpen, 
  Play, 
  Compass
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Minimalist ISRO/SUTRA Logo */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => {
              playSound('whoosh');
              onViewChange('landing');
            }} 
            className="flex items-center space-x-2.5 text-left group focus:outline-none"
          >
            <span className="text-xl font-bold tracking-widest text-white uppercase group-hover:text-blue-400 transition-colors">
              SUTRA
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
              SPACE AI
            </span>
          </button>

          {/* Minimal Status Dot */}
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-medium">JETSON ORIN ONLINE</span>
          </div>
        </div>

        {/* Center: Minimal Navigation Links */}
        {currentView === 'landing' ? (
          <nav className="hidden md:flex items-center space-x-8 text-xs tracking-wider uppercase text-slate-300 font-medium">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-white transition-colors relative py-1"
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('cockpit-hud')}
              className="hover:text-white transition-colors relative py-1"
            >
              Cockpit HUD
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className="hover:text-white transition-colors relative py-1"
            >
              Architecture
            </button>
            <button
              onClick={() => handleNavClick('benchmarks')}
              className="hover:text-white transition-colors relative py-1"
            >
              Metrics
            </button>
            <button
              onClick={() => handleNavClick('research')}
              className="hover:text-white transition-colors relative py-1"
            >
              Research
            </button>
          </nav>
        ) : (
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span>MISSION CONTROL ACTIVE</span>
          </div>
        )}

        {/* Right: Sound & Action Pill */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              playSound('click');
              onToggleSound();
            }}
            title={isSoundOn ? 'Mute Audio' : 'Unmute Audio'}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            {isSoundOn ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {currentView === 'landing' ? (
            <button
              onClick={() => {
                playSound('success');
                onViewChange('dashboard');
              }}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/30 text-xs font-medium tracking-wide transition-all shadow-lg backdrop-blur-sm group"
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
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-medium transition-all"
            >
              <span>← Back to Overview</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
