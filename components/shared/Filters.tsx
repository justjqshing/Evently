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
import { SearchParamProps } from '@/types'
import { useRouter } from 'next/navigation'
import Limit from './Limit'
import { useState, useEffect } from 'react'
const Filters = ({ limit, searchParams }: { limit: number } & SearchParamProps) => {
  const router = useRouter(); // Get router for navigation
  const [saved, setSaved] = useState(false);
 

 const lim = parseInt(searchParams?.limit as string) || 6;
 console.log('the lim is' + lim)
  const clearFilter = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.forEach((_, key) => newSearchParams.delete(key));
    router.push(`?${newSearchParams.toString()}`, {scroll: false}); // Navigate to the cleared URL
  };
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
          <AlertDialogCancel onClick={() => clearFilter()}>Clear</AlertDialogCancel>
          <AlertDialogAction onClick={() => setSaved(true)}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      
    </div>
    </div>
  )
}

export default Filters