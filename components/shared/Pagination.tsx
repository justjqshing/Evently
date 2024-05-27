"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'
import { useEffect } from 'react'

type PaginationProps = {
  page: number | string,
  totalPages: number,
  urlParamName?: string
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {

  const router = useRouter()
  const searchParams = useSearchParams()


  let parampage = Number(searchParams.get('page') || 1)
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1)

  useEffect(() => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: '1',
    })

    router.push(newUrl, {scroll: false})
  }, [totalPages])

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next' 
      ? parampage + 1 
      : parampage - 1

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    })

    router.push(newUrl, {scroll: false})
  }

  const numClick = (num: string) => {
    parampage = Number(num)
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: num.toString(),
    })

    router.push(newUrl, {scroll: false})
  }
  
  

  return (
    <div className="flex items-center gap-5">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick('prev')}
        disabled={parampage <= 1}
      >
        Previous
      </Button>
      {pagesArray.map((item, index) => ( 
        <Button variant='outline' onClick={() => numClick(String(item)) }className={`${Number(item) - 1 === parampage || Number(item) + 1 === parampage || Number(item) === parampage ? 'flex' : 'hidden'} ${item == parampage ? 'bg-coral' : ''}`}>{item}</Button>
      ))}
      
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick('next')}
        disabled={parampage >= totalPages}
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination