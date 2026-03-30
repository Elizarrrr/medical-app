"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { CalendarCheck, Check, CircleEllipsis, History, X } from "lucide-react";
import { Appointment, UserRole } from "@prisma/client";
import { getTimeAgo } from "@/utils/timeAgo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ListPanel({appointments,role}:{appointments:Appointment[];role:UserRole}) {

    const pathname = usePathname();
    console.log(role);

    return(
        <ScrollArea className="h-96 w-full">
          {appointments.map((item) => (
            <Link 
              key={item.id} 
              href={`/dashboard/${role==="USER"?"user":"doctor"}/appointments/view/${item.id}`} 
              className={cn(
                "border border-gray-300 mb-2 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:bg-slate-950", 
                pathname===`/dashboard/doctor/appointments/view/${item.id}` && "border-teal-600"
              )}
            >

            {/* <Link key={item.id} href={`/dashboard/doctor/appointments/view/${item.id}`} 
            className={cn(
            "border border-gray-300 mb-2 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900", 
            pathname===`/dashboard/doctor/appointments/view/${item.id}` && "border-2 border-green-50")}> */}
              
              <div className="flex justify-between item-center pb-2">
                  <h2>{item.firstName} {item.lastName}</h2>
                  {/* <span className="font-medium">{item.appointmentTime}</span> */}
                  <div className="flex items-center">
                    <History className="h-4 w-4 mr-2"/>
                    <span>{getTimeAgo(item.createdAt)}</span>
                  </div>
              </div>

              <div className="flex items-center gap-4 border-b">
                  <div className="flex items-center">
                    <CalendarCheck className="w-4 h-4 mr-2"/>
                    <span className="font-medium">{item.appointmentFormattedDate}</span>
                  </div>
                  <span className="font-medium">{item.appointmentTime}</span>
                  {/* <div className="flex items-center">
                    <History className="h-4 w-4 mr-2"/>
                    <span>{getTimeAgo(item.createdAt)}</span>
                  </div> */}
              </div>

              <div className={cn("flex items-center pt-2 text-blue", item.status==="approved" && "text-teal-600 dark:text-teal-400 font-medium")}> 
                  {item.status==="pending"?(<CircleEllipsis className="w-4 h-4 mr-2"/>):item.status==="approved"?(<Check className="w-4 h-4 mr-2"/>):(<X className="w-4 h-4 mr-2"/>)}
                  <span>{item.status}</span>
              </div>
              {/* <div className="flex items-center pt-2">
                <span className="text-teal-600 font-medium dark:text-teal-400">{item.status}</span>
              </div> */}
            </Link>
          ))}   
        </ScrollArea>
    );
}