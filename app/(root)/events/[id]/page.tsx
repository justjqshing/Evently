import { SearchParamProps } from '@/types'
import React from 'react'
import { getEventById } from '@/lib/actions/event.actions'

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  console.log(id)
  const event = await getEventById(id);
  const date = new Date(event.startDateTime).toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    timeZoneName: 'short'
  });
  
  return (
    <div>{date}</div>
  )
}

export default EventDetails