import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-5xl font-bold mb-6">
          AI Powered{' '}
          <span className="text-indigo-400">Code Review</span>
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mb-10">
          Paste your code — AI will instantly find bugs, warnings and improvements. Fast, smart and free.
        </p>

        <div className="flex gap-4">
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg text-lg transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12 pb-24">

        <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl">
          <div className="text-blue-400 text-3xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold mb-2">Fast Analysis</h3>
          <p className="text-gray-400">
            Entire code gets analyzed within seconds
          </p>
        </div>

        <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl">
          <div className="text-green-400 text-3xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
          <p className="text-gray-400">
            Powered by LLaMA — get industry level suggestions
          </p>
        </div>

        <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl">
          <div className="text-purple-400 text-3xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">Chat History</h3>
          <p className="text-gray-400">
            All chats are saved — access them anytime
          </p>
        </div>

      </div>

    </div>
  );
};

export default Landing;