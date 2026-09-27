# Maniraj Kyatham — Interactive Software Engineering Portfolio

A modern, high-performance developer portfolio and personal intelligence platform built for **Maniraj Kyatham**, a B.Tech IT Graduate & Python / REST API Developer specializing in **FastAPI, Flask, SQL Query Optimization, and Machine Learning Platform Engineering**.

Designed with inspiration from [midu.design](https://midu.design/) — featuring deep dark bases (`#050505`), vibrant crimson-red micro-accents (`#FF2E4D`), frosted floating island navigation, 3D card-tilt bento showcases, and a phased engineering workflow module.

---

## 🚀 Key Highlights & Features

- **🔴 Midu-Inspired Dark Aesthetic**: Deep obsidian canvas (`#050505`), high-contrast display typography, ambient radial glow, and crimson-red micro-accents (`#FF2E4D`).
- **🏝️ Floating Island Navigation**: Top navigation pill with frosted backdrop blur, active section indicators, synthetic sound effects, and quick AI modal trigger.
- **✨ Cinematic Hero**: Bold Syne display typography, live availability status tag, interactive capability cards, and an instant PDF resume generator.
- **🍱 Bento Grid Project Showcase**: Immersive interactive project cards with mouse card-tilt effects, glow borders on hover, tech stack tags, and modal deep-dives.
- **🔄 Interactive Phased Engineering Workflow**: A 4-stage engineering lifecycle module (Architecture & Schemas, Core API Engineering, ML Inference & Pipeline, Testing & Deployment) showcasing real architectural decisions.
- **🤖 AI Portfolio Assistant**: Integrated Gemini-powered AI chat agent to answer questions about Maniraj's background, projects, skills, and availability.
- **🎓 Academic & Certifications Grid**: Highlights B.Tech IT academic records (CGPA 8.36/10) and verified credentials.
- **📬 Interactive Contact Module**: Instant message dispatch system with custom toast alerts and quick copy buttons.

---

## 🛠 Tech Stack & Architecture

### **Frontend**
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Sound**: Web Audio API synthesized micro-interactions

### **Backend & APIs**
- **Server**: [Express.js](https://expressjs.com/) (Node.js)
- **Runtime**: `tsx` for direct TypeScript execution in development
- **Bundler**: `esbuild` for single-file CommonJS production builds (`dist/server.cjs`)
- **AI Integration**: [@google/genai](https://www.npmjs.com/package/@google/genai) SDK (`gemini-2.5-flash`)

---

## 📂 Project Directory Structure

```
├── server.ts                     # Full-stack Express backend server & Vite middleware
├── index.html                    # HTML entry point
├── package.json                  # Project scripts and dependencies
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript compiler settings
├── .env.example                  # Environment variables template
├── README.md                     # Project documentation & local setup instructions
└── src/
    ├── main.tsx                  # React application entry point
    ├── App.tsx                   # Main component & layout orchestration
    ├── index.css                 # Tailwind CSS global styles
    ├── types.ts                  # Shared TypeScript interfaces
    ├── components/
    │   ├── Header.tsx            # Floating island navigation with sound effects
    │   ├── Hero.tsx              # Cinematic hero section with resume generator
    │   ├── Projects.tsx          # Bento grid project cards & deep-dive modal
    │   ├── EngineeringWorkflow.tsx # Phased engineering lifecycle showcase
    │   ├── Experience.tsx        # Experience timeline & education/certifications
    │   ├── Skills.tsx            # Technical skills matrix & proficiencies
    │   ├── ContactSection.tsx    # Contact form & social connections
    │   ├── AIAssistantModal.tsx  # Gemini-powered portfolio intelligence chat
    │   ├── Toast.tsx             # Interactive toast notification alerts
    │   └── Footer.tsx            # System operational status & footer links
    ├── data/
    │   └── portfolioData.ts      # Personal info, project details, skills & timeline
    └── utils/
        └── soundEffects.ts       # Web Audio API sound effect synthesis
```

---

## 💻 How to Run Locally

Follow these step-by-step instructions to get the project running on your local development machine:

### **1. Prerequisites**
Ensure you have the following installed on your system:
- **Node.js** (v18.0.0 or higher recommended) — [Download Node.js](https://nodejs.org/)
- **npm** (v9.0.0 or higher, comes bundled with Node.js)
- **Git** — [Download Git](https://git-scm.com/)

---

### **2. Clone or Download the Repository**
```bash
git clone https://github.com/maniraj48/portfolio.git
cd portfolio
```

---

### **3. Install Project Dependencies**
Install all required Node.js dependencies using `npm`:
```bash
npm install
```

---

### **4. Environment Variables Setup**
1. Copy `.env.example` to create a local `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set your optional Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   *(Note: The portfolio application will seamlessly run in offline/fallback mode if `GEMINI_API_KEY` is not supplied.)*

---

### **5. Start Development Server**
Launch the development server with hot-reload support:
```bash
npm run dev
```

The Express backend and Vite development middleware will boot up on **port 3000**:
```
Server running on port 3000
```
Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

### **6. Build for Production**
To generate a fully bundled, production-ready release:

1. **Compile & Bundle**:
   ```bash
   npm run build
   ```
   This compiles the frontend assets into `dist/` and bundles `server.ts` into a standalone Node CommonJS file (`dist/server.cjs`).

2. **Start Production Server**:
   ```bash
   npm start
   ```

3. **Verify Production Build**:
   Navigate to `http://localhost:3000` to verify the production app running cleanly.

---

## 📜 NPM Scripts Overview

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches the server in development mode using `tsx` on port 3000 |
| `npm run build` | Builds the Vite frontend and bundles `server.ts` into `dist/server.cjs` |
| `npm start` | Launches the production server using `node dist/server.cjs` |
| `npm run lint` | Runs `tsc --noEmit` to verify type safety across the project |
| `npm run clean` | Removes build artifacts (`dist` folder) |

---

## 👤 Developer Contact & Profiles

- **Developer**: Maniraj Kyatham
- **Email**: [manirajkyatham@gmail.com](mailto:manirajkyatham@gmail.com)
- **Phone**: +91 7671822839
- **GitHub**: [github.com/maniraj48](https://github.com/maniraj48)
- **LeetCode**: [leetcode.com/u/maniraj48](https://leetcode.com/u/maniraj48)
- **LinkedIn**: [linkedin.com/in/maniraj-kyatham](https://linkedin.com/in/maniraj-kyatham)

---

© 2026 Maniraj Kyatham. Built with React, TypeScript & Tailwind CSS.
