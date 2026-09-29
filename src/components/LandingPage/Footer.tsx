import React from 'react';
import { Rocket, ShieldCheck, Cpu, Terminal, Github, ExternalLink, Heart, Globe } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface FooterProps {
  onLaunchDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLaunchDemo }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: System Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40">
                <Rocket className="w-4 h-4 text-blue-400" />
              </div>
              <span className="font-mono text-xl font-extrabold tracking-wider text-white">
                SUTRA
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono border border-blue-500/30">
                SPACE AI ASSISTANT
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Autonomous AI On-board Assistant for Space Microgravity Experiments & Onboard Operations. 
              Designed for zero-cloud edge perception on NVIDIA Jetson AGX Orin for BAS & Gaganyaan payloads.
            </p>
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 pt-2">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Telemetry Latency Risk</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>NVIDIA Jetson 275 TOPS</span>
              </span>
            </div>
          </div>

          {/* Col 2: Core Stack */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              AI & Perception Stack
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="hover:text-blue-400 transition-colors">YOLOv11 Real-Time Vision</li>
              <li className="hover:text-blue-400 transition-colors">Video Swin Transformers</li>
              <li className="hover:text-blue-400 transition-colors">1D Dilated Temporal Convolutions</li>
              <li className="hover:text-blue-400 transition-colors">HO-RCNN Spatial Interaction</li>
              <li className="hover:text-blue-400 transition-colors">Llama-3-8B 4-Bit GGUF Engine</li>
              <li className="hover:text-blue-400 transition-colors">FAISS GPU Semantic Indexing</li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Actions */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Mission Control
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => {
                  playSound('success');
                  onLaunchDemo();
                }}
                className="w-full text-left px-3.5 py-2 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 font-mono text-xs hover:bg-blue-600/30 transition-all flex items-center justify-between"
              >
                <span>Launch Live Demo</span>
                <span>→</span>
              </button>
              <a
                href="https://github.com/shivam-kapate/SUTRA---Landing-page.git"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="w-full text-left px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs hover:bg-slate-800 hover:text-white transition-all flex items-center justify-between"
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
            <span>Edge-Native TensorRT</span>
            <span>•</span>
            <span className="text-emerald-400">STATUS: FLIGHT READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
