import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = () => {
    const sessionClaims = auth()

    const UserId = sessionClaims.userId as string


    return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>Create Event</h3>
    </section>
    
    <div className='wrapper my-8'>
        <EventForm userId={UserId} type='Create'/>

    </div>
    
    </>
  )
}

export default page