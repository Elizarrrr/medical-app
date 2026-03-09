"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { docsConfig } from "@/config/docs";

export function MainNav() {
  const pathname = usePathname()

  // const mainNavLinks = [
  //   { name:"Home", path:"/home"},
  //   { name:"Find Doctor", path:"/find-doctor"},
  //   { name:"Telehealth Visit", path:"/telehealth"},
  //   { name:"In-person Visit", path:"/doctors"},
  //   { name:"Be service provider", path:"/about"}, //"/join/doctors"
  //   // { name:"Partner with us", path:"/about"},
  //   { name:"About", path:"/about"},
  // ]

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        {/* <img alt="" src="/oasislogo2.png" className="h-14 w-14"/> */}
        <Image 
          src="/oasislogo2.png" 
          alt="Oasis Logo" 
          width={56}  // h-14 = 3.5rem = 56px
          height={56} // w-14 = 3.5rem = 56px
          className="h-14 w-14"
        />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
      
      {
        docsConfig.mainNav?.map((item,i)=>{
          return(
            <Link 
              key={i}
              href={item.href??"#"}
              className={cn(
                "transition-colors hover:text-foreground/60",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          )
        })
      }

      </nav>
    </div>
  )
}