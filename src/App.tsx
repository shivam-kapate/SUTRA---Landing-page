import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/LandingPage/HeroSection';
import { CopilotShowcaseSection } from './components/LandingPage/CopilotShowcaseSection';
import { ProblemSolution } from './components/LandingPage/ProblemSolution';
import { ArchitecturePipeline } from './components/LandingPage/ArchitecturePipeline';
import { BenchmarksSection } from './components/LandingPage/BenchmarksSection';
import { ResearchSection } from './components/LandingPage/ResearchSection';
import { Footer } from './components/LandingPage/Footer';
import { DashboardView } from './components/LiveDashboard/DashboardView';
import { setSoundEnabled, getSoundEnabled, playSound } from './utils/soundEffects';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const toggleSound = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    setSoundEnabled(nextState);
  };

  const handleLaunchDemo = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreArch = () => {
    setCurrentView('landing');
    setTimeout(() => {
      const el = document.getElementById('architecture');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleExploreCopilot = () => {
    setCurrentView('landing');
    setTimeout(() => {
      const el = document.getElementById('copilot-showcase');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      } else if (e.key === 'd' || e.key === 'D') {
        playSound('whoosh');
        setCurrentView(prev => (prev === 'landing' ? 'dashboard' : 'landing'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSoundOn]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Global Clean Light Aerospace Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        isSoundOn={isSoundOn}
        onToggleSound={toggleSound}
        activeSection={activeSection}
        onNavigateSection={setActiveSection}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <div>
            <HeroSection 
              onLaunchDemo={handleLaunchDemo} 
              onExploreArch={handleExploreArch}
              onExploreCopilot={handleExploreCopilot}
            />
            <CopilotShowcaseSection />
            <ProblemSolution />
            <ArchitecturePipeline />
            <BenchmarksSection />
            <ResearchSection />
            <Footer onLaunchDemo={handleLaunchDemo} />
          </div>
        ) : (
          <DashboardView />
        )}
      </main>
    </div>
  );
}

export default App;
