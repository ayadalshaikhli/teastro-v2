import React from 'react'
import { useSelector } from 'react-redux';


export default function ProfileScreen() {
    const user = useSelector((state) => state.user);
    console.log(user.user);
  return (
    <div className='bg-gray-700 h-screen'>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl text-white font-bold'>Profile</h1>
            <div className='flex flex-col items-center justify-center'>
                <img className='w-20 h-20 rounded-full' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='avatar' />
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-2xl text-white font-bold'>{user.user}</h1>
                    <div className='flex flex-row items-center justify-center'>
                        <h1 className='text-xl text-white font-bold'>Plans</h1>
                        <h1 className='text-xl text-white font-bold ml-2'>Edit</h1>
                    </div>
                    </div>
                    </div>
            </div>
        
    </div>
  )
}
