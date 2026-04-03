"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DoctorProps } from "@/app/(back)/dashboard/user/doctors/layout";
import generateSlug from "../../../utils/generateSlug";

// export default function DoctorsPanel({doctors,role}:{doctors:DoctorProps[];role:UserRole}) {
export default function DoctorsPanel({ 
    doctors, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    role: _role 
    }: { 
    doctors: DoctorProps[]; 
    role: UserRole 
    }) {

    const pathname = usePathname();
    // console.log(role);

    return(
        <ScrollArea className="h-96 w-full">
                {doctors.map((item,i) => {
                  const slug = generateSlug(item.doctorName);
                  return(
                    <Link 
                        key={i} 
                        href={`/doctors/${slug}?id=${item.doctorId}`} 
                        className={cn(
                            "border border-gray-300 dark:border-gray-700 mb-2 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:bg-slate-950", 
                            pathname===`/dashboard/doctor/patients/view/${item.doctorId}` && "border-sky-600"
                        )}
                    >
                            <div className="flex justify-between item-center pb-2">
                                <h2>{item.doctorName}</h2>
                            </div>
                    </Link>
                  );
                })}   
        </ScrollArea>
    );
}