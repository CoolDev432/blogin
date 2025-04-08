import React from 'react'
import { Copyright } from 'lucide-react'
import { Button } from '@/components/ui/button'
const Footer = () => {
  return (
    <div className='bg-linear-65 from-purple-500 to-pink-500 h-[100px] w-[70vw] rounded-4xl mt-3 flex justify-center items-center text-white gap-3'>
      <Copyright/> <h1>Copyright 2025 | CoolDev</h1>
      <h1>|</h1>
      <Button variant={'outline'} className={'text-black cursor-pointer'}>Check out my YT Chanel!</Button>
    </div>
  )
}

export default Footer