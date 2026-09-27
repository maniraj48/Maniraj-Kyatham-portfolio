import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Server, Database, Brain, Container, CheckCircle2, ChevronRight, Terminal, Copy, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleCopyCode = () => {
    sounds.playClick();
    navigator.clipboard.writeText(services[activeTab].codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectTab = (idx: number) => {
    sounds.playClick();
    setActiveTab(idx);
    if (window.innerWidth < 1024 && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const services = [
    {
      id: '01',
      title: 'Full Stack & RESTful APIs',
      category: 'API ARCHITECTURE',
      icon: Server,
      description:
        'Architecting robust, asynchronous web backends and microservices built with Python 3.12 and FastAPI. Prioritizing strict Pydantic type safety, structured error handling, JWT auth, and interactive OpenAPI documentation.',
      deliverables: [
        'Asynchronous endpoint routing with sub-50ms TTFB',
        'Pydantic v2 data serialization & request validation',
        'Role-Based Access Control (RBAC) & OAuth2/JWT security',
        'Integration testing with Pytest and automated mocks',
      ],
      codeSnippet: `@app.get("/api/v1/metrics", response_model=SystemMetrics)
async def get_system_metrics(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_active_user)
) -> SystemMetrics:
    """Non-blocking metric aggregation with connection pooling."""
    cache_key = f"metrics:{current_user.tenant_id}"
    if cached := await redis_client.get(cache_key):
        return SystemMetrics.model_validate_json(cached)
        
    result = await db.execute(select(MetricRecord).filter_by(tenant_id=current_user.tenant_id))
    payload = aggregate_pipeline(result.scalars().all())
    await redis_client.setex(cache_key, 60, payload.model_dump_json())
    return payload`,
      language: 'python',
    },
    {
      id: '02',
      title: 'Database Engineering & SQL Optimization',
      category: 'DATA & STORAGE',
      icon: Database,
      description:
        'Designing clean, normalized relational schemas in PostgreSQL and SQLite. Tuning query latency down to sub-40ms through execution plan analysis (EXPLAIN ANALYZE), covering indexes, and eliminating costly sequential table scans.',
      deliverables: [
        'Strict 3NF relational schema design & integrity constraints',
        'Sub-40ms execution times via CTEs and window functions',
        'Targeted B-tree & partial index strategies',
        'Migration safety pipelines using Alembic / SQLAlchemy',
      ],
      codeSnippet: `-- Optimized Churn & Risk Metric CTE with covering index scan
WITH user_aggregate_stats AS (
    SELECT 
        u.id AS user_id,
        u.account_created_at,
        COUNT(a.id) AS total_actions_30d,
        COALESCE(SUM(t.amount_cents), 0) AS lifetime_value_cents,
        MAX(a.created_at) AS last_active_timestamp
    FROM users u
    LEFT JOIN user_actions a 
        ON u.id = a.user_id AND a.created_at >= NOW() - INTERVAL '30 days'
    LEFT JOIN transactions t 
        ON u.id = t.user_id AND t.status = 'settled'
    GROUP BY u.id
)
SELECT user_id, total_actions_30d, lifetime_value_cents
FROM user_aggregate_stats
WHERE total_actions_30d < 3 AND lifetime_value_cents > 50000;
-- Execution Time: 28.4ms (Indexed scan on ix_actions_user_created)`,
      language: 'sql',
    },
    {
      id: '03',
      title: 'Offline Machine Learning & Vector RAG',
      category: 'AI & INTELLIGENCE',
      icon: Brain,
      description:
        'Engineering end-to-end data pipelines and offline vector retrieval systems. Deploying local embeddings and semantic document search with ChromaDB and LangChain, alongside Scikit-Learn predictive modeling.',
      deliverables: [
        'Customer churn prediction pipelines using Random Forest & XGBoost',
        'Local document chunking & vector search with ChromaDB',
        'Zero-cloud privacy RAG pipelines with offline model weights',
        'Feature engineering with Pandas, NumPy, and Scikit-Learn',
      ],
      codeSnippet: `from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings

class OfflineKnowledgeEngine:
    def __init__(self, persist_dir: str = "./chroma_db"):
        self.embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")
        self.vectorstore = Chroma(
            persist_directory=persist_dir, 
            embedding_function=self.embeddings
        )

    def ingest_documents(self, documents: list[str]):
        splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=48)
        chunks = splitter.create_documents(documents)
        self.vectorstore.add_documents(chunks)

    def retrieve_context(self, query: str, top_k: int = 3) -> list[str]:
        results = self.vectorstore.similarity_search(query, k=top_k)
        return [doc.page_content for doc in results]`,
      language: 'python',
    },
    {
      id: '04',
      title: 'Dockerization & Systems Performance',
      category: 'DEVOPS & DEPLOYMENT',
      icon: Container,
      description:
        'Packaging services into lightweight, reproducible multi-stage Docker containers. Hardening Linux runtime environments, establishing CI/CD automation, and tuning Nginx reverse proxies for maximum uptime.',
      deliverables: [
        'Multi-stage Docker builds reducing image size by 70%+',
        'Automated CI/CD workflows for linting, testing, and deployment',
        'Nginx reverse proxy with gzip compression & TLS termination',
        'Health checks, container restart policies, and resource capping',
      ],
      codeSnippet: `# Multi-stage lightweight Python production image
FROM python:3.12-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.12-slim AS runner
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8000/health || exit 1
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]`,
      language: 'dockerfile',
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen bg-ink text-light pt-16 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-24 px-5 sm:px-8 md:px-12 lg:px-16 overflow-hidden relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some', margin: '0px 0px -40px 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        
        {/* Section Header matching aitezaz.xyz */}
        <div className="mb-10 sm:mb-14 md:mb-16">
          <div className="mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent block mb-2">
              // 02. CAPABILITIES
            </span>
            <h2
              className="font-display font-black uppercase tracking-tight leading-none text-[clamp(2.2rem,7vw,6.5rem)] text-cream"
              aria-label="WHAT i DO"
            >
              <span className="flex flex-wrap items-baseline gap-x-[0.24em]">
                <span>WHAT</span>
                <span className="serif-accent normal-case font-normal text-[1.06em] text-accent px-1">
                  i
                </span>
                <span>DO</span>
              </span>
            </h2>
            <div className="h-1 w-20 sm:w-24 origin-left bg-gradient-to-r from-accent to-transparent mt-2" />
          </div>

          <div className="grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-start-6 md:col-span-7">
              <p className="font-mono text-xs sm:text-sm text-warm uppercase tracking-wider leading-relaxed">
                A selection of engineering services and architectures I design, build, and deploy for production web applications.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selector & Detailed View */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Service Selector Buttons */}
          <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
            {services.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeTab === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(idx)}
                  className={`w-full text-left p-4 sm:p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99] min-h-[56px] ${
                    isSelected
                      ? 'bg-surface border-accent shadow-xl ring-1 ring-accent/30'
                      : 'bg-surface/40 border-white/10 hover:border-white/20 hover:bg-surface/70'
                  }`}
                >
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <span
                      className={`font-mono text-xs font-bold pt-0.5 sm:pt-1 ${
                        isSelected ? 'text-accent' : 'text-warm'
                      }`}
                    >
                      {item.id}
                    </span>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-warm block mb-0.5 sm:mb-1">
                        {item.category}
                      </span>
                      <h3
                        className={`text-sm sm:text-lg font-display font-bold leading-tight ${
                          isSelected ? 'text-cream' : 'text-gray-soft group-hover:text-cream'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform ${
                      isSelected
                        ? 'text-accent translate-x-1'
                        : 'text-warm/40 group-hover:text-warm'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Service Details & Code Window */}
          <div className="lg:col-span-7" ref={detailsRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface border border-white/15 space-y-6 shadow-2xl"
              >
                {/* Header of Active Service */}
                <div>
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-accent uppercase tracking-widest">
                    <span>STAGE {services[activeTab].id}</span>
                    <span>•</span>
                    <span>{services[activeTab].category}</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-display font-black text-cream">
                    {services[activeTab].title}
                  </h3>
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-gray-soft leading-relaxed">
                    {services[activeTab].description}
                  </p>
                </div>

                {/* Key Deliverables Checklist */}
                <div className="border-t border-b border-white/10 py-4 sm:py-5 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-warm block">
                    Core Engineering Deliverables
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {services[activeTab].deliverables.map((item, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-warm-light">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Code Window with Syntax Snippet */}
                <div className="rounded-xl sm:rounded-2xl bg-[#09090b] border border-white/10 overflow-hidden">
                  <div className="px-3.5 sm:px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shrink-0" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shrink-0" />
                      <span className="ms-1 sm:ms-2 font-mono text-[11px] text-warm flex items-center gap-1 truncate">
                        <Terminal className="w-3 h-3 text-accent shrink-0" />
                        <span className="truncate">implementation_preview.{services[activeTab].language}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 active:scale-95 text-[10px] font-mono text-cream transition-colors cursor-pointer"
                        title="Copy code snippet"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-warm-light" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                      <span className="font-mono text-[10px] uppercase text-accent font-semibold px-2 py-0.5 rounded bg-accent/15">
                        {services[activeTab].language}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 overflow-x-auto code-scroll">
                    <pre className="font-mono text-xs text-[#E8E4DE]/90 leading-relaxed">
                      <code>{services[activeTab].codeSnippet}</code>
                    </pre>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </motion.div>
    </section>
  );
};
