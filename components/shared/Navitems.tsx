'use client'
import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SheetClose, Sheet } from '../ui/sheet'

const NavItems = (userId: any) => {
  const pathname = usePathname()


  return (

    <ul className='md:flex-between flex w-full md:flex-row flex-col gap-5 justify-center'>
    {headerLinks.map((link) => {
      const isactive = pathname === link.route 
      const isativ = pathname === `/${userId.userId}/profile`
      console.log(`this is active ${isactive} and this is active ${isativ}`)
      return (
        <li key={link.label} className={`${isactive && 'text-primary-500 '}`} >
          <div className="flex items-start text-start justify-start">
            <div
              className={`${!isactive && link.label != 'My Profile' ? 'relative text-black hover:text-gray-400 cursor-pointer transition-all ease-in-out text-start flex justify-start before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-primary-500 before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-primary-500 after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]' : ''}
              ${!isativ && link.label == 'My Profile' ? 'relative text-black hover:text-gray-400 cursor-pointer transition-all ease-in-out text-start flex justify-start before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-primary-500 before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-primary-500 after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]' : ''}
              `}>
              <span>
                <Link href={link.label != 'My Profile' ? link.route : `/${userId.userId}/profile/`} className={`${isactive && link.label != 'My Profile' ? 'border-b-2 border-primary-500' : ''} ${link.label == 'My Profile' && isativ ? 'border-b-2 text-primary-500 border-primary-500' : ''}` }>{link.label}</Link>
              </span>
            </div>
          </div>
        </li>
      )
    })}
  </ul>


    
  )
}

export default NavItems