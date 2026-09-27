import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILL_GROUPS, EDUCATIONS, CERTIFICATIONS } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { FileText, Download, X, ExternalLink, Check, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { XIcon } from './icons/XIcon';

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
    onShowToast('Preparing and downloading Maniraj Kyatham Resume...', 'info');

    const textContent = `MANIRAJ KYATHAM
Hyderabad, Telangana, India | +91 99494 47302 | manirajkyatham@gmail.com
LinkedIn: https://linkedin.com/in/maniraj-kyatham | GitHub: https://github.com/maniraj48

================================================================================
SUMMARY
================================================================================
Final-year B.Tech Information Technology student at ACE Engineering College (CGPA 8.36).
Builds software using Python, backend frameworks, REST APIs, databases, machine learning,
and AI technologies. Project experience spans full-stack prediction systems, backend APIs,
database-driven applications, and offline AI applications.

================================================================================
EDUCATION
================================================================================
ACE Engineering College, Hyderabad, Telangana
B.Tech — Information Technology (2023 – 2027) | CGPA: 8.36

Raghava Laxmi Devi Govt. Junior College, Hyderabad, Telangana
Intermediate — MPC (2021 – 2023) | 95%

================================================================================
EXPERIENCE
================================================================================
AI & Data Analytics Intern
Edunet Foundation (AICTE & Shell India) | Remote
October 2025 – November 2025
- Developed machine learning applications using Python, pandas, NumPy and scikit-learn.
- Performed data preprocessing and feature engineering.
- Developed and evaluated machine learning models.
- Tested solutions on real-world datasets.
- Collaborated with mentors and team members; delivered milestones and documented implementation.

================================================================================
SELECTED PROJECTS
================================================================================
Subscription Churn Prediction System (2026)
GitHub: https://github.com/maniraj48/Subscription-Churn-Prediction-System
Stack: FastAPI, React, SQLite, SQLAlchemy, Scikit-Learn, JWT, REST APIs
- Full-stack subscription churn prediction platform identifying cancellation risk.
- Served as Product Owner + Developer in a 5-member Agile team.
- Built modular FastAPI REST APIs; integrated React frontend with JWT authentication.
- Implemented Scikit-Learn machine-learning prediction workflows and automated PDF/CSV reports.
- Optimized database queries using indexed views and CTEs, cutting critical query execution time from ~270 ms to <40 ms.

Knowledge Vault AI (2026) - Offline Document Intelligence
GitHub: https://github.com/maniraj48/Knowledge_Vault_AI
Stack: Python, Flask, REST API, LangChain, ChromaDB, SQLite
- Offline document intelligence app enabling semantic search and question answering with source-aware responses.
- Built modular, reusable Flask REST APIs integrating SQLite, ChromaDB, and LangChain.
- Engineered 100% offline retrieval workflows with zero reliance on external cloud APIs.

================================================================================
TECHNICAL SKILLS
================================================================================
Languages: Python, Java, SQL
Backend: FastAPI, Flask, REST APIs, Object-Oriented Programming, Data Structures & Algorithms
Frontend: React.js, HTML, CSS, JavaScript, Material UI
Databases: SQLite, PostgreSQL, SQLAlchemy, ChromaDB
AI / ML: Scikit-Learn, TensorFlow, LangChain, Hugging Face, OpenCV, SHAP
Tools: Git, GitHub, Docker, VS Code, Render
Concepts: Software Engineering, DBMS, Backend Development, API Integration, Agile Scrum, Computer Vision, NLP

================================================================================
CERTIFICATIONS
================================================================================
- Principles of Generative AI — Infosys Springboard (2026)
- AI & Data Analytics — AICTE / Edunet Foundation / Shell India (2025)
- Python Essentials 1 & 2 — Cisco (2024)
- Introduction to SQL — Simplilearn (2024)
- TCS iON Career Edge – Young Professional — TCS iON (2024)
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Maniraj_Kyatham_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <section className="w-full py-16 sm:py-20 bg-[#0A0A0C] border-t border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="rounded-2xl sm:rounded-3xl bg-[#141516] border border-white/15 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative">
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
              <span>{downloading ? 'PREPARING...' : 'DOWNLOAD RESUME'}</span>
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
              className="relative w-full max-w-4xl h-[92dvh] sm:h-[88vh] max-h-[850px] rounded-2xl sm:rounded-3xl bg-[#0F0E0C] text-[#E8E4DE] border border-white/20 shadow-2xl z-10 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-resume-title"
            >
              {/* Modal Header — Fixed at Top */}
              <div className="shrink-0 px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/10 bg-[#141516] flex items-center justify-between gap-4 z-20">
                <div className="min-w-0">
                  <span className="font-mono text-[10px] sm:text-xs text-accent uppercase tracking-widest block font-bold">
                    CURRICULUM VITAE · VERIFIED
                  </span>
                  <h3 id="modal-resume-title" className="text-base sm:text-xl font-display font-black text-cream uppercase truncate">
                    Maniraj Kyatham
                  </h3>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-accent text-white text-xs font-mono uppercase tracking-wider hover:bg-accent-light transition-colors min-h-[38px] active:scale-95 cursor-pointer font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">{downloading ? 'Downloading...' : 'Download'}</span>
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

              {/* Resume Body — Fluidly Scrollable */}
              <div
                data-lenis-prevent="true"
                tabIndex={0}
                className="flex-1 px-4 sm:px-8 md:px-10 py-6 overflow-y-auto overscroll-contain touch-pan-y code-scroll space-y-8 text-xs sm:text-sm focus:outline-none"
              >
                {/* Header Contact */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 font-mono text-xs text-[#8A8275] pb-6 border-b border-white/10">
                  <span className="flex items-center gap-1.5 text-cream">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{PERSONAL_INFO.location}</span>
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-1.5 text-cream hover:text-accent transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    <span>{PERSONAL_INFO.email}</span>
                  </a>
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 text-cream hover:text-accent transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-cream hover:text-accent transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-accent" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-cream hover:text-accent transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-accent" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.x}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-cream hover:text-accent transition-colors"
                  >
                    <XIcon className="w-3.5 h-3.5 text-accent" />
                    <span>{PERSONAL_INFO.xHandle}</span>
                  </a>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                    Professional Summary
                  </h4>
                  <p className="text-cream/90 leading-relaxed font-sans">
                    {PERSONAL_INFO.bio}
                  </p>
                </div>

                {/* Education */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                    Education
                  </h4>
                  <div className="space-y-3">
                    {EDUCATIONS.map((edu) => (
                      <div key={edu.id} className="p-4 rounded-xl bg-surface border border-white/10 flex items-start justify-between gap-4">
                        <div>
                          <div className="font-display font-bold text-cream text-base">{edu.institution}</div>
                          <div className="font-mono text-xs text-[#9E988F]">{edu.degree} · {edu.period}</div>
                          <div className="text-xs text-[#8A8275]">{edu.location}</div>
                        </div>
                        <span className="font-mono text-xs font-bold text-accent px-3 py-1 rounded bg-accent/10 shrink-0">
                          {edu.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                    Internship Experience
                  </h4>
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-surface border border-white/10 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-display font-bold text-cream text-base">{exp.role}</div>
                          <div className="font-mono text-xs text-accent">{exp.company}</div>
                        </div>
                        <span className="font-mono text-xs text-[#8A8275] shrink-0">{exp.period}</span>
                      </div>
                      <p className="text-cream/90">{exp.description}</p>
                      <ul className="space-y-1.5 text-xs text-[#9E988F] list-disc list-inside">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                    Selected Engineering Projects
                  </h4>
                  <div className="space-y-4">
                    {PROJECTS.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-xl bg-surface border border-white/10 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="font-mono text-xs text-accent">{proj.year}</span>
                            <h5 className="font-display font-bold text-cream text-base">{proj.title}</h5>
                          </div>
                          {proj.metrics && (
                            <span className="font-mono text-[11px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 shrink-0">
                              {proj.metrics}
                            </span>
                          )}
                        </div>
                        <p className="text-cream/90 text-xs sm:text-sm">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-black/50 text-[10px] font-mono text-[#9E988F]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                    Technical Skills
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SKILL_GROUPS.map((grp) => (
                      <div key={grp.category} className="p-3.5 rounded-xl bg-surface border border-white/10">
                        <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-1">
                          {grp.category}
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-xs text-cream">
                          {grp.skills.map((s, idx) => (
                            <span key={s}>
                              {s}{idx < grp.skills.length - 1 ? ' · ' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                    Verified Certifications
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {CERTIFICATIONS.map((cert) => (
                      <div key={cert.id} className="p-3 rounded-xl bg-surface border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-medium text-cream">{cert.title}</div>
                          <div className="text-[11px] font-mono text-[#8A8275]">{cert.issuer}</div>
                        </div>
                        <span className="font-mono text-xs text-accent shrink-0">{cert.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer — Fixed at Bottom */}
              <div className="shrink-0 px-4 sm:px-8 py-3.5 sm:py-4 border-t border-white/10 bg-[#141516] flex flex-wrap items-center justify-between gap-3 z-20">
                <span className="font-mono text-[11px] sm:text-xs text-[#8A8275] truncate">
                  Verified Resume of Maniraj Kyatham · ACE Engineering College
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-cream uppercase transition-colors cursor-pointer min-h-[36px]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-white text-xs font-mono uppercase tracking-wider hover:bg-accent-light transition-colors font-bold cursor-pointer active:scale-95 min-h-[36px]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download TXT</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
