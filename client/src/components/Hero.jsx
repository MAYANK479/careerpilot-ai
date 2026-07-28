import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-28 px-6">
      <h1 className="text-6xl font-bold">
        Land Your Dream Job with AI
      </h1>

      <p className="text-gray-400 mt-6 max-w-2xl text-xl">
        Upload your resume, receive an ATS score, identify missing skills,
        and get AI-powered suggestions to improve your chances of getting
        shortlisted.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          to="/upload"
          className="bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-700 transition"
        >
          Upload Resume
        </Link>

        <button className="border border-gray-600 px-8 py-4 rounded-xl hover:bg-gray-800 transition">
          Try Demo
        </button>
      </div>
    </section>
  );
}

export default Hero;