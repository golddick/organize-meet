'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import { Sidebar } from "../sidebar/Sidebar"
import Link from "next/link"
import Image from "next/image"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
  

export const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsOpen(false)
    },[pathname])
  return (
   <section className="w-full max-w-[260px]">
         <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
    <SheetTrigger asChild>
        <Button variant='secondary' className=" md:hidden" >
            <MenuIcon className=" size-5"/>
        </Button>
    </SheetTrigger>
    <SheetContent side='left' className=" border-none lg:hidden  bg-muted-foreground">
        <SheetTitle>

    <Link href='/' className='flex items-center gap-1 p-2'>
      <Image
      src='/icons/bnt.png'
      alt='logo'
      width={100}
      height={50}
      className=' object-contain'
      />
      </Link>
      </SheetTitle>
      <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
        <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16 ">
            {sidebarLinks.map((nav) => {
                // const isActive = pathname === nav.route || pathname.startsWith(nav.route)
                const isActive = pathname === nav.route 
                return(
                    <Link href={nav.route} key={nav.title} className={cn('flex gap-4 items-center p-4 rounded-lg w-full hover:opacity-75', isActive ? 'bg-white text-black' : 'bg-transparent')}>
                        <Image
                        src={nav.imgUrl}
                        alt={nav.title}
                        width={24}
                        height={24}
                        />
                        <p className='font-semibold text-lg'>{nav.title}</p>
                    </Link>
                )
            })}
            </section>
        </SheetClose>
      </div>
    </SheetContent>
</Sheet>
   </section>
  )
}
