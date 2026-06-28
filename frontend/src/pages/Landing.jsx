import {Link} from 'react-router-dom';

const Landing = () => {
    return(
        <div className='min-h-screen bg-gray-950 text-white'>

            {/*hero section  */}
            <div className='flex flex-col items-center justify-center text-center px-6 py-24'>
                <h1 className='text-5xl font-bold mb-6'>
                AI Powered{' '}
                <span className='text-blue-400'>Code Review</span>
            </h1>

            <p className='text-gray-400 text-xl max-w-2xl mb-10'>
                Paste your code — AI will instantly find bugs, 
                warnings and improvements. Fast, smart and free.
            </p>

            <div className='flex-gap-4'>
                <Link
                to="/signup"
                className='bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition'
                >
                Get Started
                </Link>

                <Link
                to="/login"
                className='border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg text-lg transition'
                >
                Login
                </Link>
            </div>
            </div>

            {/* feature section */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 px-12 pb-24'>

                <div className='bg-gray-800 p-6  rounded-xl'>
                    <div className='text-blue-400 text-3xl mb-4'>⚡</div>
                        <h3 className='text-xl font-semibold mb-2'>Fast Analysis</h3>
                        <p className='text-gray-400'>
                            Entire code gets analyzed within seconds
                        </p>
                </div>

                <div className='bg-gray-800 p-6 rounded-xl'>
                    <div className='text-green-400 text-3xl mb-4'>🤖</div>
                    <h3 className='text-xl font-semibold mb-2'>AI Powered</h3>
                    <p className='text-gray-400'>
                        Powered by GPT — get industry level suggestions
                    </p>
                </div>

                <div>
                    <div></div>
                    <h3></h3>
                    <p>
                        All reviews are saved — access them anytime
                    </p>
                </div>


            </div>
            

        </div>

    )
};


export default Landing;