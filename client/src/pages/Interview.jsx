import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  CheckCircle,
  Loader2,
  ChevronRight,
  RotateCcw,
  MessageSquare,
  Sparkles,
  Award,
  Zap,
  Code2,
  Terminal,
  Cpu,
  Database,
  Layers,
  Cloud,
  Brain,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, useToast } from "../components/ui/Toast";
import AtsScoreGauge from "../components/dashboard/AtsScoreGauge";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const roles = [
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    borderGlow: "group-hover:border-blue-500/50",
    desc: "React, Node.js, SQL, System Architecture",
  },
  {
    id: "frontend",
    title: "Frontend Engineer",
    icon: Layers,
    gradient: "from-cyan-500 to-teal-500",
    borderGlow: "group-hover:border-cyan-500/50",
    desc: "React, TypeScript, CSS Architecture, Web Performance",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    icon: Terminal,
    gradient: "from-purple-500 to-indigo-500",
    borderGlow: "group-hover:border-purple-500/50",
    desc: "Node.js, Python, Databases, REST & GraphQL APIs",
  },
  {
    id: "aiml",
    title: "AI / ML Engineer",
    icon: Brain,
    gradient: "from-pink-500 to-purple-500",
    borderGlow: "group-hover:border-pink-500/50",
    desc: "Python, PyTorch, Transformers, LLMs, Computer Vision",
  },
  {
    id: "data",
    title: "Data Analyst",
    icon: Database,
    gradient: "from-emerald-500 to-green-500",
    borderGlow: "group-hover:border-emerald-500/50",
    desc: "SQL, Python, Data Visualization, A/B Testing",
  },
  {
    id: "pm",
    title: "Product Manager",
    icon: Cpu,
    gradient: "from-amber-500 to-orange-500",
    borderGlow: "group-hover:border-amber-500/50",
    desc: "Product Strategy, Metrics, Specs, User Analytics",
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    icon: Cloud,
    gradient: "from-sky-500 to-blue-600",
    borderGlow: "group-hover:border-sky-500/50",
    desc: "Docker, Kubernetes, CI/CD Pipelines, AWS & Cloud",
  },
];

const difficulties = [
  { level: "Junior", label: "0-2 Years Exp", badge: "Entry Level" },
  { level: "Mid-Level", label: "2-5 Years Exp", badge: "Standard" },
  { level: "Senior", label: "5+ Years Exp", badge: "Advanced" },
];

function Interview() {
  const toast = useToast();

  // Wizard state: "setup" | "interview" | "evaluating" | "results"
  const [step, setStep] = useState("setup");

  // Setup options
  const [role, setRole] = useState("Full-Stack Developer");
  const [difficulty, setDifficulty] = useState("Mid-Level");
  const [questionCount, setQuestionCount] = useState(3);

  // Active interview state
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("");

  // Speech & Media state
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Results state
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (e) => {
        let transcript = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        setCurrentAnswer((prev) => (prev ? prev + " " + transcript : transcript));
      };

      rec.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setIsRecording(false);
        toast.error("Microphone error. You can type your answer instead.");
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, [toast]);

  // Start / Stop Speech Recording
  const toggleRecording = () => {
    if (!speechSupported) {
      toast.error("Speech Recognition is not supported in this browser. Please type your answer.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
        toast.info("Listening... Speak clearly into your microphone.");
      } catch (err) {
        console.error("Failed to start recording:", err);
      }
    }
  };

  // Text-to-Speech Question Reader
  const speakQuestion = (text) => {
    if (!("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Start Interview (Fetch Questions)
  const handleStart = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/interview/questions`, {
        role,
        difficulty,
        count: questionCount,
      });

      setQuestions(res.data.questions || []);
      setCurrentIdx(0);
      setAnswers({});
      setCurrentAnswer("");
      setStep("interview");

      if (res.data.questions?.[0]?.question) {
        setTimeout(() => speakQuestion(res.data.questions[0].question), 500);
      }
    } catch (err) {
      console.error("Failed to generate questions:", err);
      toast.error(
        err.response?.data?.message ||
          "Could not start interview. Make sure the server and Ollama are running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Next Question or Finish
  const handleNext = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const newAnswers = { ...answers, [currentIdx]: currentAnswer };
    setAnswers(newAnswers);

    if (currentIdx + 1 < questions.length) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setCurrentAnswer(newAnswers[nextIdx] || "");
      if (questions[nextIdx]?.question) {
        setTimeout(() => speakQuestion(questions[nextIdx].question), 300);
      }
    } else {
      submitInterview(newAnswers);
    }
  };

  // Submit Interview Transcript
  const submitInterview = async (finalAnswers) => {
    setStep("evaluating");
    try {
      const qaPairs = questions.map((q, idx) => ({
        id: q.id,
        category: q.category,
        question: q.question,
        answer: finalAnswers[idx] || "",
      }));

      const res = await axios.post(`${API_URL}/api/interview/evaluate`, {
        role,
        difficulty,
        qaPairs,
      });

      setEvaluation(res.data.evaluation);
      setStep("results");
      toast.success("Interview evaluation complete!");
    } catch (err) {
      console.error("Evaluation failed:", err);
      toast.error(
        err.response?.data?.message || "Failed to evaluate interview."
      );
      setStep("interview");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

      {/* Ambient Aurora Light Blobs */}
      <div className="aurora-blob-primary" style={{ top: "-150px", left: "-100px" }} />
      <div className="aurora-blob-secondary" style={{ top: "300px", right: "-150px" }} />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col justify-center relative z-10">
        {/* Step 1: Setup */}
        {step === "setup" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Zap size={14} className="text-blue-400" /> Interactive Voice Practice Engine
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                AI Mock{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Interview
                </span>
              </h1>
              <p className="text-slate-400 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                Practice technical & behavioral questions tailored to your target role. Speak your answers via microphone or type them in.
              </p>
            </div>

            {/* Setup Container */}
            <div className="glass-card rounded-3xl p-8 md:p-12 space-y-10">
              {/* Role Selection */}
              <div>
                <label className="text-sm font-black text-slate-200 uppercase tracking-wider block mb-5">
                  1. Choose Your Target Role
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const active = role === r.title;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setRole(r.title)}
                        className={`group p-6 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${
                          active
                            ? "border-blue-500 bg-gradient-to-br from-blue-500/15 to-purple-500/10 text-white shadow-xl shadow-blue-500/15"
                            : "border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-3">
                          <div
                            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center shadow-md ${
                              active ? "scale-110" : "group-hover:scale-105"
                            } transition-transform`}
                          >
                            <Icon size={22} className="text-white" />
                          </div>
                          {active && (
                            <span className="w-3 h-3 rounded-full bg-blue-400 shadow-sm shadow-blue-400 animate-pulse" />
                          )}
                        </div>

                        <div>
                          <span className={`text-lg font-bold block ${active ? "text-white" : "text-slate-200"}`}>
                            {r.title}
                          </span>
                          <span className="text-xs text-slate-400 block mt-1 leading-snug">
                            {r.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="text-sm font-black text-slate-200 uppercase tracking-wider block mb-5">
                  2. Select Experience Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {difficulties.map((d) => {
                    const active = difficulty === d.level;
                    return (
                      <button
                        key={d.level}
                        onClick={() => setDifficulty(d.level)}
                        className={`p-6 rounded-2xl text-left border transition-all duration-200 ${
                          active
                            ? "border-purple-500 bg-purple-500/15 text-white shadow-xl shadow-purple-500/15"
                            : "border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-lg font-bold ${active ? "text-purple-300" : "text-slate-200"}`}>
                            {d.level}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                            {d.badge}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block font-medium">
                          {d.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Count */}
              <div>
                <label className="text-sm font-black text-slate-200 uppercase tracking-wider block mb-5">
                  3. Select Session Duration
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { cnt: 3, time: "9 mins", desc: "3 Questions · Quick Practice" },
                    { cnt: 5, time: "15 mins", desc: "5 Questions · Comprehensive Assessment" },
                  ].map(({ cnt, time, desc }) => {
                    const active = questionCount === cnt;
                    return (
                      <button
                        key={cnt}
                        onClick={() => setQuestionCount(cnt)}
                        className={`p-6 rounded-2xl text-left border transition-all ${
                          active
                            ? "border-cyan-500 bg-cyan-500/15 text-white shadow-xl shadow-cyan-500/15"
                            : "border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-lg font-bold ${active ? "text-cyan-300" : "text-slate-200"}`}>
                            {cnt} Questions
                          </span>
                          <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                            ~{time}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block mt-1">
                          {desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleStart}
                disabled={loading}
                className="w-full py-5 rounded-2xl font-black text-xl text-white btn-primary-glow flex items-center justify-center gap-3 mt-8 disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    Generating Role-Specific Questions...
                  </>
                ) : (
                  <>
                    <Play size={24} />
                    Start Mock Interview Now
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Active Interview */}
        {step === "interview" && questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-sm text-slate-300 font-bold mb-3">
              <span>
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full uppercase tracking-wider">
                {questions[currentIdx]?.category} Question
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden mb-8 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-500"
                style={{
                  width: `${((currentIdx + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Card */}
            <div className="glass-card rounded-3xl p-8 md:p-10 mb-8 relative">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block mb-2">
                    {role} · {difficulty}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                    {questions[currentIdx]?.question}
                  </h2>
                </div>

                <button
                  onClick={() => speakQuestion(questions[currentIdx]?.question)}
                  className={`p-4 rounded-2xl border transition-all shrink-0 ${
                    isSpeaking
                      ? "border-blue-500 bg-blue-500/20 text-blue-400"
                      : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                  title="Read question aloud"
                >
                  {isSpeaking ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
            </div>

            {/* Answer Input Area */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={18} className="text-blue-400" />
                  Your Answer
                </label>

                {/* Mic Record Button */}
                <button
                  onClick={toggleRecording}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isRecording
                      ? "bg-red-500/20 border border-red-500/40 text-red-400 animate-pulse shadow-lg shadow-red-500/20"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  {isRecording ? "Stop Recording" : "Record Voice Answer"}
                </button>
              </div>

              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder={
                  isRecording
                    ? "Listening... Speak your answer into your microphone..."
                    : "Type your response or click Record Voice Answer above..."
                }
                className="w-full h-56 bg-slate-950/70 border border-slate-800 rounded-2xl p-6 text-base text-slate-100 placeholder-slate-600 resize-none focus:outline-none focus:border-blue-500/50 transition font-sans leading-relaxed"
              />
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-3 px-10 py-4.5 rounded-2xl font-black text-lg btn-primary-glow text-white"
              >
                {currentIdx + 1 === questions.length ? (
                  <>
                    Submit Interview
                    <CheckCircle size={22} />
                  </>
                ) : (
                  <>
                    Next Question
                    <ChevronRight size={22} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Evaluating Loading */}
        {step === "evaluating" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Loader2 size={64} className="animate-spin text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-black">Evaluating Your Responses...</h2>
            <p className="text-slate-400 mt-3 text-lg max-w-md mx-auto leading-relaxed">
              Evaluating technical accuracy, communication depth, and preparing actionable recommendations.
            </p>
          </motion.div>
        )}

        {/* Step 4: Results Scorecard */}
        {step === "results" && evaluation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8 max-w-6xl mx-auto"
          >
            {/* Top Scorecard Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AtsScoreGauge
                score={evaluation.overallScore}
                rating={`${evaluation.overallScore}/100 Overall Rating`}
              />

              <div className="lg:col-span-2 glass-card rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                    {role} Assessment
                  </span>
                  <h2 className="text-2xl font-black mt-1">Interview Summary</h2>
                  <p className="text-slate-200 text-base mt-4 leading-relaxed font-medium">
                    {evaluation.summary}
                  </p>
                </div>

                {/* Ratings Grid */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
                  <div className="text-center bg-slate-950/60 rounded-2xl p-4 border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Communication</span>
                    <span className="text-base font-black text-emerald-400">
                      {evaluation.communicationRating}
                    </span>
                  </div>
                  <div className="text-center bg-slate-950/60 rounded-2xl p-4 border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Technical</span>
                    <span className="text-base font-black text-blue-400">
                      {evaluation.technicalRating}
                    </span>
                  </div>
                  <div className="text-center bg-slate-950/60 rounded-2xl p-4 border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Confidence</span>
                    <span className="text-base font-black text-purple-400">
                      {evaluation.confidenceRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-base font-extrabold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award size={20} /> Strengths
                </h3>
                <ul className="space-y-3">
                  {evaluation.strengths?.map((s, idx) => (
                    <li key={idx} className="text-sm text-slate-200 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-base font-extrabold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles size={20} /> Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {evaluation.areasForImprovement?.map((a, idx) => (
                    <li key={idx} className="text-sm text-slate-200 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Per-Question Breakdown */}
            {evaluation.questionFeedback?.length > 0 && (
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-base font-extrabold text-slate-200 uppercase tracking-wider mb-6">
                  Detailed Question Feedback
                </h3>
                <div className="space-y-6">
                  {evaluation.questionFeedback.map((qf, i) => (
                    <div
                      key={i}
                      className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-blue-400">
                          Question {i + 1}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {qf.score}% Score
                        </span>
                      </div>
                      <p className="text-base font-bold text-slate-100 mb-3">
                        {qf.question}
                      </p>
                      <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                        {qf.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restart */}
            <div className="flex justify-center pt-6">
              <button
                onClick={() => {
                  setStep("setup");
                  setEvaluation(null);
                }}
                className="flex items-center gap-3 px-10 py-5 rounded-2xl btn-primary-glow text-base font-black"
              >
                <RotateCcw size={20} />
                Practice Another Role
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default Interview;
