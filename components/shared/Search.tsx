'use client'

import { useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { Input } from '../ui/input';
import { formUrlQuery } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'query',
        value: query,
      });

      if (query !== searchParams.get('query')) {
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Clear timeout on unmount
  }, [query, router, searchParams]); 

  const handleInputChange = (e: any) => {
    setQuery(e.target.value); 
  };

  return (
    <div className='flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
      <Image src='/assets/icons/search.svg' width={24} height={24} alt='search icon'/>
      <Input
        type="text"
        placeholder='Search Events...'
        value={query} // Bind input value to the query state
        onChange={handleInputChange}
        className="p-regular-16 border-0 bg-transparent outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;