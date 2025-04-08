'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CrossIcon } from 'lucide-react';

const Popup = ({ handleCross, handleBlog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className='flex items-center justify-center flex-col bg-purple-500/20 backdrop-blur-lg backdrop-filter w-[40vw] p-3 rounded-3xl absolute top-[100px] left-[30%] text-white border border-purple-200/30 shadow-purple-500/80 shadow-2xl z-999'>
      <CrossIcon className='rotate-45 cursor-pointer hover:scale-132 transition-all' onClick={handleCross} />
      <h1 className='font-bold text-2xl'>Write a Blog</h1>
      <input 
        type="text" 
        placeholder='Enter Your Title' 
        className='border-2 bg-white text-black mb-2 p-2 rounded-xl w-[230px]' 
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        className='border-2 h-[200px] w-full rounded-xl bg-white/80 text-black p-2' 
        placeholder='Blog Content' 
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant={'destructive'} className='cursor-pointer mt-2' onClick={() => handleBlog(title, content)}>
        Submit
      </Button>
    </div>
  );
}

export default Popup;
