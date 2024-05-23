import React from 'react'
import { useRouter } from 'next/navigation'
import { getUserEvents } from '@/lib/actions/event.actions'
import { getbyID } from '@/lib/actions/category.actions'
import Card from '@/components/shared/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Collection from '@/components/shared/Collection'
type UpdateEventProps = {
  params: {
      id: string
  }
}
const page = async ({ params: { id } }: UpdateEventProps) => {

  const events = await getUserEvents(id)
  console.log(events)

  
  

  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
    <div className="wrapper flex items-center justify-center sm:justify-between">
      <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
      <Button asChild size="lg" className="button hidden sm:flex">
        <Link href="/events/create">
          Create New Event
        </Link>
      </Button>
    </div>
  </section>

  <section className="wrapper my-8">
    <Collection 
      data={events}
      emptyTitle="No events have been created yet"
      emptyStateSubtext="Go create some now"
      collectionType="Events_Organized"
      limit={3}
      page={1}
      urlParamName="eventsPage"
      totalPages={2}
    />
  </section>
  </>

  )
}

export default page