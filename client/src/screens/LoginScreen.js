import React, { useState } from 'react'
import SignUpScreen from './SignUpScreen';

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);

    return (
        <div className='bg-gray-800 h-screen px-10 pt-5 text-white'>
            <div className=' flex justify-between'>
                <div>Logo</div>
                <div>
                    <button onClick={() => setSignIn(true)} className=' px-2 py-4 rounded-md bg-red-500'>Sign In</button>
                </div>
            </div>
            {signIn ? (
                <SignUpScreen />
            ) : (
                <div className='flex flex-col items-center justify-center space-y-5'>
                    <h1 className='text-3xl font-bold'>Unlimited movies, TV shows, and more.</h1>
                    <h1 className='text-3xl font-bold'>Watch anywhere. Cancel anytime.</h1>
                    <h1 className='text-xl'>Ready to watch? Enter your email to create or restart your membership.</h1>
                    <div className='flex flex-row items-center justify-center space-x-10'>
                        <input className='w-1/2 h-10 rounded-md px-2' placeholder='Email Address' />
                        <button onClick={() => setSignIn(true)} className='w-1/4 h-10 rounded-md bg-red-500'>Get Started</button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default LoginScreen