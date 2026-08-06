import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Mic,
  MicOff,
  Volume2,
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
import { ToastContainer, useToast } from "../components/ui/Toast";

const API_URL = import.meta.env.VITE_API_URL || "";

const roles = [
  { id: "fullstack", title: "Full-Stack Developer", icon: Code2, desc: "React, Node.js, SQL, System Architecture" },
  { id: "frontend", title: "Frontend Engineer", icon: Layers, desc: "React 19, TypeScript, CSS Architecture" },
  { id: "backend", title: "Backend Engineer", icon: Terminal, desc: "Node.js, Python, Databases, REST APIs" },
  { id: "aiml", title: "AI / ML Engineer", icon: Brain, desc: "Python, PyTorch, Transformers, LLMs" },
  { id: "data", title: "Data Analyst", icon: Database, desc: "SQL, Python, Data Visualization" },
  { id: "pm", title: "Product Manager", icon: Cpu, desc: "Product Strategy, Metrics, User Analytics" },
  { id: "devops", title: "DevOps Engineer", icon: Cloud, desc: "Docker, Kubernetes, CI/CD, AWS" },
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
    <div>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
      
      {step === "setup" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="section-header">
            <h1 className="section-title">AI Voice Mock Interview Simulator</h1>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Practice technical & behavioral questions with real-time speech recognition, audio playback, and score analytics.
          </p>

          <div className="stat-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Role Picker */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                1. Choose Target Career Role
              </label>
              <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {roles.map((r) => {
                  const Icon = r.icon;
                  const active = role === r.title;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.title)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-sm)',
                        background: active ? 'rgba(99, 102, 241, 0.1)' : 'var(--input-bg)',
                        border: `1px solid ${active ? 'var(--primary)' : 'var(--input-border)'}`,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: active ? 'var(--primary)' : 'rgba(100, 116, 139, 0.2)', color: active ? 'var(--primary-text)' : 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={20} />
                        </div>
                        {active && <CheckCircle size={18} color="var(--primary)" />}
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: active ? 'var(--text-main)' : 'var(--text-light)' }}>{r.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experience Level */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                2. Select Experience Level
              </label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {difficulties.map((d) => {
                  const active = difficulty === d.level;
                  return (
                    <button
                      key={d.level}
                      onClick={() => setDifficulty(d.level)}
                      style={{
                        flex: '1',
                        minWidth: '150px',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: active ? 'rgba(99, 102, 241, 0.1)' : 'var(--input-bg)',
                        border: `1px solid ${active ? 'var(--primary)' : 'var(--input-border)'}`,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', color: active ? 'var(--text-main)' : 'var(--text-light)' }}>{d.level}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{d.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem' }}
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>Question {currentIdx + 1} of {questions.length}</span>
            <span className="brand-badge" style={{ marginBottom: 0 }}>
              {questions[currentIdx]?.category}
            </span>
          </div>

          <div className="stat-card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: '1.4' }}>
              {questions[currentIdx]?.question}
            </h2>
            <button
              onClick={() => speakQuestion(questions[currentIdx]?.question)}
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--input-bg)', color: 'var(--text-light)', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            >
              <Volume2 size={20} />
            </button>
          </div>

          <div className="stat-card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase' }}>Your Speech Transcript</label>
              <button
                onClick={toggleRecording}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', border: 'none',
                  background: isRecording ? 'var(--danger)' : 'var(--input-bg)',
                  color: isRecording ? '#fff' : 'var(--text-main)',
                  animation: isRecording ? 'pulse 2s infinite' : 'none'
                }}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                {isRecording ? "Stop Recording" : "Record Voice Answer"}
              </button>
            </div>
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Speak into microphone or type your response here..."
              className="form-input"
              style={{ minHeight: '150px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleNext} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'auto' }}>
              {currentIdx + 1 === questions.length ? "Submit Interview" : "Next Question"}
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Evaluating State */}
      {step === "evaluating" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card" style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '3rem 2rem' }}>
          <Loader2 size={48} color="var(--primary)" style={{ margin: '0 auto 1.5rem auto', animation: 'spin 1s linear infinite' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Evaluating your responses...</h2>
          <p style={{ color: 'var(--text-muted)' }}>Our AI is scoring your answers against top-tier expectations for {role}.</p>
        </motion.div>
      )}

      {/* Results */}
      {step === "results" && evaluation && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="brand-badge">Evaluation Scorecard</span>
                <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '0.5rem' }}>Overall Score: {evaluation.overallScore}/100</h2>
              </div>
              <button
                onClick={() => setStep("setup")}
                className="btn-primary"
                style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <RotateCcw size={16} /> Practice Again
              </button>
            </div>
            
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{evaluation.summary}</p>
            
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem' }}>Question Feedback</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {evaluation.qaFeedback?.map((feedback, idx) => (
                  <div key={idx} style={{ padding: '1.5rem', background: 'var(--card-bg-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--input-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h4 style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Q{idx + 1}: {feedback.question}</h4>
                      <span style={{ fontWeight: 'bold', color: feedback.score >= 80 ? 'var(--success)' : feedback.score >= 60 ? 'var(--primary)' : 'var(--danger)' }}>
                        {feedback.score}/100
                      </span>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Your Answer:</p>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{feedback.answer}"</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Feedback:</p>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{feedback.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Interview;
