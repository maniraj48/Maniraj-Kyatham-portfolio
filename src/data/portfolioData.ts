import { Project, Experience, SkillGroup, Education, Certification } from '../types';

export const PERSONAL_INFO = {
  name: 'Maniraj Kyatham',
  role: 'Software Developer / AI & ML',
  statusLabel: 'FINAL-YEAR B.TECH • INFORMATION TECHNOLOGY',
  primaryPositioning: 'Software Developer building backend systems, APIs and AI-powered applications.',
  supportingLine: 'Python • Backend • REST APIs • Machine Learning',
  bio: `Final-year B.Tech Information Technology student at ACE Engineering College (CGPA 8.36). Builds software using Python, backend frameworks, REST APIs, databases, machine learning, and AI technologies. Project experience spans full-stack prediction platforms, backend APIs, database-driven systems, and offline AI applications with a focus on learning through implementation and building practical software.`,
  college: 'ACE Engineering College',
  degree: 'B.Tech — Information Technology',
  cgpa: '8.36',
  expectedGraduation: '2027',
  location: 'Hyderabad, India',
  email: 'manirajkyatham@gmail.com',
  phone: '+91 99494 47302',
  linkedin: 'https://linkedin.com/in/maniraj-kyatham',
  github: 'https://github.com/maniraj48',
  x: 'https://x.com/manirajk08',
  xHandle: '@manirajk08',
  photoUrl: '/maniraj-portrait.jpg'
};

export const PROJECTS: Project[] = [
  {
    id: 'subscription-churn-prediction',
    projectNumber: '01',
    title: 'Subscription Churn Prediction System',
    year: '2026',
    role: 'Product Owner + Developer',
    team: '5-member Agile team',
    tagline: 'FastAPI, React, SQLite, SQLAlchemy, Scikit-Learn | Full-Stack ML Prediction Platform',
    description:
      'A full-stack subscription churn prediction platform designed to identify customers at risk of cancellation and provide prediction, analytics, authentication, and reporting capabilities.',
    category: 'Full-Stack',
    tags: [
      'FastAPI',
      'React',
      'SQLite',
      'SQLAlchemy',
      'Scikit-Learn',
      'JWT',
      'REST APIs'
    ],
    githubUrl: 'https://github.com/maniraj48/Subscription-Churn-Prediction-System',
    metrics: 'Critical query execution time: ~270 ms → <40 ms',
    problemSolved:
      'Subscription businesses face silent revenue loss when customers cancel without warning. This system identifies at-risk subscribers before they churn by analyzing usage patterns, calculating churn probabilities, and equipping retention teams with automated analytics and exportable reports.',
    approach:
      'Designed a modular client-server architecture separating high-throughput prediction endpoints from the transactional reporting layer. Engineered asynchronous FastAPI routes with Pydantic validation schemas, integrated Scikit-Learn inference pipelines, and tuned the SQLite persistence layer with indexed views and recursive CTEs to eradicate full table scans.',
    whatManirajBuilt: [
      'Served as Product Owner and Developer in a five-member Agile team.',
      'Built modular FastAPI REST APIs for authentication, analytics, prediction, and reporting.',
      'Integrated React frontend with backend services.',
      'Implemented JWT authentication with secure session handling.',
      'Used SQLAlchemy for database operations and structured ORM models.',
      'Implemented machine-learning prediction workflows using Scikit-Learn.',
      'Implemented analytics and automated PDF and CSV report generation.',
      'Worked with SQLite and optimized database queries using indexed views and CTE-based queries.',
      'Cut critical query execution time from ~270 ms to under 40 ms.'
    ],
    architectureSteps: [
      { label: 'React Frontend', sublabel: 'Client dashboard & auth interface' },
      { label: 'FastAPI REST Gateway', sublabel: 'Async endpoints & JWT validation' },
      { label: 'ML Prediction Pipeline', sublabel: 'Scikit-Learn model inference' },
      { label: 'SQLAlchemy', sublabel: 'Structured ORM mapping' },
      { label: 'SQLite Database', sublabel: 'Indexed views & CTEs (<40ms)' }
    ],
    engineeringDetails: [
      'Engineered CTE-based analytical queries and indexed views to replace sequential table scans, cutting critical query execution time from ~270 ms to under 40 ms.',
      'Constructed asynchronous FastAPI endpoints with Pydantic data validation schemas and structured error handling.',
      'Implemented JWT-based authentication tokens with bcrypt password hashing.',
      'Automated PDF and CSV report generation for churn audits and business reviews directly from the data layer.'
    ],
    keyFeatures: [
      'FastAPI REST APIs for authentication, analytics, prediction, and reporting',
      'React frontend integrated with backend prediction endpoints',
      'JWT-based secure authentication and session management',
      'SQLAlchemy ORM operations and structured SQLite database design',
      'Machine-learning customer churn prediction workflows',
      'Optimized database queries with indexed views and CTEs (<40ms execution time)',
      'Automated PDF and CSV analytical report export'
    ],
    engineeringResult:
      'Critical SQL query execution time improved from ~270 ms to under 40 ms through the deployment of indexed materialized views and recursive CTE-based filtering. (Note: this verified metric applies specifically to critical database query execution, not whole-app round-trip time).',
    codeSnippet: {
      language: 'python',
      filename: 'api/prediction_router.py',
      code: `from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import pandas as pd
import joblib

router = APIRouter(prefix="/api/v1", tags=["Prediction"])
churn_model = joblib.load("models/churn_risk_pipeline.pkl")

@router.post("/predict", response_model=PredictionResponse)
async def predict_customer_churn(
    payload: CustomerFeatureSchema,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Prepare feature matrix for Scikit-Learn model inference
    features_df = pd.DataFrame([payload.model_dump()])
    churn_probability = float(churn_model.predict_proba(features_df)[0][1])
    
    # Persist prediction via optimized CTE query (<40ms latency)
    record_id = record_inference_telemetry(
        db=db,
        customer_id=payload.customer_id,
        probability=churn_probability
    )
    
    return {
        "customer_id": payload.customer_id,
        "churn_risk_score": round(churn_probability, 4),
        "risk_level": "HIGH" if churn_probability >= 0.65 else "LOW",
        "audit_record_id": record_id
    }`
    }
  },
  {
    id: 'knowledge-vault-ai',
    projectNumber: '02',
    title: 'Knowledge Vault AI',
    year: '2026',
    visualLabel: 'OFFLINE DOCUMENT INTELLIGENCE',
    role: 'Backend & Systems Developer',
    tagline: 'Python, Flask, REST API, LangChain, ChromaDB, SQLite | Offline Document Intelligence',
    description:
      'An offline document intelligence application enabling semantic search and question answering with source-aware responses.',
    category: 'AI / ML',
    tags: [
      'Python',
      'Flask',
      'REST API',
      'LangChain',
      'ChromaDB',
      'SQLite'
    ],
    githubUrl: 'https://github.com/maniraj48/Knowledge_Vault_AI',
    metrics: '100% offline document intelligence with zero external API calls',
    problemSolved:
      'Organizations handling confidential technical or legal documents cannot afford data leakage through third-party cloud AI APIs. Knowledge Vault AI enables local semantic search and question answering entirely offline on premises.',
    approach:
      'Engineered an isolated on-device retrieval pipeline using ChromaDB for local vector storage and LangChain for recursive document chunking. Developed a modular Flask REST backend with SQLite persistence to index documents and execute semantic similarity queries without transmitting data outside the host environment.',
    whatManirajBuilt: [
      'Built modular, reusable Flask REST APIs for document ingestion, retrieval, and QA.',
      'Integrated SQLite for session state, metadata, and chat history persistence.',
      'Integrated ChromaDB as a persistent local vector store.',
      'Used LangChain to coordinate document indexing, recursive chunking, and similarity search.',
      'Designed document indexing and semantic retrieval workflows with source attribution.',
      'Built reusable backend components structured for clean separation of concerns.',
      'Designed the entire system to run without external cloud APIs.'
    ],
    architectureSteps: [
      { label: 'Document Ingestion', sublabel: 'Local ingestion (PDF, TXT, Markdown)' },
      { label: 'Text Processing', sublabel: 'Recursive character text splitting' },
      { label: 'Embeddings', sublabel: 'Local vector representations' },
      { label: 'ChromaDB Vector Storage', sublabel: 'Persistent on-disk vector vault' },
      { label: 'Semantic Retrieval', sublabel: 'K-nearest neighbor similarity query' },
      { label: 'Source-Aware Answer', sublabel: 'Precise answer with source document citations' }
    ],
    engineeringDetails: [
      'Constructed a local vector retrieval pipeline using ChromaDB and LangChain embeddings without external API connections.',
      'Implemented recursive chunking with configurable overlap to preserve technical context across document boundaries.',
      'Structured Flask REST APIs into modular blueprints with clear request/response contracts.',
      'Designed source-attribution formatting that returns matching document snippets alongside answers for verifiable auditing.'
    ],
    keyFeatures: [
      'Document indexing and semantic chunking workflows',
      'Vector retrieval and similarity search powered by ChromaDB',
      'Question answering with verified source-aware citations',
      'Chat history and conversation state saved in SQLite',
      'Modular Flask REST API backend design',
      'Zero external cloud API dependencies for complete document privacy'
    ],
    engineeringResult:
      'Demonstrated reliable semantic search and question answering entirely offline on premises with zero telemetry or external API dependencies, ensuring absolute document privacy.',
    codeSnippet: {
      language: 'python',
      filename: 'engine/retrieval_service.py',
      code: `from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings

app = Flask(__name__)
embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")
vector_db = Chroma(persist_directory="./chroma_vault", embedding_function=embeddings)

@app.route("/api/v1/query", methods=["POST"])
def query_knowledge_vault():
    data = request.get_json() or {}
    user_query = data.get("query", "").strip()
    if not user_query:
        return jsonify({"error": "Query cannot be empty"}), 400

    # Retrieve semantically relevant passages
    matched_docs = vector_db.similarity_search(user_query, k=3)
    
    # Assemble source-aware answer with verified citations
    response_payload = {
        "query": user_query,
        "answer": synthesize_offline_response(user_query, matched_docs),
        "citations": [
            {
                "source_file": doc.metadata.get("source", "unknown"),
                "chunk_index": doc.metadata.get("chunk", 0),
                "excerpt": doc.page_content[:180] + "..."
            }
            for doc in matched_docs
        ]
    }
    return jsonify(response_payload)`
    }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-edunet',
    role: 'AI & Data Analytics Intern',
    company: 'Edunet Foundation (AICTE & Shell India)',
    period: 'October 2025 – November 2025',
    location: 'Remote',
    type: 'Internship',
    description:
      'Developed machine learning applications using Python, pandas, NumPy and scikit-learn.',
    responsibilities: [
      'Developed machine learning applications using Python, pandas, NumPy and scikit-learn.',
      'Performed data preprocessing.',
      'Worked on feature engineering.',
      'Developed and evaluated machine learning models.',
      'Tested solutions on real-world datasets.',
      'Collaborated with mentors and team members.',
      'Delivered project milestones.',
      'Documented implementation details.',
      'Presented project outcomes.'
    ],
    techStack: ['Python', 'pandas', 'NumPy', 'scikit-learn']
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'LANGUAGES',
    skills: ['Python', 'Java', 'SQL']
  },
  {
    category: 'BACKEND',
    skills: [
      'FastAPI',
      'Flask',
      'REST APIs',
      'Object-Oriented Programming',
      'Data Structures & Algorithms'
    ]
  },
  {
    category: 'FRONTEND',
    skills: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Material UI']
  },
  {
    category: 'DATABASES',
    skills: ['SQLite', 'PostgreSQL', 'SQLAlchemy', 'ChromaDB']
  },
  {
    category: 'AI / ML',
    skills: [
      'Scikit-Learn',
      'TensorFlow',
      'LangChain',
      'Hugging Face',
      'OpenCV',
      'SHAP'
    ]
  },
  {
    category: 'TOOLS',
    skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'Render']
  },
  {
    category: 'CONCEPTS',
    skills: [
      'Software Engineering',
      'DBMS',
      'Backend Development',
      'API Integration',
      'Agile Scrum',
      'Computer Vision',
      'NLP'
    ]
  }
];

export const EDUCATIONS: Education[] = [
  {
    id: 'edu-1',
    institution: 'ACE Engineering College',
    degree: 'B.Tech — Information Technology',
    score: 'CGPA: 8.36',
    period: '2023–2027',
    location: 'Hyderabad, Telangana'
  },
  {
    id: 'edu-2',
    institution: 'Raghava Laxmi Devi Govt. Junior College',
    degree: 'Intermediate — MPC',
    score: '95%',
    period: '2021–2023',
    location: 'Hyderabad, Telangana'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Principles of Generative AI',
    issuer: 'Infosys Springboard',
    year: '2026'
  },
  {
    id: 'cert-2',
    title: 'AI & Data Analytics',
    issuer: 'AICTE / Edunet Foundation / Shell India',
    year: '2025'
  },
  {
    id: 'cert-3',
    title: 'Python Essentials 1 & 2',
    issuer: 'Cisco',
    year: '2024'
  },
  {
    id: 'cert-4',
    title: 'Introduction to SQL',
    issuer: 'Simplilearn',
    year: '2024'
  },
  {
    id: 'cert-5',
    title: 'TCS iON Career Edge – Young Professional',
    issuer: 'TCS iON',
    year: '2024'
  }
];
