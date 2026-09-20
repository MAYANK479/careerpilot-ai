import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicOnlyRoute } from "./components/ProtectedRoute";

import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ATS from "./pages/ATS";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import JobMatch from "./pages/JobMatch";
import CoverLetter from "./pages/CoverLetter";
import Interview from "./pages/Interview";
import Roadmap from "./pages/Roadmap";
import Portfolio from "./pages/Portfolio";
import ScheduledInterviews from "./pages/ScheduledInterviews";
import Invitations from "./pages/Invitations";
import Home from "./pages/Home";

import { ResumeProvider } from "./context/ResumeContext";

function AppProviders({ children }) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const content = (
    <AuthProvider>
      <ResumeProvider>
        {children}
      </ResumeProvider>
    </AuthProvider>
  );

  if (googleClientId) {
    return (
      <GoogleOAuthProvider clientId={googleClientId}>
        {content}
      </GoogleOAuthProvider>
    );
  }

  return content;
}


function App() {
  return (
    <AppProviders>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Home />} />
        
        {/* Public-only Auth Pages (redirect to /dashboard if already logged in) */}
        <Route element={<PublicOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Protected Dashboard Layout (redirect to /login if not authenticated) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ats" element={<ATS />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/job-match" element={<JobMatch />} />
            <Route path="/cover-letter" element={<CoverLetter />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/scheduled-interviews" element={<ScheduledInterviews />} />
            <Route path="/invitations" element={<Invitations />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProviders>
  );
}

export default App;