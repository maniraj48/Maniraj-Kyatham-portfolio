import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILL_GROUPS, EDUCATIONS, CERTIFICATIONS } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { FileText, Download, X } from 'lucide-react';
import resumePreviewImg from '../assets/images/Maniraj_Kyatham_Resume.png';
import resumePdfFile from '../assets/Maniraj_Kyatham_Resume.pdf';

interface ResumeSectionProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onShowToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Background scroll lock and escape listener
  useEffect(() => {
    if (!modalOpen) return;

    lockScroll('resume-modal');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unlockScroll('resume-modal');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  const handleDownload = () => {
    sounds.playSuccess();
    setDownloading(true);
    onShowToast('Downloading Maniraj Kyatham Resume (PDF)...', 'success');

    // Cross-browser reliable PDF download directly from attached resume asset
    const link = document.createElement('a');
    link.href = resumePdfFile || '/Maniraj_Kyatham_Resume.pdf';
    link.setAttribute('download', 'Maniraj_Kyatham_Resume.pdf');
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloading(false), 1200);
  };

  return (
    <section className="w-full py-10 sm:py-12 bg-[#0A0A0C] border-t border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="rounded-2xl sm:rounded-3xl bg-[#141516] border border-white/15 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent block mb-2">
              DOCUMENTATION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-cream uppercase tracking-tight">
              WANT THE FULL PICTURE?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#9E988F] font-sans max-w-xl leading-relaxed">
              Inspect the comprehensive resume detailing academic achievements at ACE Engineering College, internship experience, technical stack, and project contributions.
            </p>
            <div className="mt-2.5 flex items-center gap-2 text-xs font-mono text-[#8A8275]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Authentic 1-Page PDF • Direct Download</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                sounds.playModalOpen();
                setModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface border border-white/20 text-cream hover:text-white hover:border-accent transition-colors font-mono text-xs uppercase tracking-wider cursor-pointer active:scale-95 shadow-md"
            >
              <FileText className="w-4 h-4 text-accent" />
              <span>VIEW RESUME</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white hover:bg-accent-light transition-all font-mono text-xs uppercase tracking-wider font-bold cursor-pointer active:scale-95 shadow-xl disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'PREPARING PDF...' : 'DOWNLOAD RESUME (PDF)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* In-Browser Interactive Resume Viewer Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-[9990] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
          >
            <div
              className="fixed inset-0"
              onClick={() => {
                sounds.playClick();
                setModalOpen(false);
              }}
              aria-hidden="true"
            />

            <motion.div
              data-lenis-prevent="true"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl h-[92dvh] sm:h-[88vh] max-h-[900px] rounded-2xl sm:rounded-3xl bg-[#0F0E0C] text-[#E8E4DE] border border-white/20 shadow-2xl z-10 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-resume-title"
            >
              {/* Modal Header — Clean single Download button and Close */}
              <div className="shrink-0 px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/10 bg-[#141516] flex items-center justify-between gap-4 z-20">
                <div className="min-w-0">
                  <span className="font-mono text-[10px] sm:text-xs text-accent uppercase tracking-widest block font-bold">
                    CURRICULUM VITAE · VERIFIED
                  </span>
                  <h3 id="modal-resume-title" className="text-base sm:text-xl font-display font-black text-cream uppercase truncate">
                    Maniraj Kyatham
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-full bg-accent text-white text-xs font-mono uppercase tracking-wider hover:bg-accent-light transition-colors min-h-[38px] active:scale-95 cursor-pointer font-bold shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setModalOpen(false);
                    }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Direct Authentic Resume Document Viewport */}
              <div
                data-lenis-prevent="true"
                tabIndex={0}
                className="flex-1 p-2 sm:p-4 md:p-6 bg-[#121315] overflow-y-auto overscroll-contain touch-pan-y code-scroll focus:outline-none flex justify-center items-start"
              >
                {/* Authentic Attached Resume Document */}
                <div className="relative max-w-[780px] w-full bg-white shadow-2xl rounded-sm overflow-hidden border border-neutral-400">
                  <img
                    src={resumePreviewImg}
                    alt="Maniraj Kyatham Resume"
                    className="w-full h-auto block"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Modal Footer — Clean and uncluttered with single close button */}
              <div className="shrink-0 px-4 sm:px-8 py-3.5 sm:py-4 border-t border-white/10 bg-[#141516] flex items-center justify-between gap-3 z-20">
                <span className="font-mono text-[11px] sm:text-xs text-[#8A8275] truncate">
                  Verified Curriculum Vitae of Maniraj Kyatham · ACE Engineering College
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setModalOpen(false);
                  }}
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-cream uppercase transition-colors cursor-pointer min-h-[36px]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
