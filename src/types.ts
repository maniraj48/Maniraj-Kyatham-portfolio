export interface ProjectArchitectureStep {
  label: string;
  sublabel?: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  title: string;
  year: string;
  tagline: string;
  description: string;
  visualLabel?: string;
  category: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  role: string;
  team?: string;
  metrics?: string;
  problemSolved: string;
  approach: string;
  whatManirajBuilt: string[];
  architectureSteps: ProjectArchitectureStep[];
  engineeringDetails: string[];
  keyFeatures: string[];
  engineeringResult: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
}

export interface SkillGroup {
  category: string;
  iconName?: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  score: string;
  period: string;
  location: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isOffline?: boolean;
}
