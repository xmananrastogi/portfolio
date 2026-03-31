import React, { useState, useEffect, useCallback, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  autostart?: boolean;
  duration?: number;
  speed?: number;
  className?: string;
}

const chars = '!<>-_\\/[]{}—=+*^?#________';

const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  autostart = true, 
  duration = 1000, 
  speed = 40,
  className = "" 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number>();
  const iterationRef = useRef<number>(0);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    iterationRef.current = 0;
    
    const startTime = Date.now();
    
    const update = () => {
      const timeElapsed = Date.now() - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < text.length * progress) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setIsScrambling(false);
      }
    };

    frameRef.current = requestAnimationFrame(update);
  }, [text, duration]);

  useEffect(() => {
    if (autostart) {
      scramble();
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [autostart, scramble]);

  return (
    <span 
      className={`inline-block font-mono ${className}`}
      onMouseEnter={() => !isScrambling && scramble()}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;
