import { SearchParamProps } from '@/types';
import React from 'react';
import { getEventById } from '@/lib/actions/event.actions';

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);

  // Get the event's start date and time in ISO format (important for timezones)
  const eventStartIso = new Date(event.startDateTime).toISOString();
  console.log(new Date(eventStartIso).toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    timeZoneName: 'short' 
  }))

  return (
    <div>
     
        <span>
          
        </span>
      </div>
  );
};

export default EventDetails;