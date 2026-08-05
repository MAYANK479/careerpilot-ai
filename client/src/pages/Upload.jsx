import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Upload as UploadIcon,
  FileText,
  Loader2,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
              setStage("Analyzing with AI — this may take a moment...");
            }
          },
        }
      );

      setProgress(100);
      setStage("Analysis complete!");

      if (typeof res.data.resumeText !== "string") {
        throw new Error(
          "The backend returned an unexpected response format."
        );
      }

      toast.success("Resume analyzed successfully!");

      // Navigate to dashboard with analysis data
      setTimeout(() => {
        navigate("/dashboard", {
          state: {
            resumeText: res.data.resumeText,
            analysis: res.data.analysis,
            fileName: res.data.file,
            analysisAvailable: res.data.analysisAvailable,
          },
        });
      }, 800);
    } catch (err) {
      console.error("Resume upload failed:", err);
      setProgress(0);
      setStage("");
      toast.error(
        err.response?.data?.message ||
          "Could not connect to the server. Make sure it is running on port 5002."
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-5">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        <h1 className="text-lg font-bold text-blue-400">AI Resume Analyzer</h1>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-extrabold tracking-tight">
            Upload Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Resume
            </span>
          </h1>
          <p className="text-slate-400 mt-4 text-lg max-w-lg mx-auto">
            Drop your PDF resume below and let AI analyze it for ATS
            compatibility, missing skills, and actionable improvements.
          </p>
        </motion.div>

        {/* Dropzone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-full max-w-xl"
        >
          <div
            {...getRootProps()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
              isDragActive
                ? "dropzone-active border-blue-500"
                : file
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/5"
            }`}
          >
            <input {...getInputProps()} />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="file-selected"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <FileText size={28} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{file.name}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {formatBytes(file.size)} · PDF
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="text-xs text-slate-500 hover:text-red-400 transition mt-1"
                  >
                    Remove file
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="no-file"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                    <UploadIcon
                      size={32}
                      className={`${
                        isDragActive ? "text-blue-400" : "text-slate-500"
                      } transition`}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-300">
                      {isDragActive
                        ? "Drop your resume here"
                        : "Drag & drop your resume"}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      or click to browse · PDF only · Max 10 MB
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>{stage}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analyze Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-6 w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <UploadIcon size={20} />
                Analyze Resume
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Status Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center gap-8 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-500" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-500" />
            <span>Local AI</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-500" />
            <span>No API Key</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Upload;
