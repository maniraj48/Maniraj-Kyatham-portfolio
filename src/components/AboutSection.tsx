import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Database, Zap, Cpu, MapPin, GraduationCap, Award, Activity } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-[#0A0A0C] text-[#E8E4DE] py-10 sm:py-12 md:py-16 overflow-hidden border-b border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some', margin: '0px 0px -40px 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16"
      >
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent block mb-3">
            01 / ABOUT
          </span>
          
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-cream tracking-tight uppercase">
{/*
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-cream tracking-tight uppercase">
*/}
            A little about me
          </h2>
          <div className="h-[2px] w-16 bg-accent mt-3" />
        </div>

        {/* Editorial Narrative Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Main Prose (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-sans text-cream/95 leading-relaxed tracking-tight">
              I am a final-year <strong className="text-cream font-semibold">B.Tech Information Technology</strong> student at <strong className="text-cream font-semibold">ACE Engineering College</strong> in Hyderabad (CGPA 8.36).
            </p>

            <div className="space-y-5 text-base sm:text-lg text-[#9E988F] font-sans leading-relaxed">
              <p>
                I build software using Python, backend frameworks, REST APIs, databases, machine learning, and AI technologies. My project experience includes full-stack prediction systems, backend APIs, database-driven applications, and offline AI applications.
              </p>
              <p>
                My focus is on learning through implementation and building practical software — designing clean APIs, optimizing relational and vector databases, and ensuring systems run reliably and securely without unnecessary external dependencies.
              </p>
            </div>

            {/* Unboxed Metadata Row */}
            <div className="pt-4 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-mono text-[#8A8275] border-t border-white/10">
              <span className="flex items-center gap-1.5 text-cream">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-cream">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                <span>B.Tech IT (2023–2027)</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-cream">
                <Award className="w-3.5 h-3.5 text-accent" />
                <span>CGPA 8.36 / 10</span>
              </span>
            </div>
          </div>

          {/* Right Column: Reference-Style Technical Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. CORE TECHNICAL FOCUS Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#141516] border border-white/10 space-y-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8A8275] block font-semibold">
                  CORE TECHNICAL FOCUS
                </span>
                <span className="w-2 h-2 rounded-full bg-accent" />
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-cream/90 font-mono">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>Backend &amp; REST APIs</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>Python / FastAPI / Flask</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>SQL &amp; Database Systems</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>AI / ML</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>Offline AI Applications</span>
                </li>
              </ul>
            </div>

            {/* 2. Factual Engineering Metric Card (<40 ms) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#141516] border border-accent/30 space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A8275] block">
                  FACTUAL BENCHMARK
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10">
                  VERIFIED
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-display font-black text-accent tracking-tight">
                &lt;40 ms
              </div>

              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-cream">
                  Critical SQL Query Execution-Time Improvement
                </h4>
                <p className="mt-1 text-xs text-[#9E988F] leading-relaxed">
                  from approximately ~270 ms to under 40 ms using indexed views and CTE-based queries.
                </p>
              </div>

              {/* Visual Execution Bar Comparison */}
              <div className="pt-2 space-y-2 border-t border-white/10">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-[#8A8275] mb-1">
                    <span>Unindexed sequential scan</span>
                    <span className="text-rose-400 font-semibold">~270 ms</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-rose-500/80 rounded-full w-[88%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-[#8A8275] mb-1">
                    <span>Indexed view &amp; recursive CTE</span>
                    <span className="text-accent font-semibold">&lt;40 ms</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-accent rounded-full w-[15%]" />
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-mono text-[#8A8275] italic pt-1">
                * Applies specifically to critical query execution time, not overall application runtime.
              </p>
            </div>

          </div>

        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mt-14 pt-12 border-t border-white/10">
          
          <div className="p-6 sm:p-7 rounded-2xl bg-[#141516] border border-white/10 space-y-3 relative group hover:border-accent/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Database className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block">
              PILLAR 01
            </span>
            <h3 className="font-display font-bold text-lg text-cream">
              Database &amp; SQL Query Tuning
            </h3>
            <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
              Designing normalized schemas and executing strategic query optimization with indexed views and CTE-based queries to reduce critical execution time.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#141516] border border-white/10 space-y-3 relative group hover:border-accent/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block">
              PILLAR 02
            </span>
            <h3 className="font-display font-bold text-lg text-cream">
              FastAPI &amp; RESTful Backends
            </h3>
            <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
              Building modular asynchronous APIs with FastAPI, Flask, JWT authentication, Pydantic validation, and clean integration with modern frontend interfaces.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#141516] border border-white/10 space-y-3 relative group hover:border-accent/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block">
              PILLAR 03
            </span>
            <h3 className="font-display font-bold text-lg text-cream">
              Offline Document Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
              Developing semantic vector search and source-aware QA systems with ChromaDB and LangChain designed to operate entirely offline without third-party API exposure.
            </p>
          </div>

        </div>

      </motion.div>
    </section>
  );
};
