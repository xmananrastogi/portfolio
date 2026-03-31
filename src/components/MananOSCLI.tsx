import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, X, Minimize2, Maximize2, Trash2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const MananOSCLI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    "MananOS [Version 2.4.0]",
    "(c) 2026 M.RASTOGI Engineering Labs. All rights reserved.",
    "",
    "Type 'help' to see available commands."
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const [mainCmd, ...args] = cmd.toLowerCase().trim().split(' ');
    let response = [`> ${cmd}`];

    switch (mainCmd) {
      case 'help':
        response.push(
          "Available Commands:",
          "  - goto <id>   Teleport to section (about, projects, skills, contact)",
          "  - status      Run system diagnostic suite",
          "  - about       Explore identity and education",
          "  - skills      List core technical proficiencies",
          "  - projects    View featured engineering work",
          "  - resume      Open the digital lab report",
          "  - clear       Wipe logic buffer",
          "  - whoami      Identity verification"
        );
        break;
      case 'goto':
        const target = args[0];
        const element = document.getElementById(target);
        if (element && (window as any).lenis) {
          (window as any).lenis.scrollTo(element);
          response.push(`Navigating to [${target}]...`);
        } else {
          response.push(`Target [${target}] NOT FOUND in local buffer.`);
        }
        break;
      case 'status':
        const perf = performance as any;
        response.push(
          "INITIALIZING DIAGNOSTIC SUITE...",
          `[OK] Kernel: MananOS v2.4.0`,
          `[OK] Memory: ${Math.round(perf.memory?.usedJSHeapSize / 1024 / 1024) || '—'} MB / ${Math.round(perf.memory?.jsHeapSizeLimit / 1024 / 1024) || '—'} MB`,
          `[OK] Latency: ${Math.round(performance.now())}ms since boot`,
          `[OK] Connection: Authorized / TLS 1.3`,
          `[OK] UI Engine: Pro-Max Grid System 1.0`
        );
        break;
      case 'about':
        response.push(
          `Candidate: ${portfolioData.name}`,
          `Role: ${portfolioData.about.role}`,
          `Education: ${portfolioData.about.education}`,
          `Passion: ${portfolioData.about.passion}`
        );
        break;
      case 'skills':
        response.push(`Technical Matrix: ${portfolioData.about.skills.join(', ')}`);
        break;
      case 'projects':
        response.push("System Deployments:", ...portfolioData.projects.map(p => ` - ${p.id} (${p.techStack[0]})`));
        break;
      case 'resume':
        response.push("Redirecting to [resume.pdf] in new buffer...");
        window.open(portfolioData.resumeLink, '_blank');
        break;
      case 'whoami':
        response.push("Guest: Authorized. Role: Potential Collaborator.");
        break;
      case 'clear':
        setHistory(["Buffer wiped.", "Type 'help' for guidance."]);
        return;
      case '':
        return;
      default:
        response.push(`'${mainCmd}': Command unknown. Initializing diagnostic...`);
    }

    setHistory(prev => [...prev, ...response]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[350px] md:w-[450px] h-[300px] md:h-[400px] bg-black/90 backdrop-blur-2xl border border-accent-primary/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* CLI Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-accent-primary/10 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-accent-primary" />
                <span className="text-[10px] font-mono font-black text-accent-primary tracking-widest uppercase">MananOS v2.4.0</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setHistory(["Buffer wiped.", "Type 'help' for guidance."])} className="text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
                <div className="w-px h-3 bg-white/10" />
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white/30 hover:text-white transition-colors"
                  aria-label="Close terminal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* CLI Body */}
            <div 
                ref={scrollRef}
                className="flex-1 p-4 font-mono text-[11px] md:text-xs text-emerald-400 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-white/10"
            >
              <div className="absolute inset-0 pointer-events-none bg-scanline opacity-[0.02]" />
              {history.map((line, i) => (
                <div key={i} className={`${line.startsWith('>') ? 'text-white/60 font-bold' : 'text-emerald-400/90'}`}>
                  {line}
                </div>
              ))}
            </div>

            {/* CLI Input */}
            <div className="p-3 border-t border-white/5 flex items-center gap-3">
              <span className="text-accent-primary font-bold">{'>'}</span>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
                placeholder="system command..."
                className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-white/80 placeholder:text-white/10"
                autoFocus
              />
              <button 
                onClick={() => handleCommand(input)}
                className="p-1.5 bg-accent-primary text-black rounded-lg hover:scale-110 active:scale-95 transition-all"
              >
                <Send size={12} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-accent-primary text-black rounded-2xl shadow-[0_0_30px_rgba(0,255,148,0.4)] border border-white/20 flex items-center justify-center group relative overflow-hidden"
            aria-label="Open MananOS Terminal"
          >
            <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            <Terminal size={24} className="relative z-10" />
            
            {/* Notification Badge */}
            <div className="absolute top-1 right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-black animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MananOSCLI;
