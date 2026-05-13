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
          <div className="absolute inset-0 intro-grid" aria-hidden="true" />
          
          <div className="relative z-10 flex w-full max-w-6xl flex-col gap-3 px-4 md:gap-5">
            {introLines.map((line, lineIndex) => (
              <motion.div
                key={line.join('-')}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: lineIndex * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex flex-wrap gap-3 ${
                  lineIndex === 1 ? 'justify-end' : 'justify-start'
                }`}
              >
                {line.map((word, wordIndex) => (
                  <span
                    key={`${lineIndex}-${word}`}
                    className={`intro-pill shadow-xl backdrop-blur-xl border-white/10 bg-white/5 transition duration-500 hover:border-white/20 hover:bg-white/10 ${
                      lineIndex === 2 && wordIndex === line.length - 1
                        ? 'intro-pill-accent !border-signal-cyan/40 text-signal-cyan shadow-signal-cyan/20 !bg-signal-cyan/15'
                        : ''
                    }`}
                  >
                    {word}
                  </span>
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
