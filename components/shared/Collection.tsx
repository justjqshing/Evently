
import React from 'react'
import { IEvent } from '@/lib/database/models/event.model'
type collectionProps ={
    data: IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page:  number | string,
    totalPages?: number
    urlParamName?: string
    collectionType?: 'Events_Organized'| 'My_Tickets' | "All_Events"
} // Add a closing parenthesis here
import Card from './Card'
const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    collectionType,
    limit,
    totalPages,
    urlParamName,

    }: collectionProps) => {
  return (
    <>
    {data.length > 1 ? (
      <div className='flex flex-col items-center'>
        <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
          {data.map((event, index) => {
            const hasOrderLink = collectionType === 'My_Tickets'
            const hidePrice = collectionType === 'My_Tickets'

            return (
              <li key={event._id}>
                <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice}/>
              </li>
            )

          })}
          
        </ul>
        </div>
      )
    : (
      <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
      <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
      <p className="p-regular-14">{emptyStateSubtext}</p>
    </div>
    )}
    </>
)}

export default Collection