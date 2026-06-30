import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-950/80 backdrop-blur-md border-b border-gray-800 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50">

      <Link to="/" className="text-lg font-bold tracking-tight">
        AI<span className="text-indigo-400">Review</span>
      </Link>

      <div className="flex gap-5 items-center">
        {user ? (
          <>
            <span className="text-gray-400 text-sm hidden sm:block">
              {user.name}
            </span>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white text-sm font-medium transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 text-sm px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white text-sm font-medium transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-500 text-sm px-4 py-2 rounded-lg font-medium transition"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;