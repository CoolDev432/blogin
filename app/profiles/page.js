import React from 'react'
import SearchBar from './components/searchBar'
import { Poppins } from 'next/font/google'
import ProfilePopup from './components/profilePopup'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
const pop = Poppins({
  subsets: ['latin'],
  weight: ['400']
})
const Profiles = () => {
  return (
    <div>
      <Link href={'/dashboard '}>
      <div className='hover:shadow-gray hover:shadow-xl rounded-3xl bg-gray-200 p-5 w-fit m-3 transition-all transition-1 cursor-pointer'>
      <ArrowLeft/>
      </div>
      </Link>
    <div className={`flex justify-center flex-col items-center h-[100vh] ${pop.className}`}>
        <h1 className='text-7xl text-blue-500 mb-3'>Check Out User Profiles!</h1>
        <SearchBar/>
    </div>
    </div>
  )
}

export default Profiles