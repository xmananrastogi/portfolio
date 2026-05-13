import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

const introLines = [
  ['AI', 'PRODUCT', 'ENGINEER'],
  ['PREMIUM', 'WEB', 'SYSTEMS'],
  ['INTERFACES', 'THAT', 'FEEL', 'HIRED'],
];

const IntroScreen = () => {
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    const timer = window.setTimeout(dismiss, 1800);
    return () => window.clearTimeout(timer);
  }, [dismiss]);

  // Allow click/key to skip
  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') dismiss();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[140] flex cursor-pointer items-center justify-center overflow-hidden bg-background"
          onClick={dismiss}
          role="dialog"
          aria-label="Loading animation — click or press any key to skip"
        >
          {/* Subtle Ambient Glow */}
          <motion.div 
            className="absolute left-1/2 top-1/2 h-[40vh] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-cyan/5 blur-[100px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="absolute inset-0 intro-grid" aria-hidden="true" />
          
          <div 
            className="relative z-10 flex w-full max-w-6xl flex-col gap-3 px-4 md:gap-5"
            style={{ perspective: '1000px' }}
          >
            {introLines.map((line, lineIndex) => (
              <motion.div
                key={line.join('-')}
                initial={{ opacity: 0, z: -100, rotateX: 20, y: 30, filter: 'blur(12px)' }}
                animate={{ opacity: 1, z: 0, rotateX: 0, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: lineIndex * 0.15,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-wrap gap-3 ${
                  lineIndex === 1 ? 'justify-end' : 'justify-start'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {line.map((word, wordIndex) => (
                  <motion.span
                    key={`${lineIndex}-${word}`}
                    animate={{ z: [0, 8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: wordIndex * 0.1,
                    }}
                    className={`intro-pill shadow-xl backdrop-blur-md border-white/[0.08] bg-white/[0.02] ${
                      lineIndex === 2 && wordIndex === line.length - 1
                        ? 'intro-pill-accent border-signal-cyan/20 text-signal-cyan shadow-[0_0_30px_rgba(56,189,248,0.15)] bg-signal-cyan/10'
                        : 'shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </div>

          <p className="absolute bottom-8 font-mono text-[10px] tracking-widest text-muted uppercase" aria-hidden="true">
            Click or press any key to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
