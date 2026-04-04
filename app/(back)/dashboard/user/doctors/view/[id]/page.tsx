import React from "react";
import { CalendarCheck, History } from "lucide-react";
import { getPatientAppointments } from "@/actions/appointments";
import Link from "next/link";
import { getTimeAgo } from "@/utils/timeAgo";
import { cn } from "@/lib/utils";

// export default async function page({params:{id}}:{params:{id:string}}) {
//     const appointments = (await getPatientAppointments(id)).data||[];
export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const appointments = (await getPatientAppointments(id)).data||[];
    return(
        <div className="p-4">
            <h2 className="border-b pb-3 mb-3">Appointments ({appointments.length.toString().padStart(2,"0")})</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {appointments.map((item)=>{
                    return(
                        <Link key={item.id} href={`/dashboard/doctor/appointments/view/${item.id}`} className={cn("border border-gray-300 dark:border-gray-700 mb-2 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:bg-black")}>
                        {/* <Link key={item.id} href={`/dashboard/doctor/appointments/view/${item.id}`} 
                        className={cn(
                        "border border-red-300 mb-2 shadow-sm text-xs bg-white py-3 px-2 
                        inline-block w-full rounded-md", 
                        (item.status==="approved" && "border-teal-400 border-2" && pathname===`/dashboard/doctor/appointments/view/${item.id}` && "border-2 bg-green-100")  || 
                        (pathname===`/dashboard/doctor/appointments/view/${item.id}` && "border-2 bg-green-50"))}> */}
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
                                <div className="flex items-center pt-2">
                                {/* <div className={cn("flex items-center pt-2 text-blue", item.status==="approved" && "text-green-600 font-medium")}> */}
                                  {/* {item.status==="pending"?(<CircleEllipsis className="w-4 h-4 mr-2"/>):item.status==="approved"?(<Check className="w-4 h-4 mr-2"/>):(<X className="w-4 h-4 mr-2"/>)} */}
                                  <span className="text-teal-600 font-medium dark:text-teal-400">{item.status}</span>
                                </div>
                        </Link>
                    );
                })
                
                }
            </div>    
        </div>
    );
}