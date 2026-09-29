import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Eye, 
  Maximize2, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Settings2,
  Scan,
  RefreshCw,
  Video
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface SimulatedStreamWindowProps {
  isDeviationActive: boolean;
  onTriggerDeviation: () => void;
  activeStepIndex: number;
}

export const SimulatedStreamWindow: React.FC<SimulatedStreamWindowProps> = ({
  isDeviationActive,
  onTriggerDeviation,
  activeStepIndex
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCam, setActiveCam] = useState<'cam1' | 'cam2' | 'cam3'>('cam1');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [fpsCounter, setFpsCounter] = useState(42.6);

  // Microgravity simulated floating objects physics state
  const stateRef = useRef({
    time: 0,
    // Pipette
    pipette: { x: 260, y: 190, vx: 0.25, vy: -0.15, angle: 0.12 },
    // Sample Vial
    vial: { x: 420, y: 250, vx: -0.18, vy: 0.22, angle: -0.08 },
    // Hand Keypoints (21 points)
    handBase: { x: 220, y: 240 }
  });

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const s = stateRef.current;
      s.time += 0.02;

      // Update positions with gentle microgravity floating wave
      s.pipette.x = 260 + Math.sin(s.time * 0.8) * 22;
      s.pipette.y = 190 + Math.cos(s.time * 0.6) * 16;
      s.pipette.angle = Math.sin(s.time * 0.5) * 0.08;

      s.vial.x = 410 + Math.cos(s.time * 0.7) * 18;
      s.vial.y = 260 + Math.sin(s.time * 0.9) * 14;

      s.handBase.x = 220 + Math.sin(s.time * 0.8) * 18;
      s.handBase.y = 240 + Math.cos(s.time * 0.6) * 12;

      // Clear canvas
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, width, height);

      // Draw background payload rack / glovebox environment
      // Grid background
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Glovebox Rack Chamber Geometry
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, width - 60, height - 60);

      // Draw Glove Port Ring (Glovebox Port Left & Right)
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.5)';
      ctx.beginPath();
      ctx.arc(100, height - 80, 50, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width - 100, height - 80, 50, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Central Experiment Station / Test Tube Rack
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(320, 180, 180, 140);
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
      ctx.strokeRect(320, 180, 180, 140);

      // Station Wells
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          ctx.arc(350 + i * 35, 210 + j * 35, 10, 0, Math.PI * 2);
          ctx.fillStyle = (i === 1 && j === 1) ? 'rgba(59, 130, 246, 0.4)' : 'rgba(30, 41, 59, 0.7)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
          ctx.stroke();
        }
      }

      // Draw Simulated Astronaut Hand Glove & Fingers
      const hx = s.handBase.x;
      const hy = s.handBase.y;

      ctx.save();
      // Glove Arm Shadow & Outline
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(hx - 40, hy + 80);
      ctx.lineTo(hx + 30, hy + 50);
      ctx.lineTo(120, height);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Hand Palm
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.ellipse(hx, hy + 20, 28, 38, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw Pipette Tool (in hand or floating)
      const px = s.pipette.x;
      const py = s.pipette.y;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(s.pipette.angle);

      // Pipette body
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-8, -60, 16, 120);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(-6, -75, 12, 18); // top plunger
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath(); // tip
      ctx.moveTo(-4, 60);
      ctx.lineTo(4, 60);
      ctx.lineTo(1, 90);
      ctx.lineTo(-1, 90);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw Sample Cryo-Vial #A3
      const vx = s.vial.x;
      const vy = s.vial.y;
      ctx.save();
      ctx.translate(vx, vy);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fillRect(-12, -25, 24, 50);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(-12, -25, 24, 50);
      // Fluid meniscus in zero-g (spherical curved droplet)
      ctx.fillStyle = isDeviationActive ? 'rgba(244, 63, 94, 0.7)' : 'rgba(16, 185, 129, 0.6)';
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      // Cap
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-14, -34, 28, 9);
      ctx.restore();

      ctx.restore();

      // -------------------------------------------------------------
      // AI SKELETON POSE OVERLAY (Layer 1 MediaPipe / Video Swin)
      // -------------------------------------------------------------
      if (showSkeleton) {
        const joints = [
          { x: hx, y: hy + 20 }, // wrist
          { x: hx - 15, y: hy - 5 }, // thumb base
          { x: hx - 22, y: hy - 25 }, // thumb tip
          { x: hx - 5, y: hy - 25 }, // index base
          { x: hx - 4, y: hy - 50 }, // index tip
          { x: hx + 10, y: hy - 25 }, // middle base
          { x: hx + 12, y: hy - 52 }, // middle tip
          { x: hx + 22, y: hy - 20 }, // ring base
          { x: hx + 25, y: hy - 45 }, // ring tip
          { x: hx + 32, y: hy - 12 }, // pinky base
          { x: hx + 38, y: hy - 32 }, // pinky tip
        ];

        // Draw bone links
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        // connect wrist to bases
        [1, 3, 5, 7, 9].forEach(idx => {
          ctx.moveTo(joints[0].x, joints[0].y);
          ctx.lineTo(joints[idx].x, joints[idx].y);
        });
        // connect base to tips
        ctx.moveTo(joints[1].x, joints[1].y); ctx.lineTo(joints[2].x, joints[2].y);
        ctx.moveTo(joints[3].x, joints[3].y); ctx.lineTo(joints[4].x, joints[4].y);
        ctx.moveTo(joints[5].x, joints[5].y); ctx.lineTo(joints[6].x, joints[6].y);
        ctx.moveTo(joints[7].x, joints[7].y); ctx.lineTo(joints[8].x, joints[8].y);
        ctx.moveTo(joints[9].x, joints[9].y); ctx.lineTo(joints[10].x, joints[10].y);
        ctx.stroke();

        // Draw joint circles
        joints.forEach((j, idx) => {
          ctx.fillStyle = idx === 0 ? '#3b82f6' : '#a855f7';
          ctx.beginPath();
          ctx.arc(j.x, j.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // -------------------------------------------------------------
      // AI BOUNDING BOXES OVERLAY (YOLOv11 TensorRT)
      // -------------------------------------------------------------
      if (showBoundingBoxes) {
        // Box 1: Micropipette
        const pBox = { x: s.pipette.x - 25, y: s.pipette.y - 85, w: 50, h: 185 };
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(pBox.x, pBox.y, pBox.w, pBox.h);
        
        // Label badge
        ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
        ctx.fillRect(pBox.x, pBox.y - 18, 140, 18);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText('PIPETTE_P1000: 98.4%', pBox.x + 4, pBox.y - 5);

        // Corner ticks
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pBox.x, pBox.y + 10); ctx.lineTo(pBox.x, pBox.y); ctx.lineTo(pBox.x + 10, pBox.y);
        ctx.moveTo(pBox.x + pBox.w - 10, pBox.y); ctx.lineTo(pBox.x + pBox.w, pBox.y); ctx.lineTo(pBox.x + pBox.w, pBox.y + 10);
        ctx.stroke();

        // Box 2: Sample Cryo-Vial
        const vBox = { x: s.vial.x - 22, y: s.vial.y - 42, w: 44, h: 75 };
        const vialColor = isDeviationActive ? '#f43f5e' : '#10b981';
        ctx.strokeStyle = vialColor;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(vBox.x, vBox.y, vBox.w, vBox.h);

        ctx.fillStyle = isDeviationActive ? 'rgba(244, 63, 94, 0.9)' : 'rgba(16, 185, 129, 0.9)';
        ctx.fillRect(vBox.x, vBox.y - 18, 130, 18);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(isDeviationActive ? 'VIAL_A3: DEVIATION' : 'SAMPLE_VIAL_A3: 96.1%', vBox.x + 4, vBox.y - 5);

        // Box 3: Hand Pose Interaction Zone
        const hBox = { x: hx - 45, y: hy - 65, w: 90, h: 120 };
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(hBox.x, hBox.y, hBox.w, hBox.h);
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.85)';
        ctx.fillRect(hBox.x, hBox.y - 18, 120, 18);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('ASTRONAUT_HAND: 99.2%', hBox.x + 4, hBox.y - 5);
      }

      // Draw Center Crosshair & Optical Scale
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 20, height / 2);
      ctx.lineTo(width / 2 + 20, height / 2);
      ctx.moveTo(width / 2, height / 2 - 20);
      ctx.lineTo(width / 2, height / 2 + 20);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [showBoundingBoxes, showSkeleton, isDeviationActive, activeCam]);

  // Keep FPS dynamically fluctuating for realism
  useEffect(() => {
    const fpsInterval = setInterval(() => {
      setFpsCounter(+(41.5 + Math.random() * 2.2).toFixed(1));
    }, 1000);
    return () => clearInterval(fpsInterval);
  }, []);

  return (
    <div className="hud-panel rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col relative">
      {/* Top Video Header & Stream Info */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span className="font-bold text-[11px] tracking-wider">LIVE FEED</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-medium">
            {activeCam === 'cam1' ? 'PAYLOAD GLOVEBOX CAM 01 (MAIN)' : activeCam === 'cam2' ? 'OVERHEAD OVERVIEW CAM 02' : 'GLOVEBOX MACRO CAM 03'}
          </span>
          <span className="text-slate-500 text-[10px] hidden sm:inline">1920x1080 @ 60 FPS RAW</span>
        </div>

        {/* Real-time stats */}
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-slate-400 font-mono">
            INFERENCE: <strong className="text-emerald-400">{fpsCounter} FPS</strong>
          </span>
          <span className="text-slate-400 font-mono">
            TENSORRT: <strong className="text-blue-400">FP16 CUDA</strong>
          </span>
        </div>
      </div>

      {/* Main Video/Canvas Frame */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          className="w-full h-full object-contain"
        />

        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 crt-scanline pointer-events-none opacity-40"></div>

        {/* Top-Right HUD Badge */}
        <div className="absolute top-3 right-3 flex flex-col items-end space-y-1.5 pointer-events-none">
          <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-blue-500/40 text-[10px] font-mono text-blue-300 backdrop-blur-md">
            ● ZERO-G 6-DOF TRACKER ACTIVE
          </div>
          {isDeviationActive && (
            <div className="px-3 py-1 rounded bg-rose-950/90 border border-rose-500 text-[11px] font-mono font-bold text-rose-300 animate-pulse flex items-center space-x-1.5 shadow-lg shadow-rose-950">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>1D-TCN STEP DEVIATION DETECTED</span>
            </div>
          )}
        </div>

        {/* Bottom Left Camera Stream Controls */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 bg-slate-950/85 backdrop-blur-md p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
          <button
            onClick={() => {
              playSound('click');
              setActiveCam('cam1');
            }}
            className={`px-2 py-1 rounded ${activeCam === 'cam1' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Payload Cam 01
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveCam('cam2');
            }}
            className={`px-2 py-1 rounded ${activeCam === 'cam2' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Overhead Cam 02
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveCam('cam3');
            }}
            className={`px-2 py-1 rounded ${activeCam === 'cam3' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Macro Cam 03
          </button>
        </div>

        {/* Bottom Right HUD Overlays Toggles */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md p-1.5 rounded-lg border border-slate-800 text-[11px] font-mono">
          <button
            onClick={() => {
              playSound('tab');
              setShowBoundingBoxes(!showBoundingBoxes);
            }}
            className={`px-2 py-1 rounded border ${
              showBoundingBoxes
                ? 'bg-blue-600/30 border-blue-500 text-blue-300'
                : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}
          >
            Bounding Boxes
          </button>
          <button
            onClick={() => {
              playSound('tab');
              setShowSkeleton(!showSkeleton);
            }}
            className={`px-2 py-1 rounded border ${
              showSkeleton
                ? 'bg-cyan-600/30 border-cyan-500 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}
          >
            Pose Skeleton
          </button>
        </div>
      </div>

      {/* Stream Status Bar */}
      <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-slate-500">BACKBONE:</span>
          <span className="text-slate-200">Video Swin-T (3D Shift Window)</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">HO-RCNN:</span>
          <span className="text-emerald-400">Hand-Object Contact Validated</span>
        </div>
        <div className="text-[11px] text-blue-400">
          Zero-Cloud Telemetry: 100% On-Device
        </div>
      </div>
    </div>
  );
};
