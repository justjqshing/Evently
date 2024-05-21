
import {
    Sheet,
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
const MobileNav = () => {
  const { sessionClaims } = auth()

    const userId = sessionClaims?.userId as string
  return (
    <nav className="md:hidden">
        <Sheet>
            <SheetTrigger className='align-middle'>
                <Image src='/assets/icons/menu.svg' height={24} width={24} alt="Dropdown Icon"/>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-6 bg-white md:hidden ">
               <Image src='/assets/images/logo.svg' width={128} height={38} alt="Logo"/>
               <Separator className="border border-gray-50"/>
               <Navitems userId={userId}/>
            </SheetContent>
            
        </Sheet>

    </nav>
  )
}

export default MobileNav