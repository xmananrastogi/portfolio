import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send, Terminal as TerminalIcon } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('https://formspree.io/f/xldonobr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
    }
    
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">Let's connect.</h2>
              <p className="text-white/40 max-w-md">I'm always open to new opportunities, collaborations, and discussions about the future of engineering.</p>
            </div>

            <div className="space-y-4">
               {[
                 { icon: <Mail size={20} />, label: portfolioData.socials.email, href: `mailto:${portfolioData.socials.email}` },
                 { icon: <Github size={20} />, label: "github.com/xmananrastogi", href: portfolioData.socials.github },
                 { icon: <Linkedin size={20} />, label: "linkedin.com/in/manan-rastogi", href: portfolioData.socials.linkedin }
               ].map((item, i) => (
                 <a 
                   key={i} 
                   href={item.href} 
                   target="_blank" 
                   className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:translate-x-2 transition-transform border-emerald-500/10 group"
                 >
                   <div className="text-accent-primary group-hover:scale-110 transition-transform">{item.icon}</div>
                   <span className="text-sm font-mono text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                 </a>
               ))}
            </div>

            <div className="p-6 glass-panel rounded-2xl border-white/5 opacity-50 select-none hidden lg:block">
               <div className="flex items-center gap-3 mb-4 text-white/30">
                  <TerminalIcon size={16} />
                  <span className="text-xs font-mono uppercase tracking-widest">Diagnostic info</span>
               </div>
               <div className="space-y-2 font-mono text-[10px] text-white/20 uppercase tracking-widest">
                  <div>Status: Online</div>
                  <div>Response time: &lt; 24h</div>
                  <div>Availability: Open for collab</div>
               </div>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass-panel p-8 rounded-3xl border-accent-secondary/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6 font-mono">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="text-xs">$</span>
                  <label className="text-xs uppercase tracking-widest font-bold">--name</label>
                </div>
                <input 
                  type="text" 
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  required
                  placeholder="your_name" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-accent-secondary focus:bg-white/10 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="text-xs">$</span>
                  <label className="text-xs uppercase tracking-widest font-bold">--email</label>
                </div>
                <input 
                  type="email" 
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  required
                  placeholder="your@email.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-accent-secondary focus:bg-white/10 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="text-xs">$</span>
                  <label className="text-xs uppercase tracking-widest font-bold">--message</label>
                </div>
                <textarea 
                  rows={5} 
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  required
                  placeholder="your_message_here..." 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-accent-secondary focus:bg-white/10 outline-none transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full py-4 bg-accent-secondary text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error. Try Again' : './send-message.sh'}
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
