import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import API from '../services/api';

const login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState('');


    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault;
        setError('');
        setLoading(true);

        try{
            const res = await API.post('/auth/login',{email,password});
            login(res.data , res.data.token);
            navigate('./dashboard');
        } catch (err){
            setError(err.response?.data?.message || 'Something went wrong');
        }
            finally {
                setLoading(false);
            }
        };

        return(
            <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-700 to-indigo-950 flex items-center justify-center px-4'>
                <div className='bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl'>

                    <div className='text-center mb-8'>
                        <h2 className='text-2xl font-bold text-white'>Welcome Back!</h2>
                        <p className='text-gray-500 text-sm mt-1'>Log in to continue</p>
                    </div>

                    {error && (
                        <div className='bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2 rounded-lg mb-4'>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <input 
                        type="text"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='w-full bg-gray-800/80 text-white text-sm px-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-indigo-500 transition'
                        />

                        <input 
                        type="password"
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='w-full bg-gray-800/80 text-white text-sm px-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-indigo-500 transition'
                        />

                        <button
                            type='submit'
                            disabled={loading}
                            className='mt-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold text-sm transition disabled:opacity-50'
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>


                    </form>

                    <p className='text-gray-500 text-center text-sm mt-6'>
                        Don't have an account{' '}
                        <Link
                        to="/signup"
                        className='text-indigo-400 hover:underline'
                        >
                        Sign up
                        </Link>
                    </p>

                </div>
            </div>
        );
};


export default login;