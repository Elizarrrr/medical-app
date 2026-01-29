"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const megaMenu=[
    {
        title:"Top Booked",
        services:[
            {
                title:"In-person Doctor Visit",
                slug:"",
                description:"Give Description Here"
            },
            {
                title:"Urgent Care Visit",
                slug:"",
                description:"Give Description Here"
            },
            {
                title:"Nutritional Counseling",
                slug:"",
                description:"Give Description Here"
            },
            {
              title:"Telehealth Consultation",
              slug:"",
              description:"Give Description Here"
          }
        ],
    },  

    {
        title:"Doctors",
        services:[
            {
                title:"In-person doctor visit",
                slug:"",
                description:"Give Description Here"
            },
            {
                title:"Urgent care visit",
                slug:"",
                description:"Give Description Here"
            },
            {
                title:"Mental health consult",
                slug:"",
                description:"Give Description Here"
            }
        ],
    }, 

    {
        title:"Specialists",
        services:[
            {
                title:"In-person doctor visit",
                slug:"",
                description:"Give Description Here"
            },
            {
                title:"Urgent care visit",
                slug:"",
                description:"Give Description Here"
            },
            {
                title:"Mental health consult",
                slug:"",
                description:"Give Description Here"
            }
        ],
    },  
];

export default function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-4">
        {megaMenu.map((item,i) => {
            return (
                <NavigationMenuItem key={i}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {item.services.map((services) => (
                        <ListItem
                        key={services.title}
                        title={services.title}
                        href={services.slug}
                        >
                        {services.description}
                        </ListItem>
                    ))}
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>
            );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
