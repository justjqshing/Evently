'use client'

import { useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { Input } from '../ui/input';
import { formUrlQuery } from '@/lib/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const Search = ({reset, setReset}: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const pathname = usePathname();
  useEffect(() => {
    console.log(reset)
  }, [reset]);

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
    }, 100);

    return () => clearTimeout(delayDebounceFn); // Clear timeout on unmount
  }, [query, pathname]); 

  const handleInputChange = (e: any) => {
    setReset(false);

      setQuery(e.target.value); 

  };
 
  return (
    <div className='flex-center min-h-[54px] overflow-hidden rounded-full bg-gray-50 px-4 py-2 w-full '>
      <Image src='/assets/icons/search.svg' width={24} height={24} alt='search icon'/>
      <Input
        type="text"
        placeholder='Search Events...'
        value={reset ? '' : query}
        onChange={handleInputChange}
        className="p-regular-16 border-0 bg-transparent outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;