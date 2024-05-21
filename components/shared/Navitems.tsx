'use client'
import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = (userId: any) => {
  const pathname = usePathname()


  return (
    <ul className='md:flex-between flex w-full md:flex-row flex-col gap-5 justify-center'>
      {headerLinks.map((link) => {
        const isactive = pathname === link.route
        return (
        <li key={link.label} className={`${isactive && 'text-primary-500 '}`}>
          <Link href={link.label != 'My Profile' ? link.route : `/${userId.userId}/profile/`} className={`${isactive && 'border-b-2 border-primary-500'}`}>{link.label}</Link>
        </li>
        )
  })}
    </ul>
  )
}

export default NavItems