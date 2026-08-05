import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import JobMatch from "./pages/JobMatch";
import CoverLetter from "./pages/CoverLetter";
import Interview from "./pages/Interview";
import Roadmap from "./pages/Roadmap";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/job-match" element={<JobMatch />} />
      <Route path="/cover-letter" element={<CoverLetter />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  );
}

export default App;