import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get('/reviews');
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setReviewsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await API.post('/chat', { messages: updatedMessages });
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: res.data.reply
      }]);
    } catch (err) {
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: 'Something went wrong. Try again!'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 flex">

      {/* Left Sidebar */}
      <div className="w-64 min-h-screen bg-gray-950/80 border-r border-gray-800 flex flex-col">

        <div className="px-4 py-5 border-b border-gray-800">
          <p className="text-white font-semibold text-sm">AI Code Assistant</p>
          <p className="text-gray-500 text-xs mt-1">{user?.name}</p>
        </div>

        <div className="px-3 py-3">
          <button
            onClick={() => setMessages([])}
            className="w-full bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 text-xs font-medium py-2 px-3 rounded-lg transition flex items-center gap-2"
          >
            + New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <p className="text-gray-600 text-xs px-2 py-2 uppercase tracking-wider">Past Reviews</p>
          {reviewsLoading ? (
            <p className="text-gray-600 text-xs px-2">Loading...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-600 text-xs px-2">No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                onClick={() => navigate(`/review/${review._id}`)}
                className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-800/60 transition group mb-1"
              >
                <p className="text-gray-300 text-xs font-medium truncate group-hover:text-white">
                  {review.fileName}
                </p>
                <p className="text-gray-600 text-xs mt-0.5">
                  {review.suggestions?.length} suggestions
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Side — Chat */}
      <div className="flex-1 flex flex-col h-screen">

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* Empty state — center mein */}
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-4xl mb-4">🤖</p>
              <h2 className="text-2xl font-bold text-white mb-2">
                AI Code Assistant
              </h2>
              <p className="text-gray-500 text-sm max-w-md">
                Paste any code and ask me to review, fix, or explain it. I can help with any programming language!
              </p>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 mt-6 justify-center">
                {[
                  '🔍 Review my code',
                  '🔧 Fix this bug',
                  '📖 Explain this function',
                  '⚡ Optimize my code'
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700 text-gray-300 text-xs px-4 py-2 rounded-full transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs mr-2 mt-1 flex-shrink-0">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-sm'
                        : 'bg-gray-800/80 text-gray-200 rounded-bl-sm border border-gray-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs mr-2 mt-1 flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-gray-800/80 border border-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input — hamesha neeche fixed */}
        <div className="border-t border-gray-800 px-6 py-4 bg-gray-950/50">
          <div className="max-w-3xl mx-auto flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste code or ask anything... (Enter to send, Shift+Enter for new line)"
              rows={3}
              className="flex-1 bg-gray-800/80 text-white text-sm px-4 py-3 rounded-xl outline-none border border-gray-700 focus:border-indigo-500 transition font-mono resize-none"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-semibold text-sm transition disabled:opacity-50 h-fit"
            >
              ↑
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-2 max-w-3xl mx-auto">
            Enter to send • Shift+Enter for new line
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;