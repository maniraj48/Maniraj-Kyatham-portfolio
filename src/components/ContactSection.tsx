import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check, Send, ArrowUpRight, CheckCircle2, RotateCcw, ExternalLink } from 'lucide-react';
import { XIcon } from './icons/XIcon';

interface ContactSectionProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedX, setCopiedX] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
    needsActivation?: boolean;
    forwarded?: boolean;
    note?: string;
  } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    sounds.playSuccess();
    onShowToast('Email copied to clipboard', 'success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    sounds.playSuccess();
    onShowToast('Phone number copied to clipboard', 'success');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyX = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.xHandle);
    setCopiedX(true);
    sounds.playSuccess();
    onShowToast('X username copied to clipboard', 'success');
    setTimeout(() => setCopiedX(false), 2000);
  };

  const getGmailComposeUrl = (subject: string, body: string) => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(body)}`;
  };

  const getMailtoUrl = (subject: string, body: string) => {
    return `mailto:${encodeURIComponent(PERSONAL_INFO.email)}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      sounds.playError();
      onShowToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    sounds.playClick();

    const currentData = { ...formData };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData)
      });

      const resJson = await response.json();

      if (response.ok && resJson.success) {
        sounds.playSuccess();
        setSubmissionData({
          ...currentData,
          needsActivation: resJson.needsActivation,
          forwarded: resJson.forwarded,
          note: resJson.note
        });
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        if (resJson.needsActivation) {
          onShowToast('Message saved! Check your email for FormSubmit activation.', 'info');
        } else {
          onShowToast('Message dispatched directly to Maniraj!', 'success');
        }
      } else {
        throw new Error(resJson.error || 'Failed to dispatch');
      }
    } catch (err: any) {
      console.error('Contact dispatch error:', err);
      sounds.playError();
      // Graceful fallback: Still allow them to send via Gmail / mailto immediately
      setSubmissionData({
        ...currentData,
        needsActivation: false,
        forwarded: false,
        note: 'Saved locally, email client ready'
      });
      setSubmitted(true);
      onShowToast('Ready to send via your email client or Gmail!', 'info');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    sounds.playClick();
    setSubmitted(false);
    setSubmissionData(null);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0A0A0C] text-[#E8E4DE] py-10 sm:py-12 md:py-16 overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Large Reference-Style Contact Heading (Section 16) */}
        <div className="mb-8 sm:mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent block mb-3">
            06 / CONTACT
          </span>
          
          {/* <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream tracking-tight uppercase leading-[0.92]">
          */}
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream tracking-tight uppercase leading-[0.92]">

            LET'S BUILD<br />
            SOMETHING<br />
            <span className="serif-accent normal-case italic font-normal text-cream/90">useful.</span>
          </h2>
          <div className="h-[2px] w-20 bg-accent mt-3 mb-4" />
          <p className="text-base sm:text-xl text-[#9E988F] font-sans max-w-3xl leading-relaxed">
            Interested in software development, backend engineering, AI/ML, or building practical systems? Let's connect.
          </p>
        </div>

        {/* Contact Info & Interactive Dispatch Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Direct Communication Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* EMAIL Card */}
            <div className="p-6 rounded-2xl bg-[#141516] border border-white/10 space-y-3 shadow-lg group hover:border-accent/40 transition-colors">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block font-semibold">
                EMAIL
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-sm sm:text-base text-cream hover:text-accent transition-colors truncate select-all"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-10 h-10 rounded-xl bg-surface border border-white/10 text-cream hover:text-accent hover:border-accent flex items-center justify-center transition-colors cursor-pointer shrink-0 active:scale-95"
                  title="Copy Email"
                  aria-label="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* PHONE Card */}
            <div className="p-6 rounded-2xl bg-[#141516] border border-white/10 space-y-3 shadow-lg group hover:border-accent/40 transition-colors">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block font-semibold">
                PHONE
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="font-mono text-sm sm:text-base text-cream hover:text-accent transition-colors select-all"
                >
                  {PERSONAL_INFO.phone}
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="w-10 h-10 rounded-xl bg-surface border border-white/10 text-cream hover:text-accent hover:border-accent flex items-center justify-center transition-colors cursor-pointer shrink-0 active:scale-95"
                  title="Copy Phone"
                  aria-label="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* X (TWITTER) Card */}
            <div className="p-6 rounded-2xl bg-[#141516] border border-white/10 space-y-3 shadow-lg group hover:border-accent/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block font-semibold">
                  X (TWITTER)
                </span>
                <span className="font-mono text-[11px] text-accent tracking-wider uppercase">Direct Message</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={PERSONAL_INFO.x}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm sm:text-base text-cream hover:text-accent transition-colors select-all flex items-center gap-2.5 truncate"
                >
                  <XIcon className="w-4 h-4 text-accent shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.xHandle}</span>
                </a>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyX}
                    className="w-10 h-10 rounded-xl bg-surface border border-white/10 text-cream hover:text-accent hover:border-accent flex items-center justify-center transition-colors cursor-pointer shrink-0 active:scale-95"
                    title="Copy X Username"
                    aria-label="Copy X Username"
                  >
                    {copiedX ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={PERSONAL_INFO.x}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-surface border border-white/10 text-cream hover:text-accent hover:border-accent flex items-center justify-center transition-colors cursor-pointer shrink-0 active:scale-95"
                    title="Open X Profile"
                    aria-label="Open X Profile"
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#8A8275]" />
                  </a>
                </div>
              </div>
            </div>

            {/* LOCATION Card */}
            <div className="p-6 rounded-2xl bg-[#141516] border border-white/10 space-y-4 shadow-lg">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block font-semibold">
                LOCATION
              </span>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cream font-mono">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>{PERSONAL_INFO.location}, Telangana</span>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-white/10 text-xs font-mono text-cream hover:border-accent hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-accent" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8275]" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-white/10 text-xs font-mono text-cream hover:border-accent hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-accent" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8275]" />
                </a>

                <a
                  href={PERSONAL_INFO.medium}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-white/10 text-xs font-mono text-cream hover:border-accent hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-accent" />
                  <span>Medium</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8275]" />
                </a>

                <a
                  href={PERSONAL_INFO.x}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-white/10 text-xs font-mono text-cream hover:border-accent hover:text-white transition-colors"
                >
                  <XIcon className="w-4 h-4 text-accent" />
                  <span>X</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8275]" />
                </a>
              </div>
            </div>

          </div>

          {/* Direct Dispatch Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#141516] border border-white/10 shadow-xl">
              <AnimatePresence mode="wait">
                {submitted && submissionData ? (
                  <motion.div
                    key="submitted-state"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                          MESSAGE DISPATCHED
                        </span>
                        <h3 className="font-display font-bold text-cream text-lg">
                          Transmission Logged & Routed
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
                      <div className="text-[#8A8275] flex items-center justify-between">
                        <span>DESTINATION:</span>
                        <span className="text-cream select-all">{PERSONAL_INFO.email}</span>
                      </div>
                      <div className="text-[#8A8275] flex items-center justify-between">
                        <span>FROM:</span>
                        <span className="text-cream select-all">{submissionData.name} ({submissionData.email})</span>
                      </div>
                      <div className="text-[#8A8275] flex items-center justify-between">
                        <span>SUBJECT:</span>
                        <span className="text-cream truncate max-w-[240px]">{submissionData.subject || 'Portfolio Inquiry'}</span>
                      </div>
                    </div>

                    {submissionData.needsActivation && (
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-amber-400 font-mono font-semibold">
                          <span>📬 FormSubmit Email Activation Notice</span>
                        </div>
                        <p className="text-cream/90 text-xs font-sans leading-relaxed">
                          A 1-time activation confirmation email was sent by FormSubmit to <strong className="text-cream">{PERSONAL_INFO.email}</strong>. 
                          Once you click <em>"Activate Form"</em> in your Gmail inbox, FormSubmit will automatically push all future web submissions directly into your inbox.
                        </p>
                      </div>
                    )}

                    <div className="space-y-3 pt-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block">
                        Direct Email Actions
                      </span>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={getGmailComposeUrl(
                            submissionData.subject,
                            `Hi Maniraj,\n\n${submissionData.message}\n\n---\nFrom: ${submissionData.name} (${submissionData.email})`
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-white/15 text-xs font-mono text-cream hover:border-accent hover:text-white transition-colors cursor-pointer"
                        >
                          <Mail className="w-4 h-4 text-accent" />
                          <span>Open Pre-Filled in Gmail Web</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#8A8275]" />
                        </a>

                        <a
                          href={getMailtoUrl(
                            submissionData.subject,
                            `Hi Maniraj,\n\n${submissionData.message}\n\n---\nFrom: ${submissionData.name} (${submissionData.email})`
                          )}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-white/15 text-xs font-mono text-cream hover:border-accent hover:text-white transition-colors cursor-pointer"
                        >
                          <Mail className="w-4 h-4 text-accent" />
                          <span>Send via Default Mail App</span>
                        </a>

                        <a
                          href={PERSONAL_INFO.x}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-white/15 text-xs font-mono text-cream hover:border-accent hover:text-white transition-colors cursor-pointer"
                        >
                          <XIcon className="w-4 h-4 text-accent" />
                          <span>Message on X ({PERSONAL_INFO.xHandle})</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#8A8275]" />
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-2 text-xs font-mono text-[#8A8275] hover:text-cream transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Send another message</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block mb-4 font-semibold">
                      SEND A MESSAGE
                    </span>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs uppercase text-[#8A8275] mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Name or Organization"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm font-sans text-cream placeholder:text-[#8A8275]/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent min-h-[44px] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs uppercase text-[#8A8275] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm font-sans text-cream placeholder:text-[#8A8275]/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent min-h-[44px] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-[#8A8275] mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Software Engineering Inquiry / Project"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm font-sans text-cream placeholder:text-[#8A8275]/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent min-h-[44px] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-[#8A8275] mb-2">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Describe your technical inquiry, project requirements, or opportunity..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm font-sans text-cream placeholder:text-[#8A8275]/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-light transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer min-h-[44px]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{submitting ? 'DISPATCHING...' : 'DISPATCH MESSAGE'}</span>
                      </button>

                      <div className="flex items-center gap-3 text-xs font-mono text-[#8A8275]">
                        <span>Or direct:</span>
                        <a
                          href={getGmailComposeUrl(formData.subject, formData.message)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cream hover:text-accent transition-colors underline decoration-dotted"
                          title="Open pre-filled draft in Gmail"
                        >
                          Gmail Web
                        </a>
                        <span>·</span>
                        <a
                          href={getMailtoUrl(formData.subject, formData.message)}
                          className="text-cream hover:text-accent transition-colors underline decoration-dotted"
                          title="Open in Mail app"
                        >
                          Mail Client
                        </a>
                      </div>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
