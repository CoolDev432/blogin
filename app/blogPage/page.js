'use client'

import React from 'react'
import Navigation from '../dashboard/_components/Navigation'
import Search from './_components/Search'

const BlogPage = () => {
  return (
    <div>
        <div className='flex justify-center items-center h-[100px]'>
        <Navigation route={'/dashboard'}/>
        </div>
        <div className='flex justify-center'>
        <Search/>
        </div>
    </div>
)
}

export default BlogPage