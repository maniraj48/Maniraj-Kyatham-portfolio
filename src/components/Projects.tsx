import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { sounds } from '../utils/soundEffects';
import { Github, ArrowUpRight, Activity, Terminal, ShieldCheck, ArrowDown } from 'lucide-react';

interface ProjectsProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onShowToast }) => {
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    sounds.playModalOpen();
    setActiveProjectModal(project);
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0A0A0C] text-[#E8E4DE] py-20 sm:py-24 md:py-32 overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              02 / SELECTED WORK
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275]">
              PROJECTS / 2026
            </span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-cream tracking-tight uppercase">
{/*
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-cream tracking-tight uppercase">
*/}            SELECTED WORK
          </h2>
          <div className="h-[2px] w-16 bg-accent mt-3 mb-6" />

          <p className="text-base sm:text-lg text-[#9E988F] font-sans max-w-2xl leading-relaxed">
            Full-stack systems and offline document intelligence applications built with FastAPI, Flask, SQLite, Scikit-Learn, and ChromaDB.
          </p>
        </div>

        {/* Large Editorial Technical Project Panels */}
        <div className="space-y-16 sm:space-y-24">
          {PROJECTS.map((project) => {
            const isFirst = project.projectNumber === '01';

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleOpenProject(project)}
                data-cursor="view"
                className="group relative rounded-2xl sm:rounded-3xl bg-[#141516] border border-white/10 hover:border-accent/40 p-4 sm:p-8 md:p-12 transition-all duration-300 cursor-pointer shadow-2xl project-card"
              >
                <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Editorial Project Information */}
                  <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                    
                    {/* Number, Year & Visual Label */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-[#8A8275]">
                      <span className="text-accent font-bold">
                        PROJECT {project.projectNumber}
                      </span>
                      <span>/</span>
                      <span>{project.year}</span>
                      {project.visualLabel && (
                        <>
                          <span>/</span>
                          <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                            {project.visualLabel}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Project Title with Hover Arrow */}
                    <div>
                      <h3 className="text-xl sm:text-3xl md:text-4xl font-display font-black text-cream uppercase tracking-tight group-hover:text-accent transition-colors flex items-center justify-between sm:justify-start gap-3">
                        <span className="break-words">{project.title}</span>
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                      </h3>

                      <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#9E988F] font-sans leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Performance / Verification Highlight */}
                    {project.metrics && (
                      <div className="p-3 sm:p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5 font-mono text-xs text-cream">
                        <Activity className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="text-accent font-bold block uppercase tracking-wider text-[10px]">
                            Verified Result:
                          </span>
                          <span className="text-[#9E988F] text-[11px] sm:text-xs leading-relaxed block">{project.metrics}</span>
                        </div>
                      </div>
                    )}

                    {/* Role & Context */}
                    <div className="font-mono text-xs text-[#8A8275] flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>Role: <strong className="text-cream">{project.role}</strong></span>
                      {project.team && <span>·</span>}
                      {project.team && <span>Team: <strong className="text-cream">{project.team}</strong></span>}
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-md bg-black/40 border border-white/10 font-mono text-[10px] sm:text-[11px] text-cream"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenProject(project);
                        }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white hover:bg-accent-light font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer active:scale-95 min-h-[42px]"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-surface border border-white/15 text-cream hover:text-white hover:border-white/30 font-mono text-xs uppercase tracking-wider transition-colors active:scale-95 min-h-[42px]"
                        title="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    </div>

                  </div>

                  {/* Right Column: Technical Architecture Panel (Section 9) */}
                  <div className="lg:col-span-6">
                    <div className="relative rounded-2xl overflow-hidden bg-[#0C0D0E] border border-white/10 p-3.5 sm:p-6 md:p-7 space-y-3 sm:space-y-4 group-hover:border-accent/40 transition-colors shadow-xl">
                      
                      {/* Terminal-Style Header Ribbon */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-white/10 text-xs font-mono text-[#8A8275]">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="flex items-center gap-1.5 shrink-0">
                            <span className="w-2 h-2 rounded-full bg-red-500/80" />
                            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                            <span className="w-2 h-2 rounded-full bg-green-500/80" />
                          </span>
                          <span className="text-cream uppercase tracking-wider text-[10px] sm:text-[11px] font-semibold truncate">
                            {isFirst ? 'SYSTEM ARCHITECTURE PIPELINE' : 'OFFLINE RETRIEVAL PIPELINE'}
                          </span>
                        </div>
                        <span className="text-accent text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest shrink-0">
                          [LIVE PIPELINE]
                        </span>
                      </div>

                      {/* Explicit Architecture Pipeline Flow */}
                      <div className="space-y-1.5 sm:space-y-2 font-mono text-xs">
                        {isFirst ? (
                          <>
                            {/* Subscription Churn Architecture Steps */}
                            <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                <span className="text-cream font-medium text-xs truncate">React Frontend</span>
                              </div>
                              <span className="text-[#8A8275] text-[9px] sm:text-[10px] uppercase font-mono shrink-0 text-right">[CLIENT UI &amp; AUTH]</span>
                            </div>

                            <div className="flex justify-center text-[#8A8275] py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-accent animate-bounce" />
                            </div>

                            <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                <span className="text-cream font-medium text-xs truncate">FastAPI REST Gateway</span>
                              </div>
                              <span className="text-emerald-400 text-[9px] sm:text-[10px] uppercase font-mono shrink-0 text-right">[ASYNC HANDLERS / JWT]</span>
                            </div>

                            <div className="flex justify-center text-[#8A8275] py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-accent" />
                            </div>

                            <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                                <span className="text-cream font-medium text-xs truncate">ML Prediction Pipeline</span>
                              </div>
                              <span className="text-purple-400 text-[9px] sm:text-[10px] uppercase font-mono shrink-0 text-right">[SCIKIT-LEARN INFERENCE]</span>
                            </div>

                            <div className="flex justify-center text-[#8A8275] py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-accent" />
                            </div>

                            <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                                <span className="text-cream font-medium text-xs truncate">SQLAlchemy</span>
                              </div>
                              <span className="text-[#8A8275] text-[9px] sm:text-[10px] uppercase font-mono shrink-0 text-right">[ORM MAPPING]</span>
                            </div>

                            <div className="flex justify-center text-[#8A8275] py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-accent" />
                            </div>

                            <div className="p-2.5 sm:p-3 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                <span className="text-accent font-bold text-xs truncate">SQLite Database</span>
                              </div>
                              <span className="text-accent text-[9px] sm:text-[10px] font-bold uppercase font-mono shrink-0 text-right">[&lt;40MS CTE QUERY]</span>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Knowledge Vault AI Architecture Steps */}
                            <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                <span className="text-cream font-medium text-xs truncate">Document Ingestion</span>
                              </div>
                              <span className="text-[#8A8275] text-[9px] sm:text-[10px] uppercase font-mono shrink-0 text-right">[LOCAL PDF / TXT / MD]</span>
                            </div>

                            <div className="flex justify-center text-[#8A8275] py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-accent" />
                            </div>

                            <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                                <span className="text-cream font-medium text-xs truncate">Text Processing</span>
                              </div>
                              <span className="text-[#8A8275] text-[9px] sm:text-[10px] uppercase font-mono shrink-0 text-right">[RECURSIVE CHUNKING]</span>
                            </div>

                            <div className="flex justify-center text-[#8A8275] py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-accent" />
                            </div>

                            <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                <span className="text-cream font-medium text-xs truncate">Embeddings</span>
                              </div>
                              <span className="text-emerald-400 text-[9px] sm:text-[10px] uppercase font-mono shrink-0 text-right">[LOCAL FAST-EMBED]</span>
                            </div>

                            <div className="flex justify-center text-[#8A8275] py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-accent" />
                            </div>

                            <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                                <span className="text-cream font-medium text-xs truncate">ChromaDB Vector Storage</span>
                              </div>
                              <span className="text-purple-400 text-[9px] sm:text-[10px] uppercase font-mono shrink-0 text-right">[PERSISTENT VAULT]</span>
                            </div>

                            <div className="flex justify-center text-[#8A8275] py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-accent" />
                            </div>

                            <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                <span className="text-cream font-medium text-xs truncate">Semantic Retrieval</span>
                              </div>
                              <span className="text-cyan-400 text-[9px] sm:text-[10px] uppercase font-mono shrink-0 text-right">[K-NEAREST NEIGHBORS]</span>
                            </div>

                            <div className="flex justify-center text-[#8A8275] py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-accent" />
                            </div>

                            <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span className="text-emerald-400 font-bold text-xs truncate">Source-Aware Answer</span>
                              </div>
                              <span className="text-emerald-400 text-[9px] sm:text-[10px] font-bold uppercase font-mono shrink-0 text-right">[100% OFFLINE QA]</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Technical Footnote */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono text-[#8A8275] border-t border-white/10">
                        <span className="truncate">Click card to open full case study</span>
                        <span className="text-cream group-hover:text-accent transition-colors font-medium shrink-0">
                          Inspect 8-Part Case Study →
                        </span>
                      </div>

                    </div>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

      </div>

      {/* Dedicated Project Case Study Modal */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onShowToast={onShowToast}
      />
    </section>
  );
};
