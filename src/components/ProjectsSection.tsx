import React from 'react';
import { Github, ExternalLink, Cpu, Database, Eye, Terminal, X, Zap, Layers, BarChart, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import TextScramble from './TextScramble';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = React.useState<any>(null);

  const bentoGrid = (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[240px]">
      {portfolioData.projects.map((project, index) => {
        const isFirst = index === 0;
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedProject(project)}
            className={`cursor-pointer rounded-3xl overflow-hidden border border-white/10 group bg-neutral-900/40 backdrop-blur-sm relative ${
              isFirst ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-2'
            }`}
          >
            {/* Background Media */}
            <div className="absolute inset-0">
               {project.images.length > 0 ? (
                  <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-60" />
               ) : (
                  <div className="w-full h-full bg-black/40 flex items-center justify-center">
                    <Terminal size={48} className="text-accent-primary/10" />
                  </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content Overlays */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-white/50 uppercase tracking-widest">
                    {tag}
                   </span>
                ))}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-black text-white/95 tracking-tight group-hover:text-accent-primary transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-white/40 line-clamp-2 font-medium max-w-lg">
                  {project.description[0]}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_rgba(0,255,148,0.5)]" />
                    <span className="text-[9px] font-mono font-bold text-accent-primary uppercase tracking-[0.2em]">Operational</span>
                 </div>
                 <ArrowUpRight size={20} className="text-white/20 group-hover:text-accent-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Decorative Diagnostic Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="md:col-span-3 md:row-span-1 glass-panel border-accent-secondary/20 rounded-3xl p-8 flex items-center justify-between bg-accent-secondary/[0.02]"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent-secondary">
             <Cpu size={18} />
             <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">Hardware Load</span>
          </div>
          <p className="text-xs text-white/30 font-mono">Neural weights successfully cached. Inference latency target sub-200ms achieved.</p>
        </div>
        <div className="w-16 h-16 border-4 border-accent-secondary/10 border-t-accent-secondary rounded-full animate-spin" />
      </motion.div>

      {/* Future Deployments Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="md:col-span-3 md:row-span-1 glass-panel border-white/5 rounded-3xl p-8 bg-white/[0.01] flex flex-col justify-center gap-4"
      >
         <div className="flex items-center gap-3">
            <Layers size={18} className="text-white/20" />
            <span className="text-[10px] font-mono font-black text-white/20 uppercase tracking-[0.4em]">Future Deploys</span>
         </div>
         <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.5 }}
                  className="w-full h-full bg-accent-primary/20" 
                />
              </div>
            ))}
         </div>
      </motion.div>
    </div>
  );

  return (
    <section id="projects" className="py-32 px-4 bg-background relative overflow-hidden">
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedProject(null)}
               className="absolute inset-0 bg-black/95 backdrop-blur-3xl" 
            />
            
            <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-5xl max-h-[85vh] bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
               <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-10 p-3 bg-black/50 text-white hover:bg-white hover:text-black rounded-full transition-all"
               >
                 <X size={20} />
               </button>

               {/* Left: Project Imagery */}
               <div className="w-full md:w-1/2 h-64 md:h-full bg-black relative">
                  {selectedProject.images.length > 0 ? (
                    <img 
                      src={selectedProject.images[0]} 
                      className="w-full h-full object-cover opacity-60"
                      alt={selectedProject.title}
                    />
                  ) : (
                    <div className="w-full h-full bg-accent-primary/10 flex items-center justify-center">
                       <Terminal size={64} className="text-accent-primary/20" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                     <h2 className="text-4xl font-black text-white mb-2">{selectedProject.title}</h2>
                     <div className="flex gap-2">
                        {selectedProject.tags.map((tag: string) => (
                           <span key={tag} className="text-[10px] font-mono text-accent-primary uppercase tracking-widest">{tag}</span>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right: Technical Deep Dive */}
               <div className="flex-1 h-full overflow-y-auto p-8 md:p-12 space-y-10 scrollbar-thin scrollbar-thumb-white/10">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-accent-secondary">
                        <Zap size={20} />
                        <h3 className="text-sm font-mono uppercase tracking-[0.4em] font-black">Engineering Architecture</h3>
                     </div>
                     <div className="space-y-3">
                        {selectedProject.description.map((desc: string, i: number) => (
                           <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-colors">
                              <div className="text-white/20 font-mono text-xs pt-1">{String(i + 1).padStart(2, '0')}</div>
                              <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="pt-8 border-t border-white/5 flex gap-4">
                     <a href={selectedProject.links.live} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-accent-primary text-black font-black uppercase tracking-widest text-center rounded-xl hover:scale-[1.02] transition-transform">Live preview</a>
                     <a href={selectedProject.links.code} target="_blank" rel="noopener noreferrer" className="px-6 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-center rounded-xl hover:bg-white/10 transition-all">Source</a>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="text-accent-secondary" size={24} />
              <h2 className="text-4xl font-bold tracking-tight">
                <TextScramble text="System Implementations" />
              </h2>
            </div>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full shadow-[0_0_15px_rgba(0,184,255,0.5)]" />
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-widest bg-white/5 px-6 py-3 border border-white/10 rounded-xl backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">
            ls -al ~/portfolio/projects
          </div>
        </motion.div>

        {bentoGrid}
      </div>
    </section>
  );
};

export default ProjectsSection;
