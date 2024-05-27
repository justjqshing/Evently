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
import Pagecount from './Pagecount'
import { SearchParamProps } from '@/types'
import { useRouter } from 'next/navigation'
import Limit from './Limit'
import { useState, useEffect } from 'react'
import Search from './Search'
import CategoryFilter from './CategoryFilter'
const Filters = ({ totalPages, limit, searchParams }: { limit: number } & {totalPages?: number} & SearchParamProps) => {
  const router = useRouter();
  const [saved, setSaved] = useState(false); 
  const [resetSearch, setResetSearch] = useState(false);
  const [resetCategory, setResetCategory] = useState(false);
 

  const lim = parseInt(searchParams?.limit as string) || 6;
  console.log('the lim is' + lim)

  const clearFilter = () => {
    const newSearchParams = new URLSearchParams();

    newSearchParams.forEach((_, value) => newSearchParams.delete(value));
    router.push(`?${newSearchParams.toString()}`, { scroll: false }); 
    setResetSearch(true)
    setResetCategory(true)
  };

  return (
    <section className="wrapper my-0 flex flex-col gap-8 md:gap-12 text-center">
      <div className='w-full flex justify-end -mb-7'>
        <Pagecount totalPages={totalPages}/>
     </div>
    <div className="flex w-full flex-col gap-5 md:flex-row">
    <div className='flex w-full md:flex-row flex-col gap-5'>
      <div className=' flex flex-grow-[3]'>
        <Search reset={resetSearch} setReset={setResetSearch}/>
      </div>
      <div className='flex flex-row  flex-grow-[1] gap-5'>
        <CategoryFilter reset={resetCategory} setReset={setResetCategory}/>


     
    
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
        </div>

        {/* Conditionally show success message */}
      
      </div>
    </div>
    </section>
    
  );
}

export default Filters
