import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES, EDUCATIONS, CERTIFICATIONS } from '../data/portfolioData';
import { Briefcase, GraduationCap, Award, CheckCircle2, MapPin } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
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
        <div className="mb-8 sm:mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent block mb-3">
            03 / EXPERIENCE
          </span>

{/*          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-cream tracking-tight uppercase">
 */}
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-cream tracking-tight uppercase">

            EXPERIENCE
          </h2>
          
          <div className="h-[2px] w-16 bg-accent mt-2.5 mb-4" />
          <p className="text-base sm:text-lg text-[#9E988F] font-sans max-w-2xl leading-relaxed">
            Professional industry internship experience, formal academic training, and verified technical credentials.
          </p>
        </div>

        {/* Sophisticated Timeline Entry */}
        <div className="space-y-6 sm:space-y-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="relative p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-[#141516] border border-white/10 shadow-2xl"
            >
              {/* Timeline Entry Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-mono text-xs text-accent font-bold uppercase tracking-widest">
                      {exp.type}
                    </span>
                    <span className="text-[#8A8275]">·</span>
                    <span className="font-mono text-xs text-[#8A8275] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-black text-cream uppercase tracking-tight">
                    {exp.role}
                  </h3>

                  <p className="mt-1 font-mono text-xs sm:text-sm text-[#9E988F]">
                    {exp.company}
                  </p>
                </div>

                <div className="font-mono text-xs text-accent font-semibold px-4 py-2 rounded-full bg-accent/10 border border-accent/20 w-fit">
                  {exp.period}
                </div>
              </div>

              {/* Responsibilities Grid */}
              <div className="py-6 sm:py-8 space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block">
                  Core Engineering Responsibilities
                </span>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3 text-xs sm:text-sm text-cream/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Strip */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-[#8A8275] uppercase me-2">
                  Tooling Applied:
                </span>
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md bg-surface border border-white/10 font-mono text-xs text-cream"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education & Certifications Grid (Prompt Sections 23 & 24) */}
        <div className="grid lg:grid-cols-12 gap-8 mt-8 sm:mt-10 pt-8 border-t border-white/10">
          
          {/* Compact Education Section (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-1">
                ACADEMICS
              </span>
              <h3 className="font-display font-bold text-2xl text-cream uppercase">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {EDUCATIONS.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 rounded-2xl bg-[#141516] border border-white/10 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-accent" />
                      <h4 className="font-display font-bold text-base sm:text-lg text-cream">
                        {edu.institution}
                      </h4>
                    </div>
                    <div className="font-mono text-xs text-[#9E988F]">
                      {edu.degree} · {edu.period}
                    </div>
                    <div className="text-xs text-[#8A8275] font-sans">
                      {edu.location}
                    </div>
                  </div>

                  <div className="font-mono text-xs font-bold text-accent px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 w-fit">
                    {edu.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications (5 cols, visually secondary) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-1">
                VERIFIED CREDENTIALS
              </span>
              <h3 className="font-display font-bold text-2xl text-cream uppercase">
                Certifications
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-[#141516] border border-white/10 space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-start justify-between gap-3 text-xs pb-3 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div className="space-y-0.5">
                    <div className="font-medium text-cream">{cert.title}</div>
                    <div className="font-mono text-[11px] text-[#8A8275]">{cert.issuer}</div>
                  </div>
                  <span className="font-mono text-xs text-accent font-semibold shrink-0">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
};
