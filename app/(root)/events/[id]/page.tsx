import { SearchParamProps } from '@/types'
import React from 'react'
import { getEventById } from '@/lib/actions/event.actions'
import moment from 'moment-timezone';

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  console.log(id)
  const event = await getEventById(id);
  const date = moment(event.startDateTime).tz(moment.tz.guess()).format('LLLL');
  
  return (
    <div>{date}</div>
  )
}

export default EventDetails