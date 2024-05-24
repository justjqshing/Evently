'use client';

import { useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSearchContext } from './searchContext'; // Import the context

const Search = () => {
  const { query, setQuery } = useSearchContext(); // Access context values
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Update URL when query changes (with debounce)
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Cleanup on unmount
  }, [query, router, searchParams]); 

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
      <Image src="/assets/icons/search.svg" width={24} height={24} alt="search icon" />
      <Input
        type="text"
        placeholder="Search Events..."
        value={query} // Bind input value to the context's query
        onChange={(e) => setQuery(e.target.value)} // Update context on change
        className="p-regular-16 border-0 bg-transparent outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;