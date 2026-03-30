import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileCode, Hash, Settings, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#hero');

  const navItems = [
    { id: '#about', label: 'about.js', icon: <FileCode size={14} />, color: 'text-blue-400' },
    { id: '#projects', label: 'projects.py', icon: <Hash size={14} />, color: 'text-emerald-400' },
    { id: '#skills', label: 'skills.cpp', icon: <Settings size={14} />, color: 'text-purple-400' },
    { id: '#contact', label: 'contact.md', icon: <Mail size={14} />, color: 'text-orange-400' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentIdx = 0;
      sections.forEach((section, idx) => {
        const top = section.getBoundingClientRect().top;
        if (top <= 100) {
          currentIdx = idx;
        }
      });
      setActiveHash(`#${sections[currentIdx]?.id || 'hero'}`);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-32px)] max-w-[680px]">
        <div className="bg-glass-bg/90 backdrop-blur-md border border-glass-border rounded-full p-1.5 shadow-2xl flex items-center justify-between">
          <div className="flex md:hidden px-4 text-xs font-mono text-accent-primary">IDE_v1.0</div>
          
          <ul className="hidden md:flex items-center gap-1 w-full justify-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.id}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-200
                    ${activeHash === item.id 
                      ? 'bg-white/10 text-white border border-white/5 shadow-inner' 
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'}
                  `}
                >
                  <span className={activeHash === item.id ? item.color : ''}>{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 p-6 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.id}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-xl font-mono text-white/60 hover:text-accent-primary"
              >
                <span className={item.color}>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
