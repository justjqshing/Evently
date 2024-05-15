import { SearchParamProps } from '@/types'
import React from 'react'
import { getEventById } from '@/lib/actions/event.actions'
import moment from 'moment';

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  console.log(id)
  const event = await getEventById(id);
  const date = moment(event.startDateTime).format('LLLL');
  
  return (
    <div>{date}</div>
  )
}

export default EventDetails