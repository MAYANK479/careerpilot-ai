function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6">
      <h1 className="text-2xl font-bold text-blue-500">
        AI Resume Analyzer
      </h1>

      <div className="space-x-4">
        <button className="text-gray-300 hover:text-white">
          Login
        </button>

        <button className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;