import React from "react";
import { Calendar } from "lucide-react";
import { getAppointmentById } from "@/actions/appointments";
import UpdateAppointmentForm from "@/components/Dashboard/Doctor/AvailabilityDays/UpdateAppointmentForm";

// export default async function Page({params:{id}}:{params:{id:string}}) {
//     const appointment = await getAppointmentById(id);
interface PageProps {
    params: {
      id: string;
    };
    searchParams?: Record<string, string>;
}
  
export default async function Page({ params }: PageProps) {
    const appointment = await getAppointmentById(params.id);
    return(
        <div>
            <div className="flex items-center justify-between px-4 py-4 border-b">
                <div className="">
                    <h2 className="scroll-m-20 pb-2 text-xl font-medium tracking-tight first:mt-0">{`${appointment?.firstName} ${appointment?.lastName}`}</h2>
                    <div className="flex space-x-2 divide-x-2 divide-gray-200 text-sm">
                        {/* <p className="">{appointment?.gender}</p> */}
                        {/* <p className="px-2">{appointment?.phone}</p> */}
                        <p className="text-white">{appointment?.email}</p>
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

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                    <p className="px-3 font-medium">Reason</p>
                    <p className="px-3">{appointment?.appointmentReason}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                    <p className="px-3 font-medium">Date of Birth</p>
                    <p className="px-3">{appointment?.dob?.toISOString().split("T")[0]}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                    <p className="px-3 font-medium">Gender</p>
                    <p className="px-3">{appointment?.gender}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                    <p className="px-3 font-medium">Email</p>
                    <p className="px-3">{appointment?.email}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                    <p className="px-3 font-medium">Location</p>
                    <p className="px-3">{appointment?.location}</p>
                </div>

                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                    <p className="px-3 font-medium">Phone Number</p>
                    <p className="px-3">{appointment?.phone}</p>
                </div>

                <div className="">{/* Update Form */}
                    {appointment && appointment.id && <UpdateAppointmentForm appointment={appointment}/>}
                </div>

            </div>       
   
        </div>
    );
}