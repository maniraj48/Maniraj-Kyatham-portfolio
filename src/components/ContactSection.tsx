import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check, Send, ArrowUpRight, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
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
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    // 1. Prevent native page navigation/reload
    e.preventDefault();
    setStatus('idle');
    setStatusMessage('');

    // 2. Client-side field validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      sounds.playError();
      setStatus('error');
      setStatusMessage('Unable to send your message. Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      sounds.playError();
      setStatus('error');
      setStatusMessage('Unable to send your message. Please provide a valid email address.');
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      sounds.playError();
      setStatus('error');
      setStatusMessage('Unable to send your message. Please enter a message (at least 5 characters).');
      return;
    }

    setSubmitting(true);
    sounds.playClick();

    try {
      // 3. Asynchronous client-side FormSubmit AJAX request
      const response = await fetch('https://formsubmit.co/ajax/manirajkyatham@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          _subject: trimmedSubject ? `[Portfolio] ${trimmedSubject}` : `Portfolio Message from ${trimmedName}`,
          subject: trimmedSubject || 'Portfolio Message',
          message: trimmedMessage,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const responseText = await response.text();
      let resData: any = null;
      try {
        resData = JSON.parse(responseText);
      } catch {
        resData = null;
      }

      const isSuccess =
        response.ok &&
        (resData?.success === 'true' ||
          resData?.success === true ||
          (typeof responseText === 'string' && responseText.includes('"success":"true"')) ||
          response.status === 200);

      if (isSuccess) {
        sounds.playSuccess();
        setStatus('success');
        setStatusMessage('✓ Message sent successfully.');
        onShowToast('✓ Message sent successfully.', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(resData?.message || 'Submission failed');
      }
    } catch (err: any) {
      sounds.playError();
      setStatus('error');
      setStatusMessage('Unable to send your message. Please try again.');
      onShowToast('Unable to send your message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0A0A0C] text-[#E8E4DE] py-10 sm:py-12 md:py-16 overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Large Reference-Style Contact Heading */}
        <div className="mb-8 sm:mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent block mb-3">
            06 / CONTACT
          </span>
          
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

        {/* Contact Info & Form Grid */}
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

          {/* FormSubmit AJAX Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#141516] border border-white/10 shadow-xl">
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
                      name="name"
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
                      name="email"
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
                    name="subject"
                    placeholder="Software Engineering Inquiry / Opportunity"
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
                    name="message"
                    required
                    placeholder="Describe your technical inquiry, project requirements, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm font-sans text-cream placeholder:text-[#8A8275]/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none transition-colors"
                  />
                </div>

                {/* Inline Success/Error Status Message */}
                {status === 'success' && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs font-mono text-rose-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Single Standard SEND MESSAGE button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-light transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer min-h-[44px]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
