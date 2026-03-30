import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { portfolioData } from '../data/portfolioData';
import MotifScene from './MotifScene';
import { Terminal, FileText, Github, Linkedin, ExternalLink } from 'lucide-react';

const TerminalHero = () => {
  const typingText = useTypewriter(portfolioData.roles, 80, 40, 2500);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4">
      <MotifScene />
      
      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            </div>
            <div className="flex-1 text-center text-[10px] font-mono text-white/40 uppercase tracking-widest">
              manan@portfolio: ~ (zsh)
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-accent-primary opacity-50">
               <span className="animate-pulse">●</span> LIVE_SESSION
            </div>
          </div>

          <div className="p-6 md:p-12 font-mono text-sm md:text-base leading-relaxed text-left relative">
            {/* Visual scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-scanline opacity-[0.03]" />
            
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-emerald-400">user@portfolio:~$</span>
              <span className="text-blue-400">whoami</span>
            </div>
            
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90">
                <span className="text-purple-400">const</span> <span className="text-orange-400">engineer</span> = <span className="text-blue-400">"{portfolioData.name}"</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-emerald-400">user@portfolio:~$</span>
              <span className="text-blue-400">cat vision.txt</span>
            </div>

            <div className="text-white/60 mb-10 min-h-[1.5em] flex items-center gap-3 border-l-2 border-accent-primary/20 pl-4 py-2 bg-accent-primary/5 rounded-r-lg">
              <span className="text-accent-primary font-bold">{typingText}</span>
              <span className="w-2 h-6 bg-accent-primary animate-[cursorBlink_1s_infinite] shadow-[0_0_10px_rgba(0,255,148,0.5)]" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-emerald-400">user@portfolio:~$</span>
              <span className="animate-[pulse_1.5s_infinite] w-3 h-6 bg-white/20" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex flex-wrap gap-5 justify-center md:justify-start"
        >
          <a 
            href={portfolioData.resumeLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-accent-primary text-black font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)] flex items-center gap-3 active:scale-95"
          >
            <FileText size={20} className="group-hover:scale-110 transition-transform" />
            cat resume.pdf
          </a>
          
          <div className="flex gap-4">
            <a href={portfolioData.socials.github} target="_blank" className="p-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-accent-secondary transition-all flex items-center justify-center">
              <Github size={22} />
            </a>
            <a href={portfolioData.socials.linkedin} target="_blank" className="p-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-blue-400 transition-all flex items-center justify-center">
              <Linkedin size={22} />
            </a>
          </div>

          <a href="#projects" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white hover:text-black transition-all flex items-center gap-2">
            Explore Systems
            <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-30">
        <div className="w-5 h-9 border-2 border-white/50 rounded-full flex justify-center p-1.5 shadow-inner">
          <div className="w-1 h-2 bg-white rounded-full animate-[scroll-wheel_1.5s_infinite]" />
        </div>
      </div>
    </section>
  );
};

export default TerminalHero;
