import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_GROUPS, EDUCATIONS, CERTIFICATIONS } from '../data/portfolioData';

/**
 * 100% Self-Contained Offline Portfolio Intelligence Engine.
 * Operates with ZERO external APIs, ZERO tokens, and ZERO API keys required.
 * Provides instant (<2ms) answers about Maniraj's projects, skills, education,
 * work experience, contact details, and hiring availability.
 */
export function getOfflineAssistantReply(rawQuery: string): string {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return "I'm Maniraj's Assistant. You can ask me about his software projects, technical skills (Python, FastAPI, SQL), education, or how to contact him!";
  }

  const q = rawQuery.toLowerCase().trim();

  // 1. Greetings & Identity
  if (/^(hi|hello|hey|greetings|howdy|sup|hola|yo)\b/i.test(q) || q === 'hi' || q === 'hello') {
    return `Hello! I am Maniraj Kyatham's Portfolio Assistant (running 100% locally with zero external API dependencies). 

I can answer questions about:
• **Projects**: Subscription Churn Prediction (<40ms query optimization) & Knowledge Vault AI (offline document intelligence).
• **Skills**: Python, FastAPI, Flask, SQL, PostgreSQL, SQLite, Machine Learning.
• **Education & Experience**: ACE Engineering College (CGPA 8.36) and AI Internship at Edunet / Shell.
• **Contact & Hiring**: Email, LinkedIn, GitHub, X (@manirajk08), and full-time role availability.

What would you like to know about Maniraj?`;
  }

  if (/\b(who are you|what are you|what can you do|your role|help me)\b/i.test(q)) {
    return `I am an embedded, local AI Assistant built directly into Maniraj Kyatham's portfolio. I don't rely on any third-party or external paid APIs — all of Maniraj's verified resume, project architecture details, and skills are built directly into this portfolio!

Feel free to ask me:
1. "Tell me about his Subscription Churn project."
2. "What are his core technical skills?"
3. "Is Maniraj available for hire?"
4. "How do I contact him directly?"`;
  }

  // 2. Hiring & Job Availability
  if (/\b(hire|hiring|available|availability|job|opportunity|looking for|full-time|internship|roles|work with|notice period|start date)\b/i.test(q)) {
    return `Yes! Maniraj Kyatham is actively available for **Software Engineering, Backend Developer, and AI/ML Developer** roles.

Key highlights for hiring managers:
• **Degree**: Final-year B.Tech in Information Technology from ACE Engineering College (2027 graduate, CGPA: ${PERSONAL_INFO.cgpa}).
• **Focus**: Backend architectures (FastAPI, Flask, REST APIs), relational databases (SQL performance tuning, CTEs, indexing), and machine learning applications.
• **Work Style**: Production-oriented, proactive Agile collaborator (Product Owner & Developer experience), with a passion for writing clean, tested, and performant code.
• **Location**: Based in Hyderabad, India (open to Hyderabad, on-site, hybrid, and remote opportunities).

You can connect with him directly at **${PERSONAL_INFO.email}** or via **X (${PERSONAL_INFO.xHandle})**!`;
  }

  // 3. Contact Details & Socials (including X)
  if (/\b(contact|email|phone|reach|message|talk|call|x|twitter|linkedin|github|social|handles|address|location|where)\b/i.test(q)) {
    return `Here is how you can contact Maniraj Kyatham directly:

• **Email**: ${PERSONAL_INFO.email}
• **Phone**: ${PERSONAL_INFO.phone}
• **X (Twitter)**: [${PERSONAL_INFO.xHandle}](${PERSONAL_INFO.x})
• **LinkedIn**: [linkedin.com/in/maniraj-kyatham](${PERSONAL_INFO.linkedin})
• **GitHub**: [github.com/maniraj48](${PERSONAL_INFO.github})
• **Location**: ${PERSONAL_INFO.location}, Telangana, India

You can also use the **Send a Message** form in the Contact section to dispatch a message directly to him!`;
  }

  // 4. Projects: Subscription Churn Prediction System
  if (/\b(churn|subscription|sub-40ms|query optimization|cte|indexed views|fastapi.*project|scikit-learn.*project)\b/i.test(q)) {
    const proj = PROJECTS[0];
    return `### **${proj.title}** (${proj.year})
**Role:** ${proj.role} (${proj.team})
**Tech Stack:** ${proj.tags.join(', ')}

**Key Engineering Achievements:**
• **SQL Performance Optimization**: Tuned SQLite and SQLAlchemy queries using recursive CTEs and indexed views, cutting critical query response time from **~270 ms to <40 ms** (an 85%+ latency reduction!).
• **Backend Architecture**: Engineered modular FastAPI REST APIs with asynchronous routes, Pydantic validation, and JWT-authenticated session security.
• **ML Inference**: Integrated Scikit-Learn pipelines to calculate churn probabilities in real time.
• **Reporting**: Built automated analytical workflows with exportable PDF and CSV reports for customer retention teams.
• **Repository**: [GitHub Link](${proj.githubUrl})`;
  }

  // 5. Projects: Knowledge Vault AI
  if (/\b(knowledge vault|vault|document|offline ai|rag|semantic search|chromadb|langchain|flask.*project)\b/i.test(q)) {
    const proj = PROJECTS[1];
    return `### **${proj.title}** (${proj.year})
**Role:** ${proj.role}
**Tech Stack:** ${proj.tags.join(', ')}

**Key Engineering Highlights:**
• **Zero External API Dependency**: Engineered a completely self-hosted, offline document intelligence system for semantic search and Q&A without sending sensitive documents to external cloud APIs.
• **Modular Backend**: Built reusable Flask REST APIs orchestrating local vector retrieval with ChromaDB and LangChain.
• **Context-Aware Responses**: Implemented source-aware citation tracking and local query history persistence backed by SQLite.
• **Repository**: [GitHub Link](${proj.githubUrl})`;
  }

  // 6. General Projects
  if (/\b(project|projects|built|portfolio|work|github repos|case stud)\b/i.test(q)) {
    return `Maniraj has built two featured engineering projects:

1. **Subscription Churn Prediction Platform** (FastAPI, React, SQLite, SQLAlchemy, Scikit-Learn):
   - Full-stack prediction platform with JWT auth and analytics.
   - Reduced database query execution time from **~270ms to under 40ms** using indexed views and recursive CTEs.

2. **Knowledge Vault AI** (Python, Flask, LangChain, ChromaDB, SQLite):
   - 100% offline document QA and semantic search engine requiring zero external APIs.
   - Vector indexing and source-attributed responses.

Both projects are documented with live code snippets and architecture diagrams in the Projects section above!`;
  }

  // 7. Technical Skills & Languages
  if (/\b(skill|skills|stack|technolog|language|languages|python|java|sql|fastapi|flask|react|docker|git|database|databases|postgres|sqlite|machine learning|ml|ai)\b/i.test(q)) {
    return `Maniraj Kyatham's Technical Skillset:

• **Languages**: Python (Primary), Java, SQL, TypeScript/JavaScript.
• **Backend & Web**: FastAPI, Flask, REST API Architecture, SQLAlchemy ORM, React.js.
• **Databases**: SQLite, PostgreSQL, ChromaDB (Vector DB), Relational Schema Design, Query Tuning & CTEs.
• **AI & Machine Learning**: Scikit-Learn, TensorFlow, LangChain, Hugging Face, OpenCV, SHAP, Feature Engineering.
• **Tools & Platforms**: Git, GitHub, Docker, VS Code, Linux, Render.
• **Engineering Fundamentals**: Data Structures & Algorithms, Object-Oriented Programming (OOP), DBMS, Agile/Scrum.`;
  }

  // 8. Education & College
  if (/\b(education|college|university|degree|b\.?tech|btech|school|cgpa|gpa|marks|grades|ace)\b/i.test(q)) {
    return `### Education Background:

1. **B.Tech in Information Technology (2023 – 2027)**
   • **Institution**: ACE Engineering College, Hyderabad
   • **CGPA**: **${PERSONAL_INFO.cgpa} / 10.0**
   • **Coursework**: Data Structures, Database Systems, Computer Networks, Software Engineering, AI/ML.

2. **Intermediate (MPC) (2021 – 2023)**
   • **Institution**: Raghava Laxmi Devi Govt. Junior College, Hyderabad
   • **Score**: **95%**`;
  }

  // 9. Work Experience & Internships
  if (/\b(experience|intern|internship|edunet|shell|aicte|work history|job experience)\b/i.test(q)) {
    const exp = EXPERIENCES[0];
    return `### **${exp.role}** at **${exp.company}**
**Period:** ${exp.period} (${exp.type})
**Tech Stack:** ${exp.techStack.join(', ')}

**Key Responsibilities & Achievements:**
• Built machine learning pipelines using Python, pandas, NumPy, and Scikit-Learn.
• Performed dataset preprocessing, feature engineering, and model evaluation metrics.
• Collaborated in a cross-functional team under mentor guidance to deliver real-world analytics milestones.`;
  }

  // 10. Resume / CV
  if (/\b(resume|cv|curriculum vitae|download|pdf)\b/i.test(q)) {
    return `You can view and inspect Maniraj's complete resume right on this website!
• Click the **"VIEW RESUME"** button in the top navigation or scroll to Section 04.
• The modal includes an ATS-optimized summary, detailed education, internships, certifications, and an instant **Download PDF** action.`;
  }

  // 11. Certifications
  if (/\b(certif|credentials|licens|infosys|cisco|simplilearn|tcs)\b/i.test(q)) {
    return `Maniraj holds verified professional certifications:
1. **Principles of Generative AI** — Infosys Springboard (2026)
2. **AI & Data Analytics** — AICTE / Edunet Foundation / Shell India (2025)
3. **Python Essentials 1 & 2** — Cisco Networking Academy (2024)
4. **Introduction to SQL** — Simplilearn (2024)
5. **Career Edge – Young Professional** — TCS iON (2024)`;
  }

  // 12. Why Hire Maniraj / Strengths
  if (/\b(why hire|strength|stand out|best quality|about maniraj|summary|background)\b/i.test(q)) {
    return `Why hire Maniraj Kyatham?
• **Practical Engineering**: He doesn't just write scripts—he designs robust REST APIs (FastAPI/Flask) and tackles real backend bottlenecks (like reducing SQL execution time from 270ms to <40ms).
• **AI + Backend Synergy**: Combines core backend reliability with modern AI/ML workflows (Scikit-Learn, LangChain, local vector search).
• **High Academic Rigor**: Consistent high achiever with an 8.36 CGPA in Information Technology.
• **Strong Communicator**: Experienced Agile Product Owner and team developer.`;
  }

  // 13. General Fallback with Contextual Guidance
  return `Maniraj Kyatham is a Software Developer & Final-Year B.Tech IT student at ACE Engineering College (CGPA 8.36) specializing in Python, FastAPI, SQL query optimization (<40ms), and Machine Learning systems.

Here are a few quick topics you can ask me about:
• **"Tell me about the Subscription Churn system"**
• **"What backend & database technologies does he know?"**
• **"What was his role in the Edunet/Shell internship?"**
• **"How do I reach out to hire Maniraj?"**`;
}
