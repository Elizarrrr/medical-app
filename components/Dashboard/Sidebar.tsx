"use client";

import { AlarmClock, Bell, Home, LayoutGrid, Mail, Microscope, Settings, User2, Users, Users2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import { signOut } from "next-auth/react";

{/*
export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action."

export const iframeHeight = "800px"

export const containerClassName = "w-full h-full"
*/}

export default function Sidebar({session}:{session:Session}) {
  const {user}=session;
  const role = user?.role;
  const id = user.id;
  const pathname = usePathname();

  const roles = {
    USER:[
      {title: "Dashboard", path: "/dashboard",icon: Home},
      {title: "Appointments", path: "/dashboard/user/appointments",icon: AlarmClock},
      {title: "Doctors", path: "/dashboard/user/doctors", icon: Users},
      {title: "Inbox", path: "/dashboard/user/inbox", icon: Mail},
      // {title: "Settings", path: "/dashboard/user/settings",icon: Settings},
    ],
    ADMIN:[
      {title: "Dashboard", path: "/dashboard",icon: Home},
      {title: "Services", path: "/dashboard/services",icon: LayoutGrid},
      {title: "Specialties", path: "/dashboard/specialties",icon: Microscope},
      {title: "Doctors", path: "/dashboard/doctors",icon: Users},
      {title: "Patients", path: "/dashboard/patients",icon: Users2},
      {title: "Appointments", path: "/dashboard/appointments",icon: AlarmClock},
      // {title: "Settings", path: "/dashboard/settings",icon: Settings},
      // {title: "Online", path: "/",icon: Globe}
    ],
    DOCTOR:[
      {title: "Dashboard", path: "/dashboard", icon: Home},
      {title: "Appointments", path: "/dashboard/doctor/appointments", icon:AlarmClock},
      {title: "Patients", path: "/dashboard/doctor/patients", icon: Users},
      {title: "Inbox", path: "/dashboard/doctor/inbox", icon: Mail},
      {title: "Profile", path: `/dashboard/doctor/profile/${id}`, icon: User2},
      {title: "Settings", path: "/dashboard/doctor/settings", icon: Settings},
      // {title: "Tasks", path: "/dashboard/doctor/tasks", icon: CalendarFold},
    ]
  };

  //console.log(role);

  // let sideBarLinks = roles[role] || [];
  const sideBarLinks = roles[role] || [];

  const router = useRouter();

  async function handleLogout(){
    await signOut()
    router.push("/login")
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              {/* <Package2 className="h-6 w-6" /> */}
              {/* <img
              alt=""
              src="/oasislogo2.png"
              className="h-16 w-auto"/> */}

              <Image 
                alt="Oasis Logo"
                src="/oasislogo2.png"
                width={120} // or appropriate width
                height={64} // or appropriate height
                className="h-16 w-auto"
              />

              <span className="">Oasis Hospital</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {
                  sideBarLinks.map((item,i)=>{
                    const Icon = item.icon; 
                    return(
                      <Link key={i}
                        href={item.path}
                        className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", 
                          pathname === item.path ? "bg-muted text-primary": ""
                        )}>
                        <Icon className="h-4 w-4" />
                        {item.title}
                        {/* {
                          item.badgeCount && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{item.badgeCount}</Badge>
                        } */}
                      </Link>
                    );
                  })
                }
            </nav>
          </div>
          {/* <div className="mt-auto p-4">
          <Button size="sm" className="w-full">
            <Power className="w-4 h-4 mr-1"/>
            Logout
          </Button>
          </div> */}
        </div>
      </div>
  );
}