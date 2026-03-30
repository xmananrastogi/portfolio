import React from 'react';
import { motion } from 'framer-motion';

const StatusTicker = () => {
  const tickerItems = [
    "ECG Signal Analysis: Optimal",
    "Neural Network Weights: Loaded",
    "System Diagnostics: Passing",
    "Firmware Version: 1.0.4r2",
    "Signal-to-Noise Ratio: 45dB",
    "Impedance Check: 10k Ohms",
    "Real-time Tracking: Active",
    "Biomedical Sync: Established",
    "Vitals Monitor: Online",
    "Algorithm Convergence: True"
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-black/80 backdrop-blur-md border-t border-white/5 z-[80] overflow-hidden flex items-center">
      <motion.div
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12 px-12"
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-white/40 uppercase">
             <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
             <span>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatusTicker;
