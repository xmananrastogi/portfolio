import React from 'react';
import { Github, ExternalLink, Cpu, Database, Eye, Terminal, X, Zap, Layers, BarChart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = React.useState<any>(null);

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
               className="absolute inset-0 bg-black/90 backdrop-blur-3xl" 
            />
            
            <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-5xl h-[80vh] bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
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

                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-6 bg-accent-primary/5 rounded-2xl border border-accent-primary/10">
                        <div className="flex items-center gap-2 mb-4 text-accent-primary">
                           <Layers size={16} />
                           <span className="text-[10px] font-mono uppercase tracking-widest font-black">Memory Buffer</span>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed font-mono">System optimized for high-throughput temporal data ingestion and visualization metrics.</p>
                     </div>
                     <div className="p-6 bg-accent-secondary/5 rounded-2xl border border-accent-secondary/10">
                        <div className="flex items-center gap-2 mb-4 text-accent-secondary">
                           <BarChart size={16} />
                           <span className="text-[10px] font-mono uppercase tracking-widest font-black">Logic Load</span>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed font-mono">Neural weights successfully cached. Inference latency target sub-200ms achieved.</p>
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
              <h2 className="text-4xl font-bold tracking-tight">System Implementations</h2>
            </div>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full shadow-[0_0_15px_rgba(0,184,255,0.5)]" />
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-widest bg-white/5 px-6 py-3 border border-white/10 rounded-xl backdrop-blur-sm">
            ls -al ~/portfolio/projects
          </div>
        </motion.div>

        <div className="space-y-32">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              onClick={() => setSelectedProject(project)}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center cursor-pointer group`}
            >
              {/* Visual Media Side */}
              <div className="w-full lg:w-3/5">
                <TiltCard className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 group h-full">
                  <div className="relative aspect-video h-full">
                    {project.images.length > 0 ? (
                      <img 
                        src={project.images[0]} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full bg-black flex flex-col p-6 font-mono text-xs overflow-hidden">
                        <div className="flex gap-1.5 mb-4 opacity-50">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <div className="space-y-1.5 text-white/40">
                          <div className="text-accent-primary">import &#123; motion &#125; from 'framer-motion';</div>
                          <div>const Portfolio = () =&gt; &#123;</div>
                          <div className="pl-4">return (</div>
                          <div className="pl-8 text-white/60">&lt;div className="relative overflow-hidden"&gt;</div>
                          <div className="pl-12 text-accent-secondary">&lt;MotifScene /&gt;</div>
                          <div className="pl-12 text-accent-primary">&lt;TerminalHero /&gt;</div>
                          <div className="pl-8 text-white/60">&lt;/div&gt;</div>
                          <div className="pl-4">);</div>
                          <div>&#125;;</div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent-primary/10 to-transparent pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-primary/5 blur-[80px] rounded-full" />
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-mono text-white/80 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-4 left-4 bg-accent-primary/20 backdrop-blur-xl border border-accent-primary/30 px-4 py-2 rounded-lg flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                       <span className="text-[10px] font-mono text-accent-primary font-bold tracking-widest uppercase">Operational</span>
                    </div>
                  </div>
                </TiltCard>
                
                {project.images.length > 1 && (
                  <div className="mt-6 flex gap-4 overflow-hidden">
                    {project.images.slice(1, 4).map((img, i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ y: -5 }}
                          className="flex-1 aspect-video rounded-xl border border-white/10 overflow-hidden shadow-xl"
                        >
                          <img src={img} alt={`${project.title} screenshot ${i}`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description Content Side */}
              <div className="w-full lg:w-2/5 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-black text-white/95 tracking-tighter group-hover:text-accent-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="h-1 w-20 bg-accent-primary/30 rounded-full" />
                </div>

                <div className="space-y-6">
                  {project.description.slice(0, 3).map((desc, i) => (
                    <div key={i} className="flex gap-5 group/item">
                      <div className="mt-2 text-accent-secondary group-hover/item:scale-125 transition-transform">
                        {i % 2 === 0 ? <Cpu size={18} /> : <Database size={18} />}
                      </div>
                      <p className="text-base text-white/60 leading-relaxed group-hover/item:text-white/80 transition-colors">
                        {desc}
                      </p>
                    </div>
                  ))}
                  <button className="text-[10px] font-mono font-bold text-accent-primary/60 uppercase tracking-widest hover:text-accent-primary transition-colors flex items-center gap-2">
                    <Eye size={12} />
                    View Detailed Laboratory Analysis
                  </button>
                </div>

                <div className="pt-8 border-t border-white/10">
                   <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20 mb-6 flex items-center gap-3">
                    <Terminal size={14} /> Systems stack
                   </h4>
                   <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {project.techStack.map(tech => (
                        <div key={tech} className="flex items-center gap-2 group/tech cursor-pointer">
                           <div className="w-1.5 h-1.5 rounded-full bg-accent-secondary group-hover/tech:scale-150 transition-transform shadow-[0_0_8px_rgba(0,184,255,0.5)]" />
                           <span className="text-xs font-mono font-bold text-white/40 group-hover/tech:text-accent-secondary transition-colors uppercase">
                            {tech}
                           </span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
