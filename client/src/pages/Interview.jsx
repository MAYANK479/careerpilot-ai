import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const roles = [
  { id: "fullstack", title: "Full-Stack Developer", icon: Code2, desc: "React, Node.js, SQL, System Architecture" },
  { id: "frontend", title: "Frontend Engineer", icon: Layers, desc: "React 19, TypeScript, CSS Architecture, Web Performance" },
  { id: "backend", title: "Backend Engineer", icon: Terminal, desc: "Node.js, Python, Databases, REST & GraphQL APIs" },
  { id: "aiml", title: "AI / ML Engineer", icon: Brain, desc: "Python, PyTorch, Transformers, LLMs, Computer Vision" },
  { id: "data", title: "Data Analyst", icon: Database, desc: "SQL, Python, Data Visualization, A/B Testing" },
  { id: "pm", title: "Product Manager", icon: Cpu, desc: "Product Strategy, Metrics, Specs, User Analytics" },
  { id: "devops", title: "DevOps Engineer", icon: Cloud, desc: "Docker, Kubernetes, CI/CD Pipelines, AWS & Cloud" },
];

const difficulties = [
  { level: "Junior", label: "0-2 Years Exp", badge: "Entry Level" },
  { level: "Mid-Level", label: "2-5 Years Exp", badge: "Standard" },
  { level: "Senior", label: "5+ Years Exp", badge: "Advanced" },
];

function Interview() {
  const toast = useToast();

  const [step, setStep] = useState("setup");
  const [role, setRole] = useState("Full-Stack Developer");
  const [difficulty, setDifficulty] = useState("Mid-Level");
  const [questionCount, setQuestionCount] = useState(3);

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
      toast.error(err.response?.data?.message || "Could not start interview.");
    } finally {
      setLoading(false);
    }
  };

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
      toast.error("Failed to evaluate interview.");
      setStep("interview");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12 flex flex-col justify-center">
        {step === "setup" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
                Voice AI Interviewer
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                AI Voice Mock Interview Simulator
              </h1>
              <p className="text-[#94A3B8] mt-4 text-base sm:text-lg">
                Practice technical & behavioral questions with real-time speech recognition, audio playback, and score analytics.
              </p>
            </div>

            <div className="saas-card p-8 sm:p-10 bg-[#111827] border border-slate-800 rounded-[24px] space-y-8">
              {/* Role Picker */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-4">
                  1. Choose Target Career Role
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const active = role === r.title;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setRole(r.title)}
                        className={`p-5 rounded-[20px] text-left border transition-all ${
                          active
                            ? "border-blue-500 bg-blue-500/10 text-white font-bold"
                            : "border-slate-800 bg-[#1E293B]/40 text-[#94A3B8] hover:bg-[#1E293B]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${active ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"}`}>
                            <Icon size={20} />
                          </div>
                          {active && <CheckCircle size={18} className="text-blue-400" />}
                        </div>
                        <span className="text-sm font-bold block text-white">{r.title}</span>
                        <span className="text-xs text-[#94A3B8] block mt-1">{r.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-4">
                  2. Select Experience Level
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {difficulties.map((d) => {
                    const active = difficulty === d.level;
                    return (
                      <button
                        key={d.level}
                        onClick={() => setDifficulty(d.level)}
                        className={`p-4 rounded-[20px] text-center border text-sm font-bold transition-all ${
                          active
                            ? "border-blue-500 bg-blue-500/10 text-white"
                            : "border-slate-800 bg-[#1E293B]/40 text-[#94A3B8] hover:bg-[#1E293B]"
                        }`}
                      >
                        <div>{d.level}</div>
                        <div className="text-xs font-normal text-[#94A3B8] mt-0.5">{d.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleStart}
                disabled={loading}
                className="w-full py-4 rounded-full font-bold text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Generating Role Questions...
                  </>
                ) : (
                  <>
                    <Play size={20} />
                    Start AI Voice Interview
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Active Interview */}
        {step === "interview" && questions.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-center text-xs font-bold text-[#94A3B8] mb-3">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                {questions[currentIdx]?.category}
              </span>
            </div>

            <div className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px] mb-6">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-xl font-bold text-white">
                  {questions[currentIdx]?.question}
                </h2>
                <button
                  onClick={() => speakQuestion(questions[currentIdx]?.question)}
                  className="p-3 rounded-xl bg-[#1E293B] text-slate-300 hover:bg-slate-700 shrink-0"
                >
                  <Volume2 size={20} />
                </button>
              </div>
            </div>

            <div className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px] mb-6">
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Speech Transcript</label>
                <button
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isRecording ? "bg-rose-500 text-white animate-pulse" : "bg-[#1E293B] text-white hover:bg-slate-700"
                  }`}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  {isRecording ? "Stop Recording" : "Record Voice Answer"}
                </button>
              </div>
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Speak into microphone or type your response here..."
                className="w-full h-48 p-5 rounded-2xl bg-[#030712] border border-slate-800 text-sm font-medium text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button onClick={handleNext} className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center gap-2">
                {currentIdx + 1 === questions.length ? "Submit Interview" : "Next Question"}
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {step === "results" && evaluation && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Evaluation Scorecard</span>
                <h2 className="text-3xl font-black text-white mt-3">Overall Score: {evaluation.overallScore}/100</h2>
                <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">{evaluation.summary}</p>
              </div>
              <button
                onClick={() => setStep("setup")}
                className="px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shrink-0 flex items-center gap-2"
              >
                <RotateCcw size={16} /> Practice Again
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Interview;
