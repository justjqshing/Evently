'use client'
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button'; // Adjust the import path as needed
import { formUrlQuery } from '@/lib/utils'; // Adjust the import path as needed

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string; // Optional parameter for custom URL parameter name
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paramPage, setParamPage] = useState(Number(searchParams.get('page') || 1));

  useEffect(() => {
    // Ensure the current page is within valid bounds
    if (totalPages > 0 && (paramPage < 1 || paramPage > totalPages)) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: urlParamName || 'page',
        value: '1', // Reset to first page if out of bounds
      });
      router.push(newUrl, { scroll: false });
    }
  }, [totalPages, paramPage]);

  // Calculate visible page numbers (only three)
  const visiblePages = [];
  const midPoint = 1; // For 3 pages, the midpoint is always 1
  let startPage = Math.max(1, paramPage - midPoint);
  let endPage = startPage + 2; // Show 3 pages

  // Adjust if at the beginning or end
  if (startPage === 1 && totalPages > 3) {
    endPage = 3; 
  } else if (endPage > totalPages) {
    startPage = totalPages - 2;
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const handlePageClick = (newPage: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: newPage.toString(),
    });
    setParamPage(newPage);
    router.push(newUrl, { scroll: false }); 
  };

  return (
    <div className="flex items-center gap-5">
      {/* Previous Button */}
      <Button
        size="lg"
        variant="outline"
        className="sm:w-28 w-20"
        onClick={() => handlePageClick(paramPage - 1)}
        disabled={paramPage <= 1}
      >
        Previous
      </Button>

      {/* Page Number Buttons */}
      {visiblePages.map((item) => (
        <Button
          key={item}
          variant={item === paramPage ? "default" : "outline"}
          onClick={() => handlePageClick(item)}
          className="transition-colors duration-300 ease-in-out hover:bg-coral"
        >
          {item}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        size="lg"
        variant="outline"
        className="sm:w-28 w-20"
        onClick={() => handlePageClick(paramPage + 1)}
        disabled={paramPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
