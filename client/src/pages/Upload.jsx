import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Upload as UploadIcon,
  FileText,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, useToast } from "../components/ui/Toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const err = rejectedFiles[0].errors[0];
        if (err.code === "file-too-large") {
          toast.error("File must be smaller than 10 MB.");
        } else if (err.code === "file-invalid-type") {
          toast.error("Only PDF files are allowed.");
        } else {
          toast.error(err.message);
        }
        return;
      }
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        toast.success(`${acceptedFiles[0].name} selected`);
      }
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setProgress(0);
      setStage("Uploading resume...");

      const res = await axios.post(
        `${API_URL}/api/upload/resume`,
        formData,
        {
          onUploadProgress: (e) => {
            const pct = Math.round((e.loaded * 100) / (e.total || 1));
            setProgress(Math.min(pct, 95));
            if (pct >= 100) {
              setStage("Analyzing with AI — computing ATS score...");
            }
          },
        }
      );

      setProgress(100);
      setStage("Analysis complete!");

      if (typeof res.data.resumeText !== "string") {
        throw new Error("Unexpected backend response format.");
      }

      toast.success("Resume analyzed successfully!");

      setTimeout(() => {
        navigate("/dashboard", {
          state: {
            resumeText: res.data.resumeText,
            analysis: res.data.analysis,
            fileName: res.data.file,
            analysisAvailable: res.data.analysisAvailable,
          },
        });
      }, 600);
    } catch (err) {
      console.error("Resume upload failed:", err);
      setProgress(0);
      setStage("");
      toast.error(
        err.response?.data?.message ||
          "Could not connect to server. Ensure port 5002 is active."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setStage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-white font-sans selection:bg-blue-500 selection:text-white">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-16 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mb-12"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Resume Architect
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            ATS Score & Keyword Optimizer
          </h1>
          <p className="text-[#94A3B8] mt-4 text-base sm:text-lg leading-relaxed font-normal">
            Upload your PDF resume to compute instant ATS match scores, missing keywords, and section improvements.
          </p>
        </motion.div>

        {/* Dropzone Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl"
        >
          <div
            {...getRootProps()}
            className={`saas-card p-12 text-center cursor-pointer transition-all duration-300 border-2 border-dashed rounded-[24px] ${
              isDragActive
                ? "border-blue-500 bg-blue-500/10"
                : file
                ? "border-emerald-500 bg-emerald-500/10"
                : "border-slate-800 hover:border-slate-700 bg-[#0E1424]"
            }`}
          >
            <input {...getInputProps()} />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="file-selected"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <FileText size={28} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">{file.name}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{formatBytes(file.size)} · PDF</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="text-xs font-semibold text-rose-400 hover:underline mt-1"
                  >
                    Change File
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="no-file"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <UploadIcon size={28} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">
                      {isDragActive ? "Drop PDF here" : "Click or drag PDF resume here"}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">Accepts PDF up to 10 MB</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          {loading && (
            <div className="mt-6">
              <div className="flex justify-between text-xs font-bold text-[#94A3B8] mb-2">
                <span>{stage}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1E293B] overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-8 w-full py-4 rounded-full font-bold text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-40 transition-all"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Analyze Resume Now
              </>
            )}
          </button>
        </motion.div>

        {/* Feature Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm font-semibold text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Instant ATS Match</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Keyword Gap Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>AI Bullet Rewriter</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Upload;
