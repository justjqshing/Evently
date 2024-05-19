'use client'
import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type cardProps = {
    event: IEvent,
    hasOrderLink: boolean,
    hidePrice: boolean
}
const Card = async ({ event, hasOrderLink, hidePrice }: cardProps) => {
    console.log(event)
    const time = new Date(event.startDateTime)
    console.log(time)
    
    return (
        <div>

        </div>
    )
  }

export default Card