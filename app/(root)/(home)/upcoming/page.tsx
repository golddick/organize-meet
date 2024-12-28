
import MeetingList from '@/components/_component/meetingList/MeetingList'
import React from 'react'

const page = () => {
  return (
    <section className='flex flex-col size-full gap-10'>
      <h1 className='text-3xl font-bold'>
      upcoming
      </h1> 
       <MeetingList type='upcoming'/>
    </section>
  )
}

export default page