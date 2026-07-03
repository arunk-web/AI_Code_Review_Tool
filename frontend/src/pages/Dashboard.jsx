import {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Dashboard = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    const [fileName , setFileName] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [reviews, setReviews] = useState([]);
    const [reviewError, setReviewError] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await API.get('./reviews');
                setReviews(res.data);
            } catch (err) {
                console.log(err);
            }
                finally {
                    setReviewLoading(false);
                }
        };

        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const res = await API.post('./reviews', {fileName, code});
            navigate(`/reviews/${res.data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } 
        finally {
            setLoading(false);
        }
    };

        return(
        <div>
            <div>
                <div className="text-3xl font-bold text-">
                    <h1>
                        Welcome, <span className="text-indigo-400">{user?.name}</span>
                    </h1>
                    <p className="text-gray-500 mt-1">Paste any code below and get instant AI review</p>
                </div>

                <div>
                    <h2 className='text-lg font-semibold text- mb-6'> New Code Review </h2>

                    {error && (
                        <div className='bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2 rounded-lg mb-4'>
                            {error}
                        </div>
                    )}

                    <form action="">
                        <input
                            type="text" 
                            placeholder="index.js"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            required
                            className='w-full bg-gray-800/80 text-white text-sm px-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-indigo-500 transition'
                        />

                        <textarea
                            placeholder="Paste your code here..."
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            rows={14}
                            className='w-full bg-gray-800/80 text-white text-sm px-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-indigo-500 transition font-mono resize-none'
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className='bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2'
                        >
                            {loading ? (
                                <>
                                    <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24' fill='none'>
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke=""currentColor strokeWidth="4" />
                                        <path className='opacity-75' fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Analyzing your code...
                                </>
                            ) : (
                                '🔍 Review My Code'
                            )}
            
                        </button>

                    </form>
                </div>
            </div>
        
        </div>
    )
}


export default Dashboard;



