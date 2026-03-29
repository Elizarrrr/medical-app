import React from "react";
import { Calendar } from "lucide-react";
import { getAppointmentById } from "@/actions/appointments";
import UpdateAppointmentForm from "@/components/Dashboard/Doctor/AvailabilityDays/UpdateAppointmentForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// export default async function Page({params:{id}}:{params:{id:string}}) {
//     const appointment = await getAppointmentById(id);
interface PageProps {
    params: Promise<{  // params is now a Promise
      id: string;
    }>;
    searchParams?: Promise<Record<string, string>>; // searchParams is also a Promise
}
  
export default async function Page({ params }: PageProps) {
    // Await params first, then extract id
    const { id } = await params;

    // Get appointment using the extracted id
    const appointment = await getAppointmentById(id);
    return(
        <div>
            <div className="flex items-center justify-between px-4 py-4 border-b">
                <div className="">
                    <h2 className="scroll-m-20 pb-2 text-xl font-medium tracking-tight first:mt-0">{`${appointment?.firstName} ${appointment?.lastName}`}</h2>
                    <div className="flex space-x-2 divide-x-2 divide-gray-200 dark:divide-gray-600 text-sm">
                        {/* <p className="">{appointment?.gender}</p> */}
                        {/* <p className="px-2">{appointment?.phone}</p> */}
                        <p className="">{appointment?.email}</p>
                    </div>
                </div>
                <div className="">
                    <h2 className="scroll-m-20 pb-2 text-xl font-medium tracking-tight first:mt-0">{appointment?.appointmentFormattedDate}</h2>
                    <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2"/>
                        <span>{appointment?.appointmentTime}</span>
                    </div>
                </div>
            </div>

            <div className="py-4">

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 dark:divide-gray-600 border-b">
                    <p className="px-3 font-medium">Reason</p>
                    <p className="px-3">{appointment?.appointmentReason}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 dark:divide-gray-600 border-b">
                    <p className="px-3 font-medium">Date of Birth</p>
                    <p className="px-3">{appointment?.dob?.toISOString().split("T")[0]}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 dark:divide-gray-600 border-b">
                    <p className="px-3 font-medium">Gender</p>
                    <p className="px-3">{appointment?.gender}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 dark:divide-gray-600 border-b">
                    <p className="px-3 font-medium">Email</p>
                    <p className="px-3">{appointment?.email}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 dark:divide-gray-600 border-b">
                    <p className="px-3 font-medium">Location</p>
                    <p className="px-3">{appointment?.location}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 dark:divide-gray-600 border-b">
                    <p className="px-3 font-medium">Phone Number</p>
                    <p className="px-3">{appointment?.phone}</p>
                </div>

                {/* <div className="flex divide-x-2 px-4 py-3 divide-gray-200 dark:divide-gray-600 border-b">
                    <p className="px-3 font-medium">Medical Docs</p>
                    <div className="grid grid-cols-4 px-3">
                        {appointment?.medicalDocuments.map((item, i)=>{
                            return(
                                <Button key={i} variant={"outline"} asChild>
                                    <Link target="_blank" href={item} download>{`Doc-${i+1}`}</Link>
                                </Button>
                            )
                        })}
                    </div>
                </div> */}

                <div className="">{/* Update Form */}
                    {appointment && appointment.id && <UpdateAppointmentForm appointment={appointment}/>}
                </div>

            </div>       
   
        </div>
    );
}