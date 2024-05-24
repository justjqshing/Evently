"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from 'next/image'


const Limit = ({ limit }: { limit: number }) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  let delayDebounceFn: NodeJS.Timeout | null = null;
  useEffect(() => {
    const limit = parseInt(searchParams.get('limit') as string) || 6;
    console.log(limit)
  }, [])

  const handleChange = (limit: string) => {
    
      if (delayDebounceFn) {
        clearTimeout(delayDebounceFn);
      }

      delayDebounceFn = setTimeout(() => {
        let newUrl = '';

        if(limit && limit !== 'All') {
          newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'limit',
            value: limit
          })
        } else {
          newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['limit']
          })
        }

        router.push(newUrl, { scroll: false });
      }, 300)
    }

  

   





  return (
    <div className='flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
    <Image src='/assets/icons/search.svg' width={24} height={24} alt='search icon'/>
    <Input 
    type="text"
    placeholder='Max Events/Page'
    defaultValue={limit}
    onChange={(e) => handleChange(e.target.value)}
    className="p-regular-16 border-0 bg-transparent outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
  />
</div>
      
  )
}

export default Limit