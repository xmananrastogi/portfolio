import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Brain, Rocket, MapPin, GraduationCap, Zap, Activity } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import OscilloscopeWidget from './OscilloscopeWidget';

const AboutSection = () => {
  const { about } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="py-32 px-4 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {/* Main Identity Card */}
          <motion.div variants={cardVariants} className="md:col-span-3">
            <TiltCard className="h-full">
              <div className="glass-panel p-10 rounded-3xl flex flex-col md:flex-row gap-10 items-center border-accent-primary/20 bg-accent-primary/[0.02]">
                <div className="relative w-48 h-48 shrink-0">
                  <div className="absolute inset-0 bg-accent-primary blur-[60px] opacity-20 animate-pulse" />
                  <img 
                    src="/assets/images/profile.jpeg" 
                    alt="Profile" 
                    className="relative w-full h-full object-cover rounded-2xl border-2 border-white/10 shadow-2xl"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black tracking-tight text-white/95">
                      {portfolioData.name.split(' ')[0]} <span className="text-accent-primary">{portfolioData.name.split(' ')[1]}</span>
                    </h2>
                    <div className="flex items-center gap-3 text-white/40 font-mono text-sm">
                       <GraduationCap size={16} className="text-accent-secondary" />
                       {about.role}
                    </div>
                  </div>
                  
                  <p className="text-lg text-white/60 leading-relaxed font-medium">
                    {about.passion}. Scaling digital intelligence into hardware at <span className="text-accent-primary font-bold">VIT Vellore</span>.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 pt-4">
                    {about.expertise.map(skill => (
                      <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest hover:text-accent-primary hover:border-accent-primary/30 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Location & Contact Card */}
          <motion.div variants={cardVariants} className="md:col-span-1">
            <TiltCard className="h-full">
               <div className="glass-panel p-8 rounded-3xl border-white/5 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                          <MapPin size={20} />
                       </div>
                       <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-white/20">Base Operations</p>
                          <p className="text-sm font-bold text-white/80">{about.location}</p>
                       </div>
                    </div>
                  </div>

                  <div className="pt-8 space-y-4">
                    {about.currentlyLearning.map(item => (
                      <div key={item} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <Zap size={14} className="text-accent-secondary" />
                        <span className="text-[10px] font-mono text-white/50 uppercase font-black">{item}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </TiltCard>
          </motion.div>

          {/* Stats & Laboratory Widget */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <TiltCard className="h-full">
              <div className="glass-panel p-8 rounded-3xl border-accent-primary/10 h-full flex flex-col bg-accent-primary/[0.01]">
                 <OscilloscopeWidget />
              </div>
            </TiltCard>
          </motion.div>

          {/* Stats & Domain Grid */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <TiltCard className="h-full">
              <div className="glass-panel p-10 rounded-3xl border-white/5 grid grid-cols-3 gap-8 h-full items-center">
                {about.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-5xl font-black font-mono text-accent-secondary tracking-tighter">{stat.value}</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 mt-4 text-center">{stat.label}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={cardVariants} className="md:col-span-4">
            <TiltCard className="h-full">
              <div className="glass-panel p-10 rounded-3xl border-emerald-500/10 h-full relative overflow-hidden group">
                 <div className="flex items-center gap-4 mb-6">
                    <Brain className="text-emerald-400 group-hover:scale-125 transition-transform" size={24} />
                    <h3 className="text-sm font-mono font-black uppercase tracking-[0.4em] text-white/40">Architectural Goal</h3>
                 </div>
                 <p className="text-lg text-white/70 leading-relaxed font-medium">
                   Developing the next generation of <span className="text-emerald-400 underline decoration-emerald-400/30 underline-offset-8">integrated hardware-AI</span> for complex temporal solvers and digital biosystems.
                 </p>
                 <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-400/10 blur-[80px] group-hover:blur-[100px] transition-all" />
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
