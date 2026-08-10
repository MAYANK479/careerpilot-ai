# 🚀 CareerPilot AI — AI-Powered Career Co-Pilot

[![Vercel Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://careerpilot-ai-two-ebon.vercel.app/)
[![Build & Test](https://img.shields.io/badge/Build%20%26%20Test-Passing-success?style=for-the-badge&logo=node.js)](https://github.com/MAYANK479/careerpilot-ai)
[![Tech Stack](https://img.shields.io/badge/React_19-Vite_8-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![Groq LLaMA 3.3](https://img.shields.io/badge/AI-Groq%20LLaMA%203.3%20%2F%20Ollama-f34f29?style=for-the-badge)](https://groq.com)

> An AI-powered career platform that helps users analyze resumes, evaluate job fit, generate tailored cover letters, practice interviews, and build skill-development roadmaps.

---

## 🌐 Live Application
🔗 **[https://careerpilot-ai-two-ebon.vercel.app](https://careerpilot-ai-two-ebon.vercel.app/)**

---

## 🎯 Problem & Product Vision

### The Problem
Job applicants face high rejection rates due to automated **Applicant Tracking Systems (ATS)** filtering resumes before human review, generic un-tailored cover letters, and lack of real-time technical interview practice.

### The Solution
CareerPilot AI acts as a 24/7 personal career co-pilot. It ingests resume PDFs, extracts text via binary stream parsing, evaluates ATS compliance against target roles, matches candidate profiles to specific job postings, and generates formatted cover letters with instant PDF export options.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Client Layer (Vercel CDN)"]
        UI["React 19 + Vite 8 App"]
        Theme["Theme Switcher (Dark/Light)"]
        State["LocalStorage Session State"]
    end

    subgraph API ["Backend API Layer (Render Web Service)"]
        Express["Express 5 Server"]
        Multer["Multer PDF Stream Parser"]
        Auth["Auth Controller & Persistence"]
        CORS["Cross-Origin Resource Sharing"]
    end

    subgraph AI ["AI Engine Layer"]
        Groq["Groq Cloud REST API\n(LLaMA 3.3 70B Versatile)"]
        Ollama["Local Ollama Service\n(Qwen3 / Fallback)"]
    end

    UI -->|HTTP Requests / JSON| Express
    Express --> CORS
    Express --> Multer
    Express --> Auth
    Express -->|Structured JSON Prompt| Groq
    Express -.->|Local Inference| Ollama
```

---

## ✨ Core Product Features

| Module | Technical Capability | User Value |
| :--- | :--- | :--- |
| 📄 **ATS Resume Analysis** | `pdf-parse` binary stream extraction & LLM skill evaluation | Instant ATS score (0-100), critical gap analysis & formatting tips |
| 🎯 **Job Match Engine** | Vector keyword overlap & job posting criteria scoring | Shortlist probability & missing skill identification |
| ✉️ **Cover Letter Studio** | Dynamic prompt synthesis + HTML print-to-PDF pipeline | Custom cover letters exportable in both `.txt` and formatted `.pdf` |
| 🗣️ **Mock Interview AI** | Interactive prompt turn-taking & evaluation | Simulated role interviews with constructive feedback |
| 🗺️ **Career Roadmap** | Dynamic checklist generator & mastery progress | Step-by-step skill gap mitigation track |
| 🎨 **Design System** | Glassmorphism, CSS Variables, Theme Switcher | High-contrast dark SaaS aesthetic + light mode toggle |

---

## 📸 Screenshots

| Dashboard Overview | ATS Resume Scorer |
| :---: | :---: |
| <img src="./docs/screenshots/dashboard.png" width="400" alt="Dashboard Screenshot" /> | <img src="./docs/screenshots/ats-scorer.png" width="400" alt="ATS Scorer Screenshot" /> |
| **Job Match Engine** | **Cover Letter Studio** |
| <img src="./docs/screenshots/job-match.png" width="400" alt="Job Match Screenshot" /> | <img src="./docs/screenshots/cover-letter.png" width="400" alt="Cover Letter Screenshot" /> |
| **Mock Interview & Feedback** | **Career Roadmap** |
| <img src="./docs/screenshots/mock-interview.png" width="400" alt="Mock Interview Screenshot" /> | <img src="./docs/screenshots/career-roadmap.png" width="400" alt="Career Roadmap Screenshot" /> |

---

## 🧪 Testing & Quality Assurance

The codebase includes automated unit test suites covering data persistence and authentication logic using Node.js native test runner (`node:test`).

```bash
# Run backend test suite
npm test
```

### Sample Output:
```text
✔ DataStore user persistence test (0.72ms)
✔ Auth logic test - User registration structure validation (0.09ms)
ℹ tests 2 | pass 2 | fail 0
```

---

## 🚀 Quick Start (Local Setup)

### 1. Clone & Install
```bash
git clone https://github.com/MAYANK479/careerpilot-ai.git
cd careerpilot-ai
npm run build
```

### 2. Environment Setup
Create `.env` in `server/`:
```env
PORT=5002
AI_PROVIDER=openai
OPENAI_API_KEY=gsk_your_groq_api_key
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_MODEL=llama-3.3-70b-versatile
```

### 3. Run Development Server
```bash
npm run dev
# Opens frontend at http://localhost:5173 and backend at http://localhost:5002
```

---

## 📂 Project Structure

```text
careerpilot-ai/
├── vercel.json            # Vercel Single-Page-App routing rewrites
├── dev.js                 # Concurrent dev server runner
├── client/                # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/    # Navigation, Layouts, Gauges, Skill Chips, Toast
│   │   ├── pages/         # Dashboard, Upload, JobMatch, CoverLetter, Interview, Login, Register
│   │   ├── App.jsx        # React Router routes
│   │   └── index.css      # Custom Design System, Glassmorphism, Light/Dark themes
├── server/                # Express 5 Backend
│   ├── controllers/       # Auth, Upload, Job Match, Cover Letter, Interview Controllers
│   ├── tests/             # Automated test suite (api.test.js)
│   ├── routes/            # Express API endpoints
│   └── services/          # Groq, OpenAI & Ollama LLM handlers
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
