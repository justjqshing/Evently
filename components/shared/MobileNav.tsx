'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import { Separator } from "../ui/separator"
import Navitems from "./Navitems"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { setISODay } from "date-fns"


const MobileNav = () => {
  const router = useRouter();
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const res = await fetch('/api/webhook/clerk');
        if (!res.ok) {
          throw new Error(`Error fetching user ID: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setUserId(data.userId);
      } catch (error) {
        console.error("Error fetching auth data:", error);
      }
    };

    fetchAuthData();
  }, []);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  return (
    <nav className="md:hidden">
        <Sheet open={isOpen}>
            <SheetTrigger className='align-middle'>
                <Image src='/assets/icons/menu.svg' height={24} width={24} alt="Dropdown Icon" onClick={() => setIsOpen(true)}/>
            </SheetTrigger>
            
            <SheetContent className="flex flex-col gap-6 bg-white md:hidden ">
              <div className="flex flex-row justify-between">
                <Image src='/assets/images/logo.svg' width={128} height={38} alt="Logo"/>
                <SheetClose>
                <X className="h-5 w-5" onClick={() => setIsOpen(false)}/>

                </SheetClose>
                
                

              </div>
               
               <Separator className="border border-gray-50"/>
               <Navitems userId={userId}/>

            </SheetContent>

            
            
        </Sheet>

    </nav>
  )
}

export default MobileNav