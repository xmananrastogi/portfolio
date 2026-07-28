import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/xldonobr';
const STATUS_TIMEOUT = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout>>();

  const clearStatusTimer = () => { if (statusTimer.current) clearTimeout(statusTimer.current); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearStatusTimer();
    const trimmed = { name: formState.name.trim(), email: formState.email.trim(), message: formState.message.trim() };
    if (!trimmed.name || trimmed.name.length < 2) { setValidationError('Name must be at least 2 characters'); return; }
    if (!trimmed.email || !EMAIL_RE.test(trimmed.email)) { setValidationError('Please enter a valid email address'); return; }
    if (!trimmed.message || trimmed.message.length < 10) { setValidationError('Message must be at least 10 characters'); return; }
    setValidationError(null);
    setStatus('sending');
    if (honeypot) { setStatus('success'); setFormState({ name: '', email: '', message: '' }); statusTimer.current = setTimeout(() => setStatus(null), STATUS_TIMEOUT); return; }
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(trimmed) });
      if (response.ok) { setStatus('success'); setFormState({ name: '', email: '', message: '' }); } else { throw new Error(); }
    } catch { setStatus('error'); }
    statusTimer.current = setTimeout(() => setStatus(null), STATUS_TIMEOUT);
  };

  return (
    <section id="contact" className="px-6 py-24 md:py-32" aria-label="Contact">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-14 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
          Get in touch
        </h2>

        <div className="grid gap-6 lg:grid-cols-[0.6fr_1fr]">
          <div className="space-y-3">
            {[
              { icon: <Mail size={17} />, label: portfolioData.socials.email, href: `mailto:${portfolioData.socials.email}` },
              { icon: <Github size={17} />, label: 'github.com/xmananrastogi', href: portfolioData.socials.github },
              { icon: <Linkedin size={17} />, label: 'linkedin.com/in/manan-rastogi', href: portfolioData.socials.linkedin },
            ].map((item) => (
              <a key={item.href} href={item.href} target={item.href.startsWith('mailto:') ? undefined : '_blank'} rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-surface px-4 py-3.5 text-sm text-text-secondary transition-all hover:border-white/[0.14] hover:text-text-primary">
                <span className="text-accent">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.07] bg-surface p-6 md:p-7" aria-label="Contact form">
            <div className="grid gap-4">
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <label><span>Leave this empty</span><input type="text" name="_gotcha" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
              </div>
              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">Name</span>
                <input type="text" value={formState.name} onChange={(e) => { setValidationError(null); setFormState({ ...formState, name: e.target.value }); }} required minLength={2} maxLength={100} placeholder="Your name" autoComplete="name" className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:border-accent/30 focus:bg-white/[0.04]" />
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">Email</span>
                <input type="email" value={formState.email} onChange={(e) => { setValidationError(null); setFormState({ ...formState, email: e.target.value }); }} required placeholder="you@example.com" autoComplete="email" className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:border-accent/30 focus:bg-white/[0.04]" />
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">Message</span>
                <textarea rows={5} value={formState.message} onChange={(e) => { setValidationError(null); setFormState({ ...formState, message: e.target.value }); }} required minLength={10} maxLength={5000} placeholder="Tell me about the role, project, or problem." className="resize-none rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:border-accent/30 focus:bg-white/[0.04]" />
              </label>
              {validationError && <div className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent" role="alert">{validationError}</div>}
              <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60">
                {status === 'sending' ? 'Sending' : 'Send message'}
                <Send size={15} />
              </button>
              <div role="status" aria-live="polite" className={`text-center text-sm font-medium transition-opacity ${status ? 'opacity-100' : 'opacity-0'} text-accent`}>
                {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent successfully' : status === 'error' ? 'Failed — please try again' : ''}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;