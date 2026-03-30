import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const OscilloscopeWidget = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(40);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Grid
      ctx.strokeStyle = 'rgba(0, 255, 148, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw Signal
      ctx.strokeStyle = '#00FF94';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00FF94';
      ctx.beginPath();
      
      const centerY = canvas.height / 2;
      
      for (let x = 0; x < canvas.width; x++) {
        // Complex signal: Sine + Random Noise + Pulse (ECG Simulation)
        const pulse = Math.pow(Math.sin((x + offset) * 0.05 * frequency), 10) * amplitude * 1.5;
        const noise = (Math.random() - 0.5) * 2;
        const sine = Math.sin((x + offset) * 0.02 * frequency) * 10;
        
        const y = centerY + pulse + noise + sine;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      offset += 2;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [frequency, amplitude]);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-accent-primary animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40">Real-time Signal Analysis</span>
        </div>
        <div className="flex gap-2">
            <span className="text-[10px] font-mono text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded border border-accent-primary/20">FREQ: {frequency.toFixed(1)}Hz</span>
            <span className="text-[10px] font-mono text-accent-secondary bg-accent-secondary/10 px-2 py-0.5 rounded border border-accent-secondary/20">AMP: {amplitude}mV</span>
        </div>
      </div>
      
      <div className="flex-1 bg-black/60 rounded-xl border border-white/5 relative overflow-hidden group">
         <canvas 
            ref={canvasRef} 
            width={400} 
            height={150} 
            className="w-full h-full opacity-80"
         />
         
         {/* Interaction Overlays */}
         <div className="absolute inset-x-0 bottom-0 p-3 flex justify-around opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
            <button 
                onMouseEnter={() => setFrequency(2.5)} 
                onMouseLeave={() => setFrequency(1)}
                className="text-[10px] font-mono text-white/50 hover:text-accent-primary"
            >
                [ PULSE_UP ]
            </button>
            <button 
                onMouseEnter={() => setAmplitude(60)} 
                onMouseLeave={() => setAmplitude(40)}
                className="text-[10px] font-mono text-white/50 hover:text-accent-secondary"
            >
                [ GAIN_MAX ]
            </button>
         </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
         <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <p className="text-[9px] font-mono text-white/20 uppercase mb-1">Signal SNR</p>
            <p className="text-xs font-bold text-accent-primary tracking-widest">52.4 dB</p>
         </div>
         <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <p className="text-[9px] font-mono text-white/20 uppercase mb-1">Logic Status</p>
            <p className="text-xs font-bold text-accent-secondary tracking-widest uppercase">Stable</p>
         </div>
      </div>
    </div>
  );
};

export default OscilloscopeWidget;
