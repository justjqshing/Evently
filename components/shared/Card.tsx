'use client'
import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth, getAuth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
type cardProps = {
    event: IEvent,
    hidePrice: boolean
}
const Card = ({ event, hidePrice }: cardProps) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); 
    const [visible, setVisible] = useState('flex opacity-0');
    useEffect(() => {
        const fetchAuthData = async () => {
          try {
            const res = await fetch('/api/webhook/clerk');
            if (!res.ok) {
              throw new Error(`Error fetching user ID: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            setUserId(data.userId);
          } catch (error) {
            console.error("Error fetching auth data:", error);
          }
        };
    
        fetchAuthData();
      }, []);



    const isEventCreator = userId === event.organizer._id.toString();
    const startDateTime = new Date(event.startDateTime)
    const formattedStartDateTime = (formatDateTime(startDateTime).dateTime)
    
    return (
        <div onMouseEnter={() => setVisible('animate-fade-in flex')} onMouseLeave={() => setVisible('animate-fade-out opacity-0 flex')} className=" group  relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/events/${event._id}`}
        style={{backgroundImage: `url(${event.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS EVENT CREATOR ... */}

      {isEventCreator && !hidePrice && (
        <div className={`absolute right-2 top-2 flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all ${visible}`}>
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event._id} />

        </div>
      )}

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
       {!hidePrice && <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            {event.isFree ? 'FREE' : `$${event.price}`}
          </span>
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {event.category.name}
          </p>
        </div>}

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formattedStartDateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

        
        </div>
      </div>
    </div>
    )
  }

export default Card