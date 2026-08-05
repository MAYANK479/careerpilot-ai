import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  CheckCircle,
  Loader2,
  Sparkles,
  Award,
  ChevronRight,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { ToastContainer, useToast } from "../components/ui/Toast";
import AtsScoreGauge from "../components/dashboard/AtsScoreGauge";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const roles = [
  "Full-Stack Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "AI / ML Engineer",
  "Data Analyst",
  "Product Manager",
  "DevOps Engineer",
];

const difficulties = ["Junior", "Mid-Level", "Senior"];

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

    // Save current answer
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
      // Submit for Evaluation
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800/50">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <h1 className="text-lg font-bold text-blue-400">AI Mock Interview</h1>
        <div className="w-20" />
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-4xl mx-auto w-full">
        {/* Step 1: Setup */}
        {step === "setup" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="text-center mb-10">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                Interactive Voice Practice
              </span>
              <h1 className="text-4xl font-extrabold mt-2">
                AI Mock{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Interview
                </span>
              </h1>
              <p className="text-slate-400 mt-3 max-w-lg mx-auto">
                Practice technical & behavioral interview questions. Answer
                using your microphone or keyboard, and get real-time AI feedback.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 space-y-6">
              {/* Role Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                  Select Target Role
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`px-4 py-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                        role === r
                          ? "border-blue-500 bg-blue-500/10 text-blue-400"
                          : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                  Difficulty Level
                </label>
                <div className="flex gap-3">
                  {difficulties.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`flex-1 py-3 rounded-xl text-xs font-semibold border transition-all ${
                        difficulty === d
                          ? "border-purple-500 bg-purple-500/10 text-purple-400"
                          : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                  Number of Questions
                </label>
                <div className="flex gap-3">
                  {[3, 5].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => setQuestionCount(cnt)}
                      className={`flex-1 py-3 rounded-xl text-xs font-semibold border transition-all ${
                        questionCount === cnt
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                          : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {cnt} Questions
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Start Interview
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Active Interview */}
        {step === "interview" && questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
              <span>
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-blue-400 font-semibold">
                {questions[currentIdx]?.category}
              </span>
            </div>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{
                  width: `${((currentIdx + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Card */}
            <div className="glass rounded-2xl p-8 mb-6 relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {role} · {difficulty}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2 leading-relaxed">
                    {questions[currentIdx]?.question}
                  </h2>
                </div>

                <button
                  onClick={() => speakQuestion(questions[currentIdx]?.question)}
                  className={`p-3 rounded-xl border transition ${
                    isSpeaking
                      ? "border-blue-500 bg-blue-500/20 text-blue-400"
                      : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                  }`}
                  title="Read question aloud"
                >
                  {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>

            {/* Answer Input Area */}
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={14} className="text-blue-400" />
                  Your Answer
                </label>

                {/* Mic Record Button */}
                <button
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isRecording
                      ? "bg-red-500/20 border border-red-500/40 text-red-400 animate-pulse"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                  {isRecording ? "Stop Recording" : "Voice Input"}
                </button>
              </div>

              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder={
                  isRecording
                    ? "Listening... Speak your answer now..."
                    : "Type or use microphone to record your answer..."
                }
                className="w-full h-44 bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:border-blue-500/50 transition font-sans"
              />
            </div>

            {/* Controls */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition shadow-lg shadow-blue-500/20"
              >
                {currentIdx + 1 === questions.length ? (
                  <>
                    Submit Interview
                    <CheckCircle size={16} />
                  </>
                ) : (
                  <>
                    Next Question
                    <ChevronRight size={16} />
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
            className="text-center py-20"
          >
            <Loader2 size={48} className="animate-spin text-blue-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold">Evaluating Your Answers...</h2>
            <p className="text-slate-400 mt-2 text-sm max-w-md mx-auto">
              Our AI is reviewing technical accuracy, communication style, and
              generating personalized recommendations.
            </p>
          </motion.div>
        )}

        {/* Step 4: Results Scorecard */}
        {step === "results" && evaluation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
          >
            {/* Top Scorecard Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AtsScoreGauge
                score={evaluation.overallScore}
                rating={`${evaluation.overallScore}/100 Overall`}
              />

              <div className="md:col-span-2 glass rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {role} Evaluation
                  </span>
                  <h2 className="text-xl font-bold mt-1">Assessment Summary</h2>
                  <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                    {evaluation.summary}
                  </p>
                </div>

                {/* Ratings Grid */}
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 uppercase block">Communication</span>
                    <span className="text-xs font-bold text-emerald-400">
                      {evaluation.communicationRating}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 uppercase block">Technical</span>
                    <span className="text-xs font-bold text-blue-400">
                      {evaluation.technicalRating}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 uppercase block">Confidence</span>
                    <span className="text-xs font-bold text-purple-400">
                      {evaluation.confidenceRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                  💪 Strengths
                </h3>
                <ul className="space-y-2">
                  {evaluation.strengths?.map((s, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                  🚀 Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {evaluation.areasForImprovement?.map((a, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Per-Question Breakdown */}
            {evaluation.questionFeedback?.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Question-by-Question Feedback
                </h3>
                <div className="space-y-4">
                  {evaluation.questionFeedback.map((qf, i) => (
                    <div
                      key={i}
                      className="bg-slate-950/50 rounded-xl p-4 border border-slate-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-blue-400">
                          Q{i + 1}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {qf.score}% Score
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 mb-2">
                        {qf.question}
                      </p>
                      <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                        {qf.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restart */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => {
                  setStep("setup");
                  setEvaluation(null);
                }}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-sm font-semibold shadow-lg shadow-blue-500/20"
              >
                <RotateCcw size={16} />
                Practice Another Role
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Interview;
