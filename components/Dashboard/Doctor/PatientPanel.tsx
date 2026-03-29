"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { UserRole } from "@prisma/client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PatientProps } from "@/app/(back)/dashboard/doctor/patients/layout";

export default function PatientPanel({patients,role}:{patients:PatientProps[];role:UserRole}) {

    const pathname = usePathname();
    console.log(role);

    return(
        <ScrollArea className="h-96 w-full">
          {patients.map((item) => (
            <Link key={item.patientId} href={`/dashboard/doctor/patients/view/${item.patientId}`} 
              className={cn("border border-gray-300 mb-2 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:bg-slate-950", 
              pathname===`/dashboard/doctor/patients/view/${item.patientId}` && "border-teal-600"
              )}
            >
              <div className="flex justify-between item-center pb-2">
                  <h2>{item.name}</h2>
                  {/* <span className="font-medium">{item.appointmentTime}</span> */}
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2"/>
                    <span>{item.location}</span>
                  </div>
              </div>

              <div className="flex items-center gap-4 border-b">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2"/>
                    <span className="font-medium">{item.email}</span>
                  </div>
                  {/* <span className="font-medium">{item.phone}</span> */}
                  {/* <div className="flex items-center">
                    <History className="h-4 w-4 mr-2"/>
                    <span>{getTimeAgo(item.createdAt)}</span>
                  </div> */}
              </div>

              <div className="flex items-center pt-2">
                <span className="text-teal-600 font-medium dark:text-teal-400">{item.gender}</span>
              </div>
            </Link>
          ))}   
        </ScrollArea>
    );
}