'use client'
import Image from 'next/image'
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Limit from './Limit'
import { useState } from 'react'
const Filters = ({ limit }: { limit: number })  => {
  const [saved, setSaved] = useState(false)
  console.log(`the limit is ${limit}`)
  return (
    <div className='hover:cursor-pointer'>
    <div className='w-12 h-12 p-0 flex justify-center items-center bg-grey-50 rounded-full'>
      <AlertDialog>
      <AlertDialogTrigger asChild>
      <div className='w-12 h-12 p-0 flex justify-center items-center bg-grey-50 rounded-full'>
        <Image src='/assets/icons/filter.svg' width={24} height={24} alt="Filters"/>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader>
          <AlertDialogTitle>Filters & Sorting</AlertDialogTitle>
          <AlertDialogDescription>
            <Limit limit={limit}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setSaved(true)}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      
    </div>
    </div>
  )
}

export default Filters