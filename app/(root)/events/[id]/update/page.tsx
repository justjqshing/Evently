import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs/server'
import { User } from 'lucide-react'
import React from 'react'
import { UpdateEventParams } from '@/types'
import { getEventById } from '@/lib/actions/event.actions'
type UpdateEventProps = {
    params: {
        id: string
    }
}
const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
    const event = await getEventById(id)
    const { sessionClaims } = auth()

    const userId = sessionClaims?.userId as string

    console.log(userId)


    return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>Update Event</h3>
    </section>
    
    <div className='wrapper my-8'>
        <EventForm userId={userId} event={event} eventId={event._id} type='Update'/>

    </div>
    
    </>
  )
}

export default UpdateEvent