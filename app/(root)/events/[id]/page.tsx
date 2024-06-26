'use client'
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CreateEventParams } from '@/types';
import EventLoad from '@/components/shared/EventLoad';
import Collection from '@/components/shared/Collection';
import Link from 'next/link';

const EventDetails =  ({ params: { id }, searchParams }: SearchParamProps) => {
  const [event, setEvent] = useState<CreateEventParams | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line
  const [relatedEvents, setRelatedEvents] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        const ev = await getEventById(id);
        setEvent(ev);
        const relatedEvent = await getRelatedEventsByCategory({
          categoryName: ev.category.name,
          eventId: id,
          limit: 6,
          page: searchParams.page as string,
        });
        console.log()
        
        setRelatedEvents(//@ts-ignore
        relatedEvent || null); // Add this line to handle the case when relatedEvent is undefined
      } catch (err) {
        return err;
      }
      setIsLoading(false);
    }
    fetchEvent();
  }, [id]);
  
  if (isLoading || !event) {
    return <EventLoad/>;
  }

  


  if(event ) {
  return (
    <>
     <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl items-center">
        
        <Image 
          // @ts-ignore
          src={event.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full object-center object-contain "
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">

            <h2 className='text-[6vw] font-bold md:h2-bold'>{ 
            // @ts-ignore
            event.title
            }</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  
                  {// @ts-ignore
                  event.isFree ? 'FREE' : `$${event.price}`}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {
                  // @ts-ignore
                  event.category.name}
                </p>
              </div>
              <Link href={
              `/${//@ts-ignore
                event.organizer._id}/profile`}>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">{// @ts-ignore
                event.organizer.firstName} {event.organizer.lastName}</span>
              </p>
              </Link>
            </div>
          </div>


          <div className="flex flex-col gap-5">
            <div className='flex gap-2 md:gap-3'>
              <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
              <div className="p-medium-16 lg:p-regular-20 flex flex-col flex-wrap items-start">
                <p>
                  {// @ts-ignore
                  formatDateTime(event.startDateTime).dateOnly} - {' '}
                  {// @ts-ignore
                  formatDateTime(event.startDateTime).timeOnly} {}
                </p>
                
                <p>
                  {
                  // @ts-ignore
                  formatDateTime(event.endDateTime).dateOnly} -  {' '}
                  {// @ts-ignore
                  formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3 ">
              <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
              <p className="p-medium-16 lg:p-regular-20 flex ">{// @ts-ignore
              event.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{// @ts-ignore
            event.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{// @ts-ignore
            event.url}</p>
          </div>
        </div>
      </div>
    </section>

    {/* EVENTS with the same category */}
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Related Events</h2>
      <Collection
        data={//@ts-ignore
          relatedEvents?.data}
        emptyTitle='No Events Found'
        emptyStateSubtext='Come Back Later for More Events'
        collectionType='All_Events'
        limit={6}
        page={1}
        totalPages={2}
        />

    
    </section>
     

    </>
  )
}
}

export default EventDetails