import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Code2, Terminal as TerminalIcon, BarChart3, Wrench } from 'lucide-react';

const SkillsSection = () => {
  const icons = [<Code2 size={20} />, <TerminalIcon size={20} />, <BarChart3 size={20} />, <Wrench size={20} />];

  return (
    <section id="skills" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold tracking-tight">Technical stack</h2>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Full System Overview</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.skillsCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl hover:border-accent-secondary/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {React.cloneElement(icons[i % icons.length] as React.ReactElement, { size: 60 })}
              </div>

              <div className="flex items-center gap-3 mb-6">
                 <div className="text-accent-secondary">{icons[i % icons.length]}</div>
                 <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-white/80">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map(item => (
                  <span key={item} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs text-white/60 group-hover:text-white/90 group-hover:bg-white/10 transition-all">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-16 p-8 glass-panel rounded-2xl border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white/90">Interdisciplinary Expertise</h3>
            <p className="text-sm text-white/40 max-w-lg">Certified skills across electronic circuit design, biomedical engineering pipelines, and modern full-stack web development.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
             {portfolioData.about.skills.slice(0, 8).map(skill => (
               <div key={skill} className="px-4 py-2 bg-accent-primary/5 border border-accent-primary/10 rounded-lg text-[10px] font-mono text-accent-primary uppercase tracking-widest">
                 {skill}
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
