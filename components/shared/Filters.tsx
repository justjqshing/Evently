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
import Search from './Search'
import CategoryFilter from './CategoryFilter'
const Filters = ({ limit, searchParams }: { limit: number } & SearchParamProps) => {
  const router = useRouter();
  const [saved, setSaved] = useState(false); 
  const [resetSearch, setResetSearch] = useState(false);
 

  const lim = parseInt(searchParams?.limit as string) || 6;
  console.log('the lim is' + lim)

  const clearFilter = () => {
    const newSearchParams = new URLSearchParams();

    newSearchParams.forEach((_, value) => newSearchParams.delete(value));
    router.push(`?${newSearchParams.toString()}`, { scroll: false }); 
    setResetSearch(true)
  };

  return (
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12 text-center">
    <div className="flex w-full flex-col gap-5 md:flex-row">
    <Search reset={resetSearch} setSaved={setResetSearch}/>
    <CategoryFilter/>
     
    
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

        {/* Conditionally show success message */}
      
      </div>
    </div>
    </section>
    
  );
}

export default Filters
