'use client'

import React , { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { Poppins } from "next/font/google";
import ProfilePopup from './profilePopup';


const pop = Poppins({
  subsets: ['latin'],
  weight: ['400']
})
const SearchBar = () => {
  const [Email, setEmail] = useState('')
  const [Popup, setPopup] = useState(false)
  const [Data, setData] = useState()

  async function fetchUserDetails() {
    try {
        const res = await fetch('/api/getUser?email=' + Email);
        const text = await res.text(); 
        console.log("Raw API Response:", text); 

        const data = JSON.parse(text); 
        setData(data);
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

function closePopup() {
    setPopup(!Popup)
}


  return (
    <div className='flex gap-4 items-center'>
        <input type="text" className={`bg-gray-100 p-3 rounded-4xl w-90 ${pop.className}` } placeholder='Type The User Email' onChange={(e)=>{setEmail(e.target.value)}}/>
        <div className='hover:bg-gray-100 rounded-xl cursor-pointer p-4' onClick={()=>{setPopup(true); console.log(Email); fetchUserDetails(Email)}}>
        <SearchIcon/>
        </div>

        {
          Popup?
          <ProfilePopup data={Data} closePopup={closePopup}/>:
          ''
        }
    </div>
  )
}

export default SearchBar