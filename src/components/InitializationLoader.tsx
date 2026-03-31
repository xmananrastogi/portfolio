import React, { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingProvider';
import { motion, AnimatePresence } from 'framer-motion';
import TextScramble from './TextScramble';

const InitializationLoader = () => {
  const { setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  const bootLogs = [
    "Initializing hardware abstraction layer...",
    "Mounting logic buffers and bitstreams...",
    "कल कल ध्वनि: Welcome [IN-HI]",
    "Calibrating PLL and clock synthesizers...",
    "வணக்கம்: System Access [IN-TA]",
    "Synchronizing parallel data buses...",
    "నమస్కారం: Core Verified [IN-TE]",
    "Loading neural weights... [98%]",
    "ನಮಸ್ಕಾರ: Identity Map [IN-KN]",
    "नमस्कार: Interface Ready [IN-MA]",
    "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ: Secure Session [IN-PA]",
    "നമസ്കാരം: Boot Success [IN-ML]",
    "Verifying FPGA logic gates...",
    "System Core: Online."
  ];

  const mainGreetings = [
    "Welcome", "नमस्ते", "வணக்கம்", "నమస్కారం", "ನಮಸ್ಕಾರ", 
    "नमस्कार", "নমস্কার", "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", "നമസ്കാരം", "નમસ્તે"
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev.slice(-6), bootLogs[currentLog]]);
        setProgress((prev) => Math.min(prev + (100 / bootLogs.length), 100));
        setCurrentGreetingIndex(prev => (prev + 1) % mainGreetings.length);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 1200);
      }
    }, 380);

    return () => clearInterval(interval);
  }, [setIsLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center font-mono p-12 overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,148,0.03)_0%,transparent_70%)]" />
      
      {/* Scanning Line */}
      <motion.div 
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-accent-primary/20 blur-sm pointer-events-none"
      />

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        {/* Multilingual Central Welcome */}
        <div className="h-32 flex items-center justify-center mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGreetingIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.4 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white text-center"
            >
              <TextScramble 
                text={mainGreetings[currentGreetingIndex]} 
                duration={400} 
                className={currentGreetingIndex > 0 ? "font-sans" : "font-mono uppercase"}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Technical Log Console */}
        <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
          <div className="mb-6 space-y-1.5 h-32 overflow-hidden flex flex-col justify-end">
            {logs.map((log, i) => (
              <motion.div
                key={log + i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] text-accent-primary/70 flex items-center gap-3"
              >
                <div className="w-1 h-1 rounded-full bg-accent-primary/30" />
                <span className="opacity-40 font-mono">[{new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}]</span>
                <span className="font-medium tracking-wide">{log}</span>
              </motion.div>
            ))}
          </div>

          <div className="space-y-3">
             <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-primary/50 to-accent-primary shadow-[0_0_10px_rgba(0,255,148,0.3)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
             </div>
             
             <div className="flex justify-between text-[9px] uppercase font-black tracking-[0.3em] text-white/20">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                   <span>System Initialize</span>
                </div>
                <span className="font-mono">{Math.round(progress)}%</span>
             </div>
          </div>
        </div>

        {/* Corner Diagnostic Data */}
        <div className="absolute -bottom-32 left-0 text-[10px] text-white/10 uppercase tracking-widest space-y-1 font-bold">
           <div>Kernel: v2.4.0-stable</div>
           <div>Logic: FPGA_VERIF_PASS</div>
        </div>
        <div className="absolute -bottom-32 right-0 text-[10px] text-white/10 uppercase tracking-widest space-y-1 font-bold text-right">
           <div>Auth: Authorized</div>
           <div>Host: Manan_OS</div>
        </div>
      </div>
    </motion.div>
  );
};

export default InitializationLoader;
