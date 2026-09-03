import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Globe } from './ui/Globe';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/xldonobr';
const STATUS_TIMEOUT = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout>>();

  const clearStatusTimer = () => { if (statusTimer.current) clearTimeout(statusTimer.current); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearStatusTimer();
    const trimmed = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      message: formState.message.trim(),
    };
    if (!trimmed.name || trimmed.name.length < 2) { setValidationError('Name must be at least 2 characters'); return; }
    if (!trimmed.email || !EMAIL_RE.test(trimmed.email)) { setValidationError('Please enter a valid email address'); return; }
    if (!trimmed.message || trimmed.message.length < 10) { setValidationError('Message must be at least 10 characters'); return; }
    setValidationError(null);
    setStatus('sending');
    if (honeypot) {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      statusTimer.current = setTimeout(() => setStatus(null), STATUS_TIMEOUT);
      return;
    }
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmed),
      });
      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else { throw new Error(); }
    } catch { setStatus('error'); }
    statusTimer.current = setTimeout(() => setStatus(null), STATUS_TIMEOUT);
  };

  const socials = [
    { icon: <Mail size={15} />, label: portfolioData.socials.email, href: `mailto:${portfolioData.socials.email}` },
    { icon: <Github size={15} />, label: 'github.com/xmananrastogi', href: portfolioData.socials.github },
    { icon: <Linkedin size={15} />, label: 'linkedin.com/in/manan-rastogi', href: portfolioData.socials.linkedin },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32" aria-label="Contact">
      <div className="absolute top-0 right-[-20%] w-[60%] opacity-30 md:opacity-50 blur-3xl pointer-events-none z-0">
        <Globe />
      </div>
      
      <div ref={ref} className="mx-auto max-w-6xl relative z-10">
        <div className="section-label">Get in touch</div>

        <div className="grid gap-6 lg:grid-cols-[0.55fr_1fr]">
          {/* Left: social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <p className="mb-5 text-sm leading-6 text-text-secondary max-w-xs">
              Open to internships, collaborations, and interesting engineering problems.
            </p>
            {socials.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-surface px-4 py-3.5 text-sm text-text-secondary transition-all hover:border-accent/30 hover:text-text-primary hover:bg-accent/5"
              >
                <span className="text-accent">{item.icon}</span>
                <span className="truncate font-mono text-xs">{item.label}</span>
              </a>
            ))}
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="card rounded-xl p-6 md:p-8"
            aria-label="Contact form"
          >
            <div className="grid gap-4">
              {/* Honeypot */}
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <label>
                  <span>Leave this empty</span>
                  <input type="text" name="_gotcha" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">Name</span>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => { setValidationError(null); setFormState({ ...formState, name: e.target.value }); }}
                  required minLength={2} maxLength={100}
                  placeholder="Your name"
                  autoComplete="name"
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:border-accent/40 focus:bg-accent/5"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">Email</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => { setValidationError(null); setFormState({ ...formState, email: e.target.value }); }}
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:border-accent/40 focus:bg-accent/5"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">Message</span>
                <textarea
                  rows={5}
                  value={formState.message}
                  onChange={(e) => { setValidationError(null); setFormState({ ...formState, message: e.target.value }); }}
                  required minLength={10} maxLength={5000}
                  placeholder="Tell me about the role, project, or problem."
                  className="resize-none rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:border-accent/40 focus:bg-accent/5"
                />
              </label>

              {validationError && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
                  {validationError}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
                <Send size={14} />
              </button>

              <div
                role="status"
                aria-live="polite"
                className={`text-center text-sm font-medium transition-opacity ${status ? 'opacity-100' : 'opacity-0'} ${status === 'error' ? 'text-red-400' : 'text-accent'}`}
              >
                {status === 'sending' ? 'Sending…' : status === 'success' ? '✓ Sent successfully' : status === 'error' ? 'Failed — please try again' : ''}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;