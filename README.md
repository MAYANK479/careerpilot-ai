# 🚀 CareerPilot AI — Full-Stack AI Career Platform & Co-Pilot

[![Vercel Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://careerpilot-ai-two-ebon.vercel.app/)
[![Tech Stack](https://img.shields.io/badge/React_19-Vite_8-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![Groq LLaMA 3.3](https://img.shields.io/badge/AI-Groq%20LLaMA%203.3%20%2F%20Ollama-f34f29?style=for-the-badge)](https://groq.com)

> An end-to-end, ultra-fast AI career co-pilot platform that provides **ATS resume analysis**, **tailored cover letter generation**, **job-to-resume matching**, **AI mock interviews**, and **custom career learning roadmaps** — powered by **Groq LLaMA 3.3 70B** and **Ollama**.

---

## 🌐 Live Demo

🚀 **[https://careerpilot-ai-two-ebon.vercel.app](https://careerpilot-ai-two-ebon.vercel.app/)**

---

## ✨ Core Features

- 📄 **ATS Resume Analysis**: Upload PDF resumes to get instant ATS compatibility scores, breakdown of technical skills, key strengths, critical gaps, formatting advice, and actionable feedback.
- 🎯 **Job Description Matching**: Match your resume text directly against target job descriptions to analyze shortlist probability, skill coverage, and keyword alignment.
- ✉️ **AI Cover Letter Generator**: Generate role-specific, impactful cover letters tailored to your profile and target companies in seconds.
- 🗣️ **Interactive AI Mock Interviews**: Practice real-time interactive technical and behavioral interview sessions with automated feedback.
- 🗺️ **Personalized Career Roadmaps**: Step-by-step skill progression plans with interactive completion tracking.
- 🔐 **Full Authentication**: User registration and login flow with personalized dashboard states.
- 🎨 **Modern Glassmorphism SaaS UI**: Built with dark-mode elegance, dynamic SVG gauges, interactive hover states, and smooth Framer Motion micro-animations.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework**: React 19 + Vite 8
- **Styling**: Modern CSS Design System (Custom Glassmorphism, CSS Variables, Dark Aesthetic)
- **Routing**: React Router v6
- **HTTP Client**: Axios (Cross-Origin CORS configured)
- **Icons**: Lucide React

### **Backend**
- **Runtime**: Node.js + Express 5
- **Parsing**: `pdf-parse` for text extraction from uploaded PDF resumes
- **File Uploads**: `multer` memory storage & handling
- **AI Integrations**: Groq Cloud REST API (`llama-3.3-70b-versatile`) with seamless local Ollama (`qwen3`) & OpenAI fallback support

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/MAYANK479/careerpilot-ai.git
cd careerpilot-ai
```

### 2. Environment Configuration
Create a `.env` file in the `server` directory (or use environment variables on Render):
```env
PORT=5002
AI_PROVIDER=openai
OPENAI_API_KEY=gsk_your_groq_api_key_here
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_MODEL=llama-3.3-70b-versatile
```

### 3. Install & Run Locally
```bash
# Install root, client, and server dependencies
npm run build

# Start the full-stack app in development mode
npm run dev
```

Visit `http://localhost:5173` to explore locally.

---

## 📂 Project Structure

```text
careerpilot-ai/
├── client/                # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/    # Navigation, Layouts, Gauges, Skill Chips
│   │   ├── pages/         # Dashboard, Upload, JobMatch, CoverLetter, Interview, Login, Register
│   │   ├── App.jsx        # App Routing
│   │   └── index.css      # Custom Design Tokens & Glassmorphism System
├── server/                # Express 5 Backend
│   ├── controllers/       # Auth, Upload, Job Match, Cover Letter, Interview Controllers
│   ├── routes/            # API Route definitions (/api/auth, /api/upload, /api/job-match, etc.)
│   └── services/          # Groq, OpenAI, and Ollama AI service handlers
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
