# 🚀 CareerPilot AI — Full-Stack AI Career Platform

> An end-to-end, privacy-focused AI career platform that provides ATS resume analysis, AI resume rewriting, job description matching, cover letter generation, and AI mock interviews — **100% free and powered by local AI (Ollama + Qwen3)**.

---

## ✨ Features

- 📄 **ATS Resume Analysis**: Upload PDF resumes to get instant ATS compatibility scores, strengths, weaknesses, missing skills, grammar issues, and formatting tips.
- 🎯 **Job Description Matching**: Compare your resume against any job posting to see match scores, shortlist probability, keyword coverage, and tailored recommendations.
- ✉️ **AI Cover Letter Generator**: Generate professional, role-targeted cover letters from your resume and job description in seconds.
- 🎙️ **AI Mock Interview** *(In progress)*: Practice role-specific interviews with real-time speech-to-text feedback.
- 🎨 **Modern SaaS UI**: Built with dark-mode aesthetic, glassmorphic cards, Framer Motion animations, interactive SVG gauges, and responsive layouts.
- 🔒 **100% Private & Local**: Powered by Ollama (`qwen3`). Your resume data never leaves your computer.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design System (Glassmorphism)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Drag & Drop**: `react-dropzone`

### Backend
- **Runtime**: Node.js + Express 5
- **PDF Extraction**: `pdf-parse`
- **File Uploads**: Multer (with auto file-cleanup)
- **AI Engine**: Ollama REST API (`qwen3` / `/no_think` structured JSON output) with OpenAI fallback

---

## 🚀 Quick Start

### Prerequisites
1. Install and start [Ollama](https://ollama.com):
   ```bash
   ollama serve
   ```
2. Pull the Qwen3 model:
   ```bash
   ollama pull qwen3
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/careerpilot-ai.git
   cd careerpilot-ai
   ```

2. Install root, client, and server dependencies:
   ```bash
   # Install client dependencies
   cd client && npm install

   # Install server dependencies
   cd ../server && npm install
   ```

3. Run the development server (starts client + backend concurrently):
   ```bash
   cd ..
   npm run dev
   ```

4. Open your browser:
   ```
   http://localhost:5173
   ```

---

## 📂 Project Structure

```text
ai-resume-analyzer/
├── dev.js                 # Concurrent dev runner (node index.js + vite)
├── package.json           # Root scripts
├── client/                # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI cards, gauges, navbar, footer
│   │   │   ├── dashboard/ # ATS gauge, skill chips, insight lists
│   │   │   └── ui/        # Toast notifications
│   │   ├── pages/         # Home, Upload, Dashboard, JobMatch, CoverLetter
│   │   ├── App.jsx        # React Router configuration
│   │   └── index.css      # Design tokens, glassmorphism, animations
├── server/                # Express 5 Backend
│   ├── controllers/       # Upload & Job Match controllers
│   ├── middleware/        # Multer file size & PDF validation
│   ├── routes/            # API endpoints (/api/upload, /api/job-match)
│   └── services/          # Ollama & OpenAI LLM integrations
```

---

## 🛡️ License

MIT License — free for personal and educational use.
