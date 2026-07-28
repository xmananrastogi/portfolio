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

  const clearStatusTimer = () => {
    if (statusTimer.current) clearTimeout(statusTimer.current);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearStatusTimer();

    const trimmed = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      message: formState.message.trim(),
    };

    if (!trimmed.name || trimmed.name.length < 2) {
      setValidationError('Name must be at least 2 characters');
      return;
    }
    if (!trimmed.email || !EMAIL_RE.test(trimmed.email)) {
      setValidationError('Please enter a valid email address');
      return;
    }
    if (!trimmed.message || trimmed.message.length < 10) {
      setValidationError('Message must be at least 10 characters');
      return;
    }

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
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
    }

    statusTimer.current = setTimeout(() => setStatus(null), STATUS_TIMEOUT);
  };

  const statusMessage =
    status === 'sending'
      ? 'Sending…'
      : status === 'success'
        ? 'Sent successfully'
        : status === 'error'
          ? 'Failed — please try again'
          : '';

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-16 md:py-24" aria-label="Contact">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-signal-cyan">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
            Open to internships, collaborations, and engineering conversations.
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            {[
              { icon: <Mail size={17} aria-hidden="true" />, label: portfolioData.socials.email, href: `mailto:${portfolioData.socials.email}` },
              { icon: <Github size={17} aria-hidden="true" />, label: 'github.com/xmananrastogi', href: portfolioData.socials.github },
              { icon: <Linkedin size={17} aria-hidden="true" />, label: 'linkedin.com/in/manan-rastogi', href: portfolioData.socials.linkedin },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-text-secondary transition hover:bg-white/[0.06] hover:text-text-primary"
              >
                <span className="text-signal-cyan">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl bg-white/[0.03] p-5 md:p-6" aria-label="Contact form">
            <div className="grid gap-4">
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <label>
                  <span>Leave this empty</span>
                  <input type="text" name="_gotcha" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-text-primary">Name</span>
                <input
                  type="text" value={formState.name}
                  onChange={(e) => { setValidationError(null); setFormState({ ...formState, name: e.target.value }); }}
                  required minLength={2} maxLength={100} placeholder="Your name" autoComplete="name"
                  className="rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:bg-white/[0.06]"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-text-primary">Email</span>
                <input
                  type="email" value={formState.email}
                  onChange={(e) => { setValidationError(null); setFormState({ ...formState, email: e.target.value }); }}
                  required placeholder="you@example.com" autoComplete="email"
                  className="rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:bg-white/[0.06]"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-text-primary">Message</span>
                <textarea
                  rows={5} value={formState.message}
                  onChange={(e) => { setValidationError(null); setFormState({ ...formState, message: e.target.value }); }}
                  required minLength={10} maxLength={5000} placeholder="Tell me about the role, project, or problem."
                  className="resize-none rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:bg-white/[0.06]"
                />
              </label>

              {validationError && (
                <div className="rounded-xl border border-signal-cyan/20 bg-signal-cyan/10 px-4 py-3 text-sm text-signal-cyan" role="alert">
                  {validationError}
                </div>
              )}

              <button
                type="submit" disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary px-5 py-3 text-sm font-semibold text-background transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending' : 'Send message'}
                <Send size={16} aria-hidden="true" />
              </button>

              <div
                role="status" aria-live="polite"
                className={`text-center text-sm font-medium transition-opacity ${status ? 'opacity-100' : 'opacity-0'} text-signal-cyan`}
              >
                {statusMessage}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;