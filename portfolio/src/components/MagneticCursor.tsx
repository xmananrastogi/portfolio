import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagneticCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
    };

    window.addEventListener('mousemove', moveMouse);
    return () => window.removeEventListener('mousemove', moveMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-secondary opacity-50 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? 'rgba(0, 184, 255, 0.1)' : 'transparent',
      }}
    />
  );
};

export default MagneticCursor;
