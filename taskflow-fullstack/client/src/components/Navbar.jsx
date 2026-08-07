function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>

      <div className="space-x-4">
        <button className="text-gray-700 hover:text-blue-600">
          Login
        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;