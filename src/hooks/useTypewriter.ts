import { useState, useEffect } from 'react';

export const useTypewriter = (texts: string[], typingSpeed = 100, deletingSpeed = 50, delay = 2000) => {
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === currentText.length) {
          setIsDeleting(true);
          setTimeout(() => {}, delay);
        }
      } else {
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    if (isDeleting && charIndex === currentText.length) {
        clearTimeout(timeout);
        setTimeout(() => {
            setIsDeleting(true);
             // restart the cycle internally if needed, but timeout takes care of it
        }, delay);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delay]);

  return text;
};
