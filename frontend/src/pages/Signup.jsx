import {useState} from 'react';
import { useNavigate , Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import API from '../services/api';

const signup = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const res = await API.post('/auth/signup',{
                name,
                email,
                password
            });
            const {token, ...userData} = res.data;
            login(userData, token);
            navigate('/dashboard');

        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-600 to-indigo- flex items-center justify-center px-4'>
            <div className='bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl'>

                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center text-white'>
                    Create Account
                </h2>
                <p className='text-gray-500 text-sm mt-1  '>Start reviewing code with AI</p>
                </div>

                { error && (
                    <div className='bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2 rounded-lg mb-4'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    
            
                    <input
                        type="text"
                        placeholder='Enter your name'
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='w-full bg-gray-800/80 text-white text-sm  px-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-indigo-500'
                        />
                    

                        <input
                            type="email"
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full bg-gray-800/80 text-white text-sm px-4 py-3 rounded-lg outline-none border border-gray-700  focus:border-indigo-500'
                        />

                        <input 
                        type="password"
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        minLength={6}
                        className='w-full bg-gray-800/80 px-4 py-3 rounded-lg text-white text-sm outline-none border border-gray-700 focus:border-indigo-500'
                        />

                        <button
                        type="submit"
                        disabled={loading}
                        className='mt-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold text-sm transition disabled:opacity-50'
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                </form>

                <p className='text-gray-400 text-center text-sm mt-6'>
                    Already have an account?{' '}
                    <Link to="/login" className='text-blue-500 hover:underline'>
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};



export default signup;