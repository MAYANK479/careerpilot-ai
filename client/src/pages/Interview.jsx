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
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, useToast } from "../components/ui/Toast";
import AtsScoreGauge from "../components/dashboard/AtsScoreGauge";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const roles = [
  { title: "Full-Stack Developer", desc: "React, Node.js, SQL, System Design" },
  { title: "Frontend Engineer", desc: "React, TypeScript, CSS, Web Performance" },
  { title: "Backend Engineer", desc: "Node.js, Python, Databases, API Design" },
  { title: "AI / ML Engineer", desc: "Python, PyTorch, LLMs, Computer Vision" },
  { title: "Data Analyst", desc: "SQL, Python, Visualization, Statistics" },
  { title: "Product Manager", desc: "Product Strategy, Metrics, User Stories" },
  { title: "DevOps Engineer", desc: "Docker, Kubernetes, CI/CD, Cloud" },
];

const difficulties = [
  { level: "Junior", label: "0-2 Years Exp" },
  { level: "Mid-Level", label: "2-5 Years Exp" },
  { level: "Senior", label: "5+ Years Exp" },
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex flex-col justify-center">
        {/* Step 1: Setup */}
        {step === "setup" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Zap size={14} /> Interactive Voice Practice
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                AI Mock{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Interview
                </span>
              </h1>
              <p className="text-slate-400 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Practice technical and behavioral interview questions with real-time AI feedback. Speak your answers aloud or type them in.
              </p>
            </div>

            {/* Main Form Container */}
            <div className="glass-strong rounded-3xl p-8 md:p-10 border border-slate-800 shadow-2xl space-y-8">
              {/* Role Selection */}
              <div>
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider block mb-4">
                  1. Select Target Role
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {roles.map((r) => {
                    const active = role === r.title;
                    return (
                      <button
                        key={r.title}
                        onClick={() => setRole(r.title)}
                        className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                          active
                            ? "border-blue-500 bg-blue-500/10 text-white shadow-lg shadow-blue-500/10"
                            : "border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        <span className={`text-base font-bold ${active ? "text-blue-400" : "text-slate-200"}`}>
                          {r.title}
                        </span>
                        <span className="text-xs text-slate-500 mt-1">
                          {r.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider block mb-4">
                  2. Experience Level
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {difficulties.map((d) => {
                    const active = difficulty === d.level;
                    return (
                      <button
                        key={d.level}
                        onClick={() => setDifficulty(d.level)}
                        className={`py-4 px-4 rounded-2xl text-center border transition-all ${
                          active
                            ? "border-purple-500 bg-purple-500/10 text-purple-300 shadow-lg shadow-purple-500/10"
                            : "border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        <span className="text-base font-bold block">{d.level}</span>
                        <span className="text-xs text-slate-500 block mt-0.5">{d.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Count */}
              <div>
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider block mb-4">
                  3. Interview Length
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[3, 5].map((cnt) => {
                    const active = questionCount === cnt;
                    return (
                      <button
                        key={cnt}
                        onClick={() => setQuestionCount(cnt)}
                        className={`py-4 rounded-2xl text-center border font-bold text-base transition-all ${
                          active
                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10"
                            : "border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        {cnt} Questions ({cnt * 3} mins)
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
                className="w-full py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    Generating Custom Questions...
                  </>
                ) : (
                  <>
                    <Play size={22} />
                    Start Mock Interview
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
            className="w-full max-w-4xl mx-auto"
          >
            {/* Progress Header */}
            <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
              <span className="font-semibold text-slate-300">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                {questions[currentIdx]?.category}
              </span>
            </div>

            <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-500"
                style={{
                  width: `${((currentIdx + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Card */}
            <div className="glass-strong rounded-3xl p-8 mb-6 border border-slate-800 shadow-xl relative">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {role} · {difficulty}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-3 leading-snug">
                    {questions[currentIdx]?.question}
                  </h2>
                </div>

                <button
                  onClick={() => speakQuestion(questions[currentIdx]?.question)}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSpeaking
                      ? "border-blue-500 bg-blue-500/20 text-blue-400"
                      : "border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                  title="Read question aloud"
                >
                  {isSpeaking ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
            </div>

            {/* Answer Input Area */}
            <div className="glass-strong rounded-3xl p-8 mb-6 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={16} className="text-blue-400" />
                  Your Answer
                </label>

                {/* Mic Record Button */}
                <button
                  onClick={toggleRecording}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isRecording
                      ? "bg-red-500/20 border border-red-500/40 text-red-400 animate-pulse"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  {isRecording ? "Stop Recording" : "Voice Input"}
                </button>
              </div>

              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder={
                  isRecording
                    ? "Listening... Speak your answer into your microphone..."
                    : "Type or use voice input to record your answer..."
                }
                className="w-full h-52 bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-base text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:border-blue-500/50 transition font-sans leading-relaxed"
              />
            </div>

            {/* Controls */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition shadow-xl shadow-blue-500/20"
              >
                {currentIdx + 1 === questions.length ? (
                  <>
                    Submit Interview
                    <CheckCircle size={20} />
                  </>
                ) : (
                  <>
                    Next Question
                    <ChevronRight size={20} />
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
            <Loader2 size={56} className="animate-spin text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-extrabold">Evaluating Your Interview...</h2>
            <p className="text-slate-400 mt-3 text-base max-w-md mx-auto leading-relaxed">
              Our AI is evaluating your response accuracy, communication depth, and preparing actionable feedback.
            </p>
          </motion.div>
        )}

        {/* Step 4: Results Scorecard */}
        {step === "results" && evaluation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8 max-w-5xl mx-auto"
          >
            {/* Top Scorecard Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AtsScoreGauge
                score={evaluation.overallScore}
                rating={`${evaluation.overallScore}/100 Overall`}
              />

              <div className="lg:col-span-2 glass-strong rounded-3xl p-8 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                    {role} Assessment
                  </span>
                  <h2 className="text-2xl font-extrabold mt-1">Interview Summary</h2>
                  <p className="text-slate-300 text-base mt-4 leading-relaxed">
                    {evaluation.summary}
                  </p>
                </div>

                {/* Ratings Grid */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
                  <div className="text-center bg-slate-900/60 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 uppercase font-bold block mb-1">Communication</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      {evaluation.communicationRating}
                    </span>
                  </div>
                  <div className="text-center bg-slate-900/60 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 uppercase font-bold block mb-1">Technical</span>
                    <span className="text-sm font-extrabold text-blue-400">
                      {evaluation.technicalRating}
                    </span>
                  </div>
                  <div className="text-center bg-slate-900/60 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 uppercase font-bold block mb-1">Confidence</span>
                    <span className="text-sm font-extrabold text-purple-400">
                      {evaluation.confidenceRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-3xl p-8 border border-slate-800">
                <h3 className="text-base font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award size={18} /> Strengths
                </h3>
                <ul className="space-y-3">
                  {evaluation.strengths?.map((s, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-strong rounded-3xl p-8 border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles size={18} /> Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {evaluation.areasForImprovement?.map((a, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Per-Question Breakdown */}
            {evaluation.questionFeedback?.length > 0 && (
              <div className="glass-strong rounded-3xl p-8 border border-slate-800">
                <h3 className="text-base font-bold text-slate-300 uppercase tracking-wider mb-6">
                  Detailed Question Feedback
                </h3>
                <div className="space-y-6">
                  {evaluation.questionFeedback.map((qf, i) => (
                    <div
                      key={i}
                      className="bg-slate-950/60 rounded-2xl p-6 border border-slate-800/80"
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
                className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-base font-bold shadow-xl shadow-blue-500/25"
              >
                <RotateCcw size={18} />
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
