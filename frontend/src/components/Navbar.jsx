import {Link , useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';


const Navbar = () => {
    const {user , logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return(
        <nav className='bg-gray-900 text-white px-6 py-4 flex justify-between items-center'>
            <Link to='/' className='text-xl font bold text-blue-400'>
                AI Code Review
            </Link>

            <div className='flex gap-4 items-center'>
                { user ? (
                    //// logged in hai toh ye dikhao
                    <>
                        <span className='text-gray-300'>
                            Hello, {user.name}
                        </span>
                        <Link 
                        to="/dashboard"
                        className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'
                        >
                        Dashboard
                        </Link>
                        <button
                        onClick={handleLogout}
                        className='bg-red-600 px-4 py-2 rounded hover:bg-red-700'
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    //logged in nahi hai toh ye dikhao
                    <>
                    <Link
                    to="/login"
                    className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'
                    >
                    Login
                    </Link>
                    <Link
                    to="/signup"
                    className='bg-green-600 px-4 py-2 rounded hover:bg-green-700'
                    >
                    Signup
                    </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
//<>...</> Fragment hai — React mein ek se zyada elements return karne ke liye wrapper chahiye, Fragment invisible wrapper hai"


export default Navbar;