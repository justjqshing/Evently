
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './Navitems'
import MobileNav from './MobileNav'
import { auth } from '@clerk/nextjs/server'

const Header = () => {
    const { sessionClaims } = auth()

    const userid = sessionClaims?.userId as string
    const name = sessionClaims?.name as string
    console.log(`The User id is : ${name} also ${userid}`)
  return (
    <header className="w-full border-b">
        <div className='wrapper flex items-center justify-between'>
            <Link href='/' className='w-36'>
                <Image src='/assets/images/logo.svg' width={128} height={38} alt='Evently Logo'/>
            </Link>
            <SignedIn>
                <nav className='md:flex-between  hidden w-full max-w-xs'>
                <NavItems userId={userid} />
                </nav>
            </SignedIn>
            <div className='flex w-32 justify-end gap-3'>
                <SignedOut>
                    <Button asChild className='rounded-full' size='lg'>
                        <Link href='/sign-in'>Sign In</Link>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl='/'/>
                    <MobileNav/>
                    
                </SignedIn>
            </div>

        </div>
    </header>
  )
}

export default Header