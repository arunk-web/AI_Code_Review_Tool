import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const Review = () => {
    const {id } = useParams();
    const navigate = useNavigate();
    const [review , setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReview = async () => {
            try{
                const res = await API.get(`/reviews/${id}`);
                setReview(res.data)
            } catch (err) {
                setError('Review not found');
            } finally {
                setLoading(false);
            }
        };
        fetchReview();
    }, [id]);

    const getIcon = (type) => {
        if(type === 'error') return '❌';
        if(type === 'warning') return '⚠️';
        return '✅';
    };

    const getBorderColor = (type) => {
        if(type == 'error') return 'border-red-500/40';
        if(type === 'warning') return 'border-yellow-500/40';
        return 'border-green-500/40';
    }

    const getTextColor = (type) => {
        if(type === 'error') return 'text-red-400';
        if(type === 'warning') return 'text-yellow-400';
        return 'text-green-400';
    }

    if(loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-700 flex items-center justify-center'>
                <p className='text-gray-400'>Loading review...</p>
            </div>
        );
    }

    if(error){
        return(
            <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-700 flex items-center justify-center'>
                <p className='text-red-400'>{error}</p>
            </div>
        );
    }

    return(
        <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-700 px-6 py-10'>
            <div className='max-w-5xl mx-auto'>

                {/* header */}
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className='text-gray-500 text-sm hover:text-white transition mb-2 flex items-center gap-1'
                        >
                            ← Back to Dashboard
                        </button>
                        <h1 className='text-2xl font-bold text-white'>{review.fileName}</h1>
                        <p className='text-gray-500 text-sm mt-1'>
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </p>
                    </div>

                    <div className='bg-indigo-600/20 border border-indigo-500/30 px-4 py-2 rounded-xl text-center'>
                        <p className='text-indigo-400 text-2xl font-bold'>{review.suggestions?.length}</p>
                        <p className='text-gray-400 text-xs'>Suggestions</p>
                    </div>
                </div>
                    
                    {/* main content */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

                    {/* left code */}
                    <div className='bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-5'>
                        <h2 className='text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider'>
                            Submitted Code
                        </h2>
                        <pre className='text-gray-300 text-xs font-mono overflow-auto max-h-[500px] whitespace-pre-wrap'>
                            {review.code}
                        </pre>
                    </div>

                    {/* right suggestions */}
                    <div className='bg-gray-900/60 backdrop-blur-xl border border-gray-500 rounded-2xl p-5'>
                        <h2 className='text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider'>
                            AI Suggestions
                        </h2>

                        {review.suggestions?.length === 0? (
                            <div className='text-center py-10'>
                                <p className='text-4xl mb-3'>✅</p>
                                <p className='text-green-400 font-medium'>Great code!</p>
                                <p className='text-gray-500 text-sm mt-1'>No issues found</p>
                            </div>
                        ) : (
                            <div>
                                {review.suggestions?.map((suggestion, index) => (
                                    <div
                                    key={index}
                                    className={`border ${getBorderColor(suggestion.type)} bg-gray-800/50 rounded-xl px-4 py-3`}
                                    >
                                        <div className='flex items-center gap-2 mb-1'>
                                            <span>{getIcon(suggestion.type)}</span>
                                            <span className={`text-xs font-semibold uppercase ${getTextColor(suggestion.type)}`}>
                                                {suggestion.type}
                                            </span>
                                            <span className='text-gray-600 text-xs ml-auto'>
                                                Line {suggestion.line}
                                            </span>
                                        </div>
                                        <p className='text-gray-300 text-sm'>
                                            {suggestion.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Review;