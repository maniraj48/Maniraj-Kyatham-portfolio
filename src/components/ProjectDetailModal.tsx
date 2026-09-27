import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { sounds } from '../utils/soundEffects';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import {
  X,
  Github,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  Activity,
  ShieldCheck,
  Layers,
  Code
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (!project) return;

    lockScroll('project-modal');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unlockScroll('project-modal');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (!project.codeSnippet) return;
    sounds.playClick();
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    onShowToast('Code snippet copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-[9990] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
      >
        {/* Background Click to Dismiss */}
        <div
          className="fixed inset-0"
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          aria-hidden="true"
        />

        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[94dvh] sm:h-[90vh] max-h-[920px] rounded-2xl sm:rounded-3xl bg-[#0F0E0C] text-[#E8E4DE] border border-white/15 shadow-2xl z-10 flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Top Sticky Close Bar */}
          <div className="shrink-0 px-4 sm:px-8 py-3.5 sm:py-4 bg-[#141516] border-b border-white/10 flex items-center justify-between gap-4 z-20">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
              <span className="font-mono text-[11px] sm:text-xs text-accent font-semibold tracking-widest uppercase">
                CASE STUDY · {project.projectNumber}
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs text-[#8A8275]">{project.year}</span>
              {project.visualLabel && (
                <>
                  <span className="text-white/20">/</span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold tracking-wider uppercase">
                    {project.visualLabel}
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 text-cream hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer active:scale-95 shrink-0"
              aria-label="Close case study"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Scrollable Case Study Body */}
          <div
            data-lenis-prevent="true"
            tabIndex={0}
            className="flex-1 px-4 sm:px-8 md:px-12 py-5 sm:py-8 overflow-y-auto overscroll-contain touch-pan-y code-scroll space-y-6 focus:outline-none"
          >
            {/* Project Title Header Banner */}
            <div>
              <h2
                id="modal-project-title"
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-cream uppercase tracking-tight break-words"
              >
                {project.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base md:text-lg text-[#9E988F] font-sans leading-relaxed max-w-3xl">
                {project.tagline}
              </p>

              {/* Quick Meta Strip */}
              <div className="mt-5 flex flex-wrap items-center gap-y-3 gap-x-6 pt-4 border-t border-white/10 font-mono text-xs text-[#8A8275]">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Role</span>
                  <span className="text-cream font-medium">{project.role}</span>
                </div>
                {project.team && (
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase tracking-wider">Context</span>
                    <span className="text-cream font-medium">{project.team}</span>
                  </div>
                )}
                {project.metrics && (
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase tracking-wider">Verified Metric</span>
                    <span className="text-accent font-bold">{project.metrics}</span>
                  </div>
                )}
                <div>
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Repository</span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cream hover:text-accent transition-colors underline inline-flex items-center gap-1"
                  >
                    <span>github.com/maniraj48</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* 8 Structured Case Study Sections (Section 11) */}

            {/* 01 — Overview */}
            <div className="py-5 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-2.5">
                01 — Overview
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-cream/90 font-sans leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* 02 — Problem */}
            <div className="py-5 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-2.5">
                02 — Problem
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-cream/90 font-sans leading-relaxed">
                {project.problemSolved}
              </p>
            </div>

            {/* 03 — Approach */}
            <div className="py-5 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-2.5">
                03 — Approach
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-cream/90 font-sans leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* 04 — Architecture */}
            <div className="py-5 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                  04 — Architecture
                </h3>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#8A8275]">
                  Sequential Execution Pipeline
                </span>
              </div>

              <div className="p-3.5 sm:p-5 rounded-2xl bg-[#141516] border border-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 overflow-x-auto pb-1">
                  {project.architectureSteps.map((step, idx) => {
                    const isLast = idx === project.architectureSteps.length - 1;
                    const isActive = activeStepIndex === idx;
                    return (
                      <React.Fragment key={idx}>
                        <button
                          type="button"
                          onClick={() => setActiveStepIndex(idx)}
                          className={`text-left p-3 rounded-xl border transition-all shrink-0 cursor-pointer w-full md:w-auto md:min-w-[130px] ${
                            isActive
                              ? 'bg-accent/15 border-accent text-white'
                              : 'bg-black/30 border-white/10 text-[#9E988F] hover:border-white/20'
                          }`}
                        >
                          <span className="font-mono text-[10px] text-accent block font-bold mb-1">
                            STEP {idx + 1}
                          </span>
                          <span className="font-display font-bold text-xs sm:text-sm block text-cream">
                            {step.label}
                          </span>
                          {step.sublabel && (
                            <span className="font-mono text-[10px] text-[#8A8275] block mt-0.5">
                              {step.sublabel}
                            </span>
                          )}
                        </button>

                        {!isLast && (
                          <div className="hidden md:flex items-center justify-center text-[#8A8275] shrink-0">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                        {!isLast && (
                          <div className="md:hidden flex items-center justify-center text-[#8A8275] py-0.5">
                            <span className="text-xs">↓</span>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 05 — Implementation */}
            <div className="py-5 border-t border-white/10 space-y-4 sm:space-y-5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                05 — Implementation
              </h3>

              {/* Contributions Grid */}
              <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
                {project.whatManirajBuilt.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-surface/80 border border-white/10 flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-cream/90"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Code Implementation Preview Window */}
              {project.codeSnippet && (
                <div className="pt-2">
                  <div className="rounded-xl sm:rounded-2xl bg-[#09090b] border border-white/10 overflow-hidden">
                    <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="flex items-center gap-1.5 shrink-0">
                          <span className="w-2 h-2 rounded-full bg-red-500/80" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                          <span className="w-2 h-2 rounded-full bg-green-500/80" />
                        </span>
                        <span className="font-mono text-[11px] sm:text-xs text-[#8A8275] truncate">
                          {project.codeSnippet.filename}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-mono text-cream transition-colors cursor-pointer shrink-0"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-[10px] sm:text-xs">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#8A8275]" />
                            <span className="text-[10px] sm:text-xs">COPY</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div
                      data-lenis-prevent="true"
                      className="p-3.5 sm:p-5 overflow-x-auto overscroll-contain touch-pan-x code-scroll"
                    >
                      <pre className="font-mono text-xs text-[#E8E4DE]/90 leading-relaxed">
                        <code>{project.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 06 — Technologies */}
            <div className="py-5 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                06 — Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-[#141516] border border-white/10 font-mono text-xs text-cream"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 07 — Engineering Result */}
            <div className="py-5 border-t border-white/10 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                07 — Engineering Result
              </h3>

              {/* Benchmark Card for Subscription Churn */}
              {project.id === 'subscription-churn-prediction' && (
                <div className="p-4 sm:p-6 rounded-2xl bg-[#141516] border border-accent/30 space-y-3.5 sm:space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4 shrink-0" />
                      <span>Critical Query Benchmark</span>
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      &lt;40 ms Verified
                    </span>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-[#8A8275] mb-1">
                        <span>Original Unindexed Query</span>
                        <span className="text-rose-400 font-bold">~270 ms</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-rose-500/80 rounded-full w-[90%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-[#8A8275] mb-1">
                        <span>Optimized CTE-Based Query &amp; Indexed Views</span>
                        <span className="text-accent font-bold">&lt;40 ms</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-accent rounded-full w-[14%]" />
                      </div>
                    </div>
                  </div>

                  <p className="font-mono text-[11px] sm:text-xs text-[#9E988F] leading-relaxed pt-2 border-t border-white/10">
                    <strong className="text-cream">Factual Note:</strong> This improvement specifically measures the critical query execution time (from ~270 ms down to under 40 ms) achieved by replacing full sequential scans with indexed views and recursive CTEs. It does not represent whole-app execution speed.
                  </p>
                </div>
              )}

              {/* Privacy Verification Card for Knowledge Vault AI */}
              {project.id === 'knowledge-vault-ai' && (
                <div className="p-4 sm:p-6 rounded-2xl bg-[#141516] border border-emerald-500/30 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>100% Offline Document Intelligence</span>
                  </div>
                  <p className="text-xs sm:text-sm text-cream/90 font-sans leading-relaxed">
                    All vector representations and embedding calculations run locally using ChromaDB on disk. Zero raw text passages or search vectors are transmitted outside the host environment, guaranteeing absolute document privacy.
                  </p>
                </div>
              )}

              <p className="text-xs sm:text-sm md:text-base text-cream/90 font-sans leading-relaxed">
                {project.engineeringResult}
              </p>
            </div>
          </div>

          {/* 08 — Bottom Action Bar (Fixed at bottom) */}
          <div className="shrink-0 px-4 sm:px-8 py-3.5 sm:py-4 bg-[#141516] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 z-20">
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">
                08 — GitHub Repository
              </span>
              <span className="font-display font-bold text-xs sm:text-sm text-cream">
                Inspect Source Code &amp; Documentation
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-cream uppercase transition-colors cursor-pointer min-h-[40px]"
              >
                Close
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white hover:bg-accent-light font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer min-h-[40px]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
