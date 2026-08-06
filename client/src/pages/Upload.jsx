import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ToastContainer, useToast } from "../components/ui/Toast";

const API_URL = import.meta.env.VITE_API_URL || "";

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
    <div>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
      
      <div className="section-header">
        <h1 className="section-title">Resume Architect & ATS Analyzer</h1>
      </div>
      
      <div className="dashboard-grid two-columns" style={{ gridTemplateColumns: '1fr' }}>
        <div className="stat-card" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="brand-badge" style={{ marginBottom: '1rem' }}>Upload & Analyze</span>
            <p style={{ color: 'var(--text-muted)' }}>
              Upload your PDF resume to compute instant ATS match scores, missing keywords, and section improvements.
            </p>
          </div>

          <div
            {...getRootProps()}
            style={{
              border: `2px dashed ${isDragActive ? 'var(--primary)' : 'var(--input-border)'}`,
              borderRadius: 'var(--radius-card)',
              padding: '3rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: isDragActive ? 'rgba(99, 102, 241, 0.1)' : file ? 'rgba(74, 222, 128, 0.1)' : 'var(--input-bg)',
              transition: 'var(--transition)'
            }}
          >
            <input {...getInputProps()} />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="file-selected"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
                >
                  <div style={{ fontSize: '3rem' }}>📄</div>
                  <div>
                    <p style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '1.1rem' }}>{file.name}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{formatBytes(file.size)} · PDF</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--danger)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Change File
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="no-file"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
                >
                  <div style={{ fontSize: '3rem' }}>📁</div>
                  <div>
                    <p style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '1.1rem' }}>
                      {isDragActive ? "Drop PDF here" : "Click or drag PDF resume here"}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Accepts PDF up to 10 MB</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          {loading && (
            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                <span>{stage}</span>
                <span>{progress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'var(--input-bg)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'var(--primary)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="btn-primary"
            style={{ marginTop: '2rem', height: '3rem' }}
          >
            {loading ? 'Analyzing Resume...' : 'Analyze Resume Now'}
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> Instant ATS Match</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> Keyword Gap Analysis</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> AI Bullet Rewriter</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
