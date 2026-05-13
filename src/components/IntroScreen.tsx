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
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[140] flex cursor-pointer items-center justify-center overflow-hidden bg-background"
          onClick={dismiss}
          role="dialog"
          aria-label="Loading animation — click or press any key to skip"
          style={{ perspective: '1200px' }}
        >
          {/* Animated Glow Orbs */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[40vh] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-cyan/20 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[50vh] w-[30vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-research-amber/10 blur-[120px]"
            animate={{ scale: [1, 1.4, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute inset-0 intro-grid"
            aria-hidden="true"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="relative z-10 flex w-full max-w-6xl flex-col gap-3 px-4 md:gap-5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {introLines.map((line, lineIndex) => (
              <motion.div
                key={line.join('-')}
                initial={{
                  opacity: 0,
                  z: -300,
                  rotateX: lineIndex === 0 ? 30 : lineIndex === 2 ? -30 : 0,
                  y: lineIndex === 0 ? -60 : lineIndex === 2 ? 60 : 0,
                }}
                animate={{
                  opacity: 1,
                  z: 0,
                  rotateX: 0,
                  y: 0,
                }}
                transition={{
                  delay: lineIndex * 0.15,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex flex-wrap gap-3 ${
                  lineIndex === 1 ? 'justify-end' : 'justify-start'
                }`}
              >
                {line.map((word, wordIndex) => (
                  <motion.span
                    key={`${lineIndex}-${word}`}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: wordIndex * 0.1 + lineIndex * 0.2,
                    }}
                    className={`intro-pill shadow-xl backdrop-blur-xl ${
                      lineIndex === 2 && wordIndex === line.length - 1
                        ? 'intro-pill-accent shadow-signal-cyan/20'
                        : 'shadow-black/20'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </div>

          <p className="absolute bottom-8 text-xs text-muted" aria-hidden="true">
            Click or press any key to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
