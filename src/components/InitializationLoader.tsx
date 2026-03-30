import React, { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingProvider';
import { motion, AnimatePresence } from 'framer-motion';

const InitializationLoader = () => {
  const { setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootLogs = [
    "Initializing hardware abstraction layer...",
    "Mounting logic buffers and bitstreams...",
    "Calibrating PLL and clock synthesizers...",
    "Synchronizing parallel data buses...",
    "Loading neural weights into cache...",
    "Verifying FPGA logic gates...",
    "System Core: Online."
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        setProgress((prev) => Math.min(prev + (100 / bootLogs.length), 100));
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 800);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [setIsLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center font-mono p-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 space-y-2 h-40 overflow-hidden flex flex-col justify-end">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-accent-primary flex items-center gap-2"
            >
              <span className="text-accent-secondary opacity-50">[{new Date().toLocaleTimeString()}]</span>
              <span>{log}</span>
            </motion.div>
          ))}
        </div>

        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex justify-between text-[10px] uppercase tracking-widest text-white/30">
          <span>Booting v1.0.4</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InitializationLoader;
