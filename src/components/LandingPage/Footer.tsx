import React from 'react';
import { Rocket, ShieldCheck, Cpu, Github, ExternalLink } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface FooterProps {
  onLaunchDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLaunchDemo }) => {
  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background Subtle Lunar Launch Atmosphere (Image 3 Style) */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('/assets/rocket_moon_launch.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-14 border-b border-white/10">
          {/* Col 1: System Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-extrabold tracking-widest text-white uppercase">
                SUTRA
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
                EDGE SPACE AI
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md font-light leading-relaxed">
              Autonomous On-board Assistant for Space Microgravity Experiments & Onboard Operations. 
              Zero-cloud TensorRT acceleration for ISRO BAS and Gaganyaan payload modules.
            </p>
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 pt-2">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Telemetry Latency</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>275 TOPS NVIDIA Jetson</span>
              </span>
            </div>
          </div>

          {/* Col 2: Core Stack */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              AI Architecture
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>YOLOv11 Edge Vision</li>
              <li>Video Swin Transformers</li>
              <li>1D Dilated Temporal Networks</li>
              <li>HO-RCNN Contact Engine</li>
              <li>Llama-3-8B 4-Bit GGUF</li>
              <li>FAISS GPU Vector RAG</li>
            </ul>
          </div>

          {/* Col 3: Actions */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Quick Launch
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => {
                  playSound('success');
                  onLaunchDemo();
                }}
                className="w-full text-left px-4 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-medium text-xs transition-all flex items-center justify-between"
              >
                <span>+ Launch Mission Control</span>
                <span>→</span>
              </button>
              <a
                href="https://github.com/shivam-kapate/SUTRA---Landing-page.git"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="w-full text-left px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-xs transition-all flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} SUTRA Space AI System. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>ISRO BAS Compatible</span>
            <span>•</span>
            <span className="text-emerald-400">STATUS: FLIGHT READY 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
