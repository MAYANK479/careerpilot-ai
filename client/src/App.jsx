import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  return (
    <>
      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Auth layout for login/register */}
        <Route element={<AuthLayout />}> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard Layout for application routes */}
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
      </Routes>
    </>
  );
}

export default App;