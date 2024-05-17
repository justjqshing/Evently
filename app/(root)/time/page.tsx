'use client'
import React, { useEffect, useState } from 'react';
import { getEventById } from '@/lib/actions/event.actions';

const Time = () => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const event = await getEventById('66477d845e28a69c8e75dea1');

        const startTimeString = ('');
        const eventDate = new Date('2024-05-18T20:00:00.000Z');

        // Correct options for toLocaleTimeString
        const options: Intl.DateTimeFormatOptions = {
          hour: 'numeric',  
          minute: 'numeric', 
          hour12: true       
        };
        const formattedTime = eventDate.toLocaleTimeString(undefined, options);

        setFormattedTime(formattedTime);
      } catch (error) {
        console.error("Error fetching or parsing event time:", error);
        setFormattedTime("Error loading time");
      }
    };

    fetchData();
  }, []);

  return <div>{formattedTime}</div>;
};

export default Time;