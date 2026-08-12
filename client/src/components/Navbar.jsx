import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TaskFlow
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-gray-600 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;