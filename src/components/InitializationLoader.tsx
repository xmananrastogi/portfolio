import React, { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingProvider';
import { motion, AnimatePresence } from 'framer-motion';
import TextScramble from './TextScramble';

const InitializationLoader = () => {
  const { setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  const mainGreetings = [
    "नमस्ते", 
    "Welcome",
    "வணக்கம்", 
    "నమస్కారం", 
    "ನಮಸ್ಕಾರ", 
    "नमस्कार", 
    "নমস্কার", 
    "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", 
    "നമസ്കാരം", 
    "નમસ્તે"
  ];

  useEffect(() => {
    // Total duration ~4-5 seconds
    const duration = 4000; 
    const intervalTime = 50;
    const increment = (100 / (duration / intervalTime));

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    const greetingInterval = setInterval(() => {
      setCurrentGreetingIndex(prev => (prev + 1) % mainGreetings.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(greetingInterval);
    };
  }, [setIsLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center font-mono p-12 overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,148,0.03)_0%,transparent_70%)]" />
      
      {/* Subtle Scanning Line */}
      <motion.div 
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-accent-primary/10 blur-[2px] pointer-events-none"
      />

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        {/* Multilingual Central Welcome */}
        <div className="h-40 flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGreetingIndex}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white text-center"
            >
              <TextScramble 
                text={mainGreetings[currentGreetingIndex]} 
                duration={400} 
                className={currentGreetingIndex > 0 ? "font-sans" : "font-mono uppercase"}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Progress Section */}
        <div className="w-full max-w-xs space-y-6">
           {/* Progress Line */}
           <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent-primary shadow-[0_0_15px_rgba(0,255,148,0.5)]"
                style={{ width: `${progress}%` }}
              />
           </div>
           
           {/* Progress Metadata */}
           <div className="flex justify-between items-center text-[10px] font-black tracking-[0.4em] uppercase">
              <div className="flex items-center gap-3 text-accent-primary">
                 <div className="w-1 h-1 rounded-full bg-accent-primary animate-ping" />
                 <span className="opacity-80">Initializing</span>
              </div>
              <span className="text-white/40 font-mono tracking-normal">{Math.round(progress)}%</span>
           </div>
        </div>
      </div>

      {/* Subtle Frame Borders */}
      <div className="absolute inset-8 border border-white/[0.03] pointer-events-none rounded-3xl" />
    </motion.div>
  );
};

export default InitializationLoader;
