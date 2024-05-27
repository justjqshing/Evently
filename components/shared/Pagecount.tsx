'use client'
import { useSearchParams } from "next/navigation"
type PaginationProps = {
    totalPages: number,
  }
const Pagecount = ({ totalPages }: PaginationProps) => {
    const searchParams = useSearchParams()
    const Currentpage = searchParams.get('page') || 1
  return (
    <div className="-mt-7 text-sm text-slate-600 -mb-7">Page {Currentpage} - {totalPages}</div>
  )
}

export default Pagecount