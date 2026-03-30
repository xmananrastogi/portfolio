import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { portfolioData } from '../data/portfolioData';
import MotifScene from './MotifScene';
import { Terminal, Download, Github, Linkedin, Mail } from 'lucide-react';

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
          className="glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 text-center text-[10px] font-mono text-white/40 uppercase tracking-widest">
              manan@portfolio: ~ (zsh)
            </div>
            <Terminal size={14} className="text-white/20" />
          </div>

          <div className="p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed text-left">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-emerald-400">user@portfolio:~$</span>
              <span className="text-blue-400">whoami</span>
            </div>
            
            <div className="mb-6">
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
                <span className="text-purple-400">const</span> <span className="text-orange-400">developer</span> = <span className="text-blue-400">"{portfolioData.name}"</span>
                <span className="animate-pulse inline-block w-2 md:w-3 h-6 md:h-8 bg-accent-primary ml-2 translate-y-1" />
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-emerald-400">user@portfolio:~$</span>
              <span className="text-blue-400">cat role.txt</span>
            </div>

            <div className="text-white/60 mb-8 min-h-[1.5em] flex items-center gap-2">
              <span className="text-white/40">//</span>
              <span className="text-accent-primary">{typingText}</span>
              <span className="w-px h-5 bg-accent-primary animate-[cursorBlink_1s_infinite]" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-emerald-400">user@portfolio:~$</span>
              <span className="animate-pulse w-2 h-5 bg-white/20" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start"
        >
          <a href="#projects" className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-white/5 flex items-center gap-2">
            git clone projects
          </a>
          <a href={portfolioData.socials.github} target="_blank" className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
            <Github size={18} />
            GitHub
          </a>
          <a href={portfolioData.socials.linkedin} target="_blank" className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-blue-500/20 hover:border-blue-500/40 transition-colors flex items-center gap-2">
            <Linkedin size={18} />
            LinkedIn
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-30">
        <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-1 bg-white rounded-full animate-[scroll-wheel_1.5s_infinite]" />
        </div>
      </div>
    </section>
  );
};

export default TerminalHero;
