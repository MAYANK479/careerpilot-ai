import { Link } from "react-router-dom";

function Upload() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-5xl font-bold">
        Upload Your Resume
      </h1>

      <p className="text-gray-400 mt-4">
        Upload your PDF resume and let AI analyze it.
      </p>

      <div className="mt-10 w-full max-w-xl border-2 border-dashed border-blue-500 rounded-2xl p-16 text-center">

        <h2 className="text-2xl font-semibold">
          📄 Drag & Drop Resume Here
        </h2>

        <p className="text-gray-500 mt-3">
          or click below
        </p>

        <button className="mt-8 bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-700">
          Choose PDF
        </button>

      </div>

      <Link
        to="/"
        className="mt-8 text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>

    </div>
  );
}

export default Upload;