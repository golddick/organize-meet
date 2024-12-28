import { LoaderPinwheel } from 'lucide-react'
import React from 'react'

export const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full '>
        <LoaderPinwheel className=' animate-spin size-6'/>
    </div>
  )
}
