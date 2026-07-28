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

      <div className="mt-10 space-x-4">
        <button className="bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-700">
          Upload Resume
        </button>

        <button className="border border-gray-600 px-8 py-4 rounded-xl hover:bg-gray-800">
          Try Demo
        </button>
      </div>
    </section>
  );
}

export default Hero;