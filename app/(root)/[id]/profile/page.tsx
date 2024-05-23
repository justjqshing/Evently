import React from 'react'
import { useRouter } from 'next/navigation'
import { getUserEvents } from '@/lib/actions/event.actions'
import { getbyID } from '@/lib/actions/category.actions'
import Card from '@/components/shared/Card'
type UpdateEventProps = {
  params: {
      id: string
  }
}
const page = async ({ params: { id } }: UpdateEventProps) => {

  const events = await getUserEvents(id)
  console.log(events)

  
  

  return (
    <div className='flex flex-row justify-between wrapper'>
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {events.map((event: any) => {
              return (
                <li key={event._id} className="flex justify-center">
                  <Card event={event} hasOrderLink={false} hidePrice={false} />
                </li>
              )
            })}
          </ul>

          
        </div>      

  )
}

export default page