import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { AboutSection } from './components/AboutSection';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { TechStackSection } from './components/TechStackSection';
import { ResumeSection } from './components/ResumeSection';
import { WritingSection } from './components/WritingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTop } from './components/BackToTop';
import { CustomCursor } from './components/CustomCursor';
import { forceUnlockAll } from './utils/scrollLock';

export default function App() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Ensure initial scroll state is pristine
  useEffect(() => {
    forceUnlockAll();
  }, []);

  // Initialize Lenis smooth scroll for non-touch/desktop devices
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // On touch devices (smartphones, tablets), keep native hardware-accelerated 120Hz scrolling
    // to prevent any virtual scroll gesture interception or touch freezes
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    (window as any).__lenis = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  // Non-blocking IntersectionObserver for active section tracking (zero layout thrashing)
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'experience', 'tech-stack', 'writing', 'contact'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const best = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          if (best.target.id) {
            setActiveSection(best.target.id);
          }
        }
      },
      {
        rootMargin: '-15% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75]
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E8E4DE] font-sans antialiased selection:bg-[#C45D3E] selection:text-white relative">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Subtle Film Grain Overlay */}
      <div className="film-grain pointer-events-none" aria-hidden="true" />

      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="fixed -top-full left-4 z-[10002] bg-[#141516] text-[#E8E4DE] px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest focus:top-4 transition-all"
      >
        Skip to content
      </a>

      {/* Hardware-accelerated Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Clean 3-Zone Top Navigation */}
      <Header
        activeSection={activeSection}
        onOpenAIModal={() => setAiModalOpen(true)}
      />

      {/* Main Content Flow */}
      <main id="main-content">
        {/* Hero Section with Asymmetric Editorial Portrait Composition */}
        <Hero onShowToast={addToast} />

        {/* Technical Ticker Ribbon */}
        <MarqueeStrip />

        {/* 01 / ABOUT: Narrative & Academic Focus */}
        <AboutSection />

        {/* 02 / SELECTED WORK: Projects 2026 + Deep Dive Case Studies */}
        <Projects onShowToast={addToast} />

        {/* 03 / EXPERIENCE: Edunet Foundation Internship + Education + Certifications */}
        <Experience />

        {/* 04 / STACK: Categorized Technical Skills (No percentage bars) */}
        <TechStackSection />

        {/* Documentation: Full Resume Modal & Download */}
        <ResumeSection onShowToast={addToast} />

        {/* 05 / WRITING: THINGS I'VE BEEN WRITING. */}
        <WritingSection />

        {/* 06 / CONTACT: LET'S BUILD SOMETHING USEFUL. */}
        <ContactSection onShowToast={addToast} />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Gemini AI Assistant Modal */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />

      {/* Feedback Toast Alerts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
