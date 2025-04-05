'use client'

import React from 'react'
import { Poppins } from "next/font/google";
import { useUser } from '@clerk/nextjs';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400']
})

const Hero = () => {
    const {user} = useUser();
    const [firstName, setFirstName] = React.useState(user?.firstName)
    return (
    <div className={`bg-linear-65 from-purple-500 to-pink-500 h-[50vh] w-[70vw] rounded-4xl flex justify-center items-center text-white ${poppins.className} mt-2`}>
        <h1 className='text-4xl font-bold selection:bg-indigo-500'>Welcome To Your BlogBoard <span className='underline'>{user?.firstName}</span>!</h1>
    </div>
  )
}

export default Hero