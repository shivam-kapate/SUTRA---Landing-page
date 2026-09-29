import React from 'react';
import { Rocket, ShieldCheck, Cpu, Github, ExternalLink, Bot } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface FooterProps {
  onLaunchDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLaunchDemo }) => {
  return (
    <footer className="relative bg-slate-900 text-slate-100 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-extrabold tracking-tight text-white uppercase">
                SUTRA
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
                EDGE SPACE AI
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md font-normal leading-relaxed">
              Autonomous On-board Assistant for Space Microgravity Experiments & Human Activity Recognition. 
              100% offline TensorRT acceleration on NVIDIA Jetson AGX Orin for ISRO BAS and Gaganyaan science payloads.
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

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              AI Stack
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>YOLOv11 Edge Vision</li>
              <li>Video Swin Transformers</li>
              <li>1D Dilated Temporal Networks</li>
              <li>HO-RCNN Contact Engine</li>
              <li>Llama-3-8B 4-Bit GGUF</li>
              <li>FAISS GPU Local RAG</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Quick Launch
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => {
                  playSound('success');
                  onLaunchDemo();
                }}
                className="w-full text-left px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all flex items-center justify-between shadow-md shadow-blue-500/20"
              >
                <span>+ Launch Mission Control</span>
                <span>→</span>
              </button>
              <a
                href="https://github.com/shivam-kapate/SUTRA---Landing-page.git"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="w-full text-left px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-all flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
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
            <span className="text-emerald-400 font-semibold">STATUS: FLIGHT READY 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
