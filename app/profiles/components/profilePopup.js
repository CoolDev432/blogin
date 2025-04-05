import React from 'react'
import { Button } from '@/components/ui/button'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { Poppins } from 'next/font/google'
const pop = Poppins({
  subsets: ['latin'],
  weight: ['400']
})

const ProfilePopup = ({ data, closePopup }) => {
    return (
    <div className='bg-white h-[300px] w-[100vw] p-4 absolute top-[200px] left-[20px] rounded-2xl flex justify-center items-center flex-col'>
      <h1 onClick={()=>{closePopup()}} className={`${pop.className} text-xl cursor-pointer bg-gray-400 text-white p-2 hover:scale-107 hover:shadow-black hover:shadow-2xl transition-all transition-1 rounded-3xl w-fit mb-3`}>X</h1>
        <h1 className='text-7xl'>{data?.appwriteUser?.user_name || "Unknown User"}</h1>
        <p className='text-gray-400 mb-10'>{data?.appwriteUser?.email || "No Email Found"}</p>

        <div>
          <h1 className='text-3xl mt-6'>Blogs Written By {data?.appwriteUser.user_name}:</h1>
          <div className='flex justify-evenly items-center flex-col w-full'>
          {
            data?.blogs.map(item=>(
              <div key={item.$id} className='shadow-2xl shadow-gray-400 p-5 rounded-4xl'>
                    <h1 className='font-extrabold text-3xl'>{item.title}</h1>
                    <p className='font-light'>{item.content}</p>
                    <p className='text-gray-500 mt-5'>{item.Likes} Likes</p>
              </div>
            ))
          }
          </div>
        </div>
    </div>
  );
};


export default ProfilePopup