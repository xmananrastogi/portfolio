import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, Heart, Cpu, Brain, Rocket } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const AboutSection = () => {
  const { about } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Main Profile Card */}
          <motion.div variants={cardVariants} className="md:col-span-2 glass-panel p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center border-emerald-500/10">
            <div className="relative w-40 h-40 shrink-0">
              <div className="absolute inset-0 bg-accent-primary blur-[40px] opacity-20 animate-pulse" />
              <img 
                src="assets/images/profile.jpeg" 
                alt="Profile" 
                className="relative w-full h-full object-cover rounded-2xl border border-white/10"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-white/90">
                Hi, I'm <span className="text-accent-primary">Manan</span>.
              </h2>
              <p className="text-white/60 leading-relaxed max-w-xl">
                {about.passion}. Currently based in <span className="text-accent-secondary">{about.location}</span>, pursuing <span className="text-purple-400">{about.education}</span>.
              </p>
              <div className="flex flex-wrap gap-3">
                {about.expertise.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/40">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl grid grid-cols-1 gap-6 border-blue-500/10">
            {about.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-4xl font-mono font-bold text-accent-secondary">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/30 mt-2">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Details Grid */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl border-purple-500/10 h-full">
             <div className="flex items-center gap-3 mb-6">
                <Cpu className="text-purple-400" size={20} />
                <h3 className="text-sm font-mono uppercase tracking-widest text-white/60">Core Domain</h3>
             </div>
             <p className="text-white/70 text-sm leading-7">
               Combining my background in <span className="underline decoration-purple-500/50">Electronics & Communication</span> with a deep focus on <span className="underline decoration-accent-primary/50">Biomedical Engineering</span> to create next-gen solutions.
             </p>
          </motion.div>

          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl border-emerald-500/10">
             <div className="flex items-center gap-3 mb-6">
                <Brain className="text-accent-primary" size={20} />
                <h3 className="text-sm font-mono uppercase tracking-widest text-white/60">Learning Path</h3>
             </div>
             <div className="space-y-4">
              {about.currentlyLearning.map(item => (
                <div key={item} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
             </div>
          </motion.div>

          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl border-orange-500/10 overflow-hidden relative group">
             <div className="flex items-center gap-3 mb-4">
                <Rocket className="text-orange-400" size={20} />
                <h3 className="text-sm font-mono uppercase tracking-widest text-white/60">Future Goal</h3>
             </div>
             <p className="text-white/70 text-sm leading-relaxed mb-4">
               Pushing the boundaries of biomedical device integration and full-stack healthcare platforms.
             </p>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-400/10 blur-[50px] group-hover:blur-[70px] transition-all" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
