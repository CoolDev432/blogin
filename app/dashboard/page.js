'use client'

import React, { useState } from 'react'
import Hero from './_components/Hero'
import Navigation from './_components/Navigation';
import Popup from './_components/popup';
import { useUser } from '@clerk/nextjs';
import YourBlogs from './_components/yourBlogs';
import Statistics from './_components/statistics';
import Footer from './_components/Footer';


const Page = () => {
  const { user } = useUser();
  const [popup, setPopup] = useState(false);

  function writeBlog() {
    setPopup(!popup);
  }

  function handleCross() {
    setPopup(!popup);
  }

  async function handleBlog(title, content) {
    try {
      const response = await fetch('/api/blogCreation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          author: user?.firstName,
          user_email: user?.emailAddresses[0]?.emailAddress
        })
      });

      const data = await response.json();
      
      if (response.ok) {  
        console.log("Blog Created:", data);
        alert('Blog Created');
        setPopup(false);  
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  }

  return (
    <div className="bg-white h-[130vh] w-[100vw]"> 
      <div className='flex justify-center items-center h-[60vh] flex-col mt-2'>
        <Navigation writeBlog={writeBlog} route={'dashboard'} />
        <Hero />
      </div>
      {popup && <Popup handleCross={handleCross} handleBlog={handleBlog} />}
      <div className='flex justify-evenly mt-2'>
      <YourBlogs/>
      <Statistics/>
      </div>
    <div className='flex justify-center'>
      <Footer/>
    </div>
    </div>
  );
};

export default Page;
