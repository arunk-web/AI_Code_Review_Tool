import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">
        
        <h1 className="text-5xl font-bold mb-6">
          AI Powered{' '}
          <span className="text-blue-400">Code Review</span>
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mb-10">
          Paste your code — AI will instantly find bugs, warnings and improvements. Fast, smart and free.
        </p>

        <div className="flex gap-4">
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition">
                Get Started
              </Link>
              <Link to="/login" className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg text-lg transition">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;