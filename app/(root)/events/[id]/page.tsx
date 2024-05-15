import { SearchParamProps } from '@/types'
import React, { useEffect, useState } from 'react'
import { getEventById } from '@/lib/actions/event.actions'
import moment from 'moment-timezone';

const EventDetails = ({ params: { id } }: SearchParamProps) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchEventAndSetDate = async () => {
      const event = await getEventById(id);
      const formattedDate = moment(event.startDateTime).tz(moment.tz.guess()).format('LLLL');
      setDate(formattedDate);
    };

    fetchEventAndSetDate();
  }, [id]);

  return (
    <div>{date}</div>
  )
}

export default EventDetails