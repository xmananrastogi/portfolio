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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
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
                initial={{ x: lineIndex % 2 === 0 ? '8%' : '-8%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: lineIndex * 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex flex-wrap gap-3 ${
                  lineIndex === 1 ? 'justify-end' : 'justify-start'
                }`}
              >
                {line.map((word, wordIndex) => (
                  <span
                    key={`${lineIndex}-${word}`}
                    className={`intro-pill ${
                      lineIndex === 2 && wordIndex === line.length - 1 ? 'intro-pill-accent' : ''
                    }`}
                  >
                    {word}
                  </span>
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
