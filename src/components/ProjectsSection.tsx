import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Layers, Video } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <span className="text-accent-secondary">01.</span>
              <span>Featured Project</span>
            </h2>
            <div className="w-20 h-1 bg-accent-secondary rounded-full" />
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-widest bg-white/5 px-4 py-2 border border-white/10 rounded-full">
            git branch: main
          </div>
        </motion.div>

        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start p-8 glass-panel border-emerald-500/10 rounded-3xl"
          >
            {/* Left: Metadata & Descriptions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-white/90 tracking-tighter">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-3 py-1 bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {project.description.map((desc, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0 transition-transform group-hover:scale-150" />
                    <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-wrap gap-4 underline-offset-8">
                <a 
                  href={project.links.live} 
                  target="_blank" 
                  className="flex items-center gap-2 text-sm font-semibold text-accent-primary hover:underline"
                >
                  <ExternalLink size={16} />
                  Live Preview
                </a>
                <a 
                  href={project.links.code} 
                  target="_blank" 
                  className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors"
                >
                  <Github size={16} />
                  Source Code
                </a>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-4">
                   {project.techStack.map(tech => (
                     <span key={tech} className="text-xs text-accent-primary font-mono opacity-80">{tech}</span>
                   ))}
                </div>
              </div>
            </div>

            {/* Right: Visualization & Images */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Main image - Dashboard */}
               <div className="md:col-span-2 relative group overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                 <div className="absolute inset-0 bg-accent-secondary/10 group-hover:bg-accent-secondary/0 transition-colors duration-500 z-10" />
                 <img src={project.images[0]} alt="Dashboard" className="w-full h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-700" />
               </div>
               
               {/* Small highlights */}
               <div className="relative group overflow-hidden rounded-xl border border-white/10">
                  <div className="absolute inset-0 bg-accent-primary/10 group-hover:bg-accent-primary/0 transition-colors z-10" />
                  <img src={project.images[1]} alt="Analysis" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </div>
               <div className="relative group overflow-hidden rounded-xl border border-white/10">
                  <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/0 transition-colors z-10" />
                  <img src={project.images[2]} alt="Results" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
