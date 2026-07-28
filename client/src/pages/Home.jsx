import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default Home;