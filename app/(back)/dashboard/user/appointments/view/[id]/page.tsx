import React from "react";
import Link from "next/link";
import { Calendar, Mail, Phone, Video } from "lucide-react";
import { getAppointmentById } from "@/actions/appointments";
import { Button } from "@/components/ui/button";

export default async function page({
    params // Don't destructure directly
}: {
    params: Promise<{id: string}> // params is a Promise
}) {

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

            {appointment?.status === "approved" ? (
                <div className="border border-sky-700 shadow rounded-md p-4 mx-4 my-4">
                    <div className="sm:col-span-4">
                        <div className="flex items-center justify-between border-b">
                        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">Appointment Details</h2>
                            <Button className="">
                            {`${appointment?.appointmentFormattedDate} at ${appointment?.appointmentTime}`}
                            </Button>
                        </div>
                        <div className="py-4 space-y-4">
                            <div className="flex items-center justify-between">
                                {/* <h2 className="font-medium uppercase">{" "}{appointment?.meetingProvider}</h2> */}
                                <h2 className="font-medium">
                                {appointment?.meetingProvider && appointment.meetingProvider.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                                </h2>
                                <Button asChild variant={"outline"}>
                                <Link href={appointment?.meetingLink??"#"}>
                                <Video className="mr-2 w-4 h-4"/><span>Join Meeting</span>
                                </Link>
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                {/* <h2 className="font-medium uppercase">{" "}{appointment?.meetingProvider}</h2> */}
                                <h2 className="font-medium">
                                {/* {appointment?.meetingProvider && appointment.meetingProvider.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())} */}
                                Contact
                                </h2>

                                <div className="flex space-x-3">
                                    <Button asChild variant={"outline"}>
                                    <Link href={appointment?.meetingLink??"#"}>
                                    <Phone className="mr-2 w-4 h-4"/><span>Call Doctor</span>
                                    </Link>
                                    </Button>
                                    <Button asChild variant={"outline"}>
                                    <Link href={appointment?.meetingLink??"#"}>
                                    <Mail className="mr-2 w-4 h-4"/><span>Mail Doctor</span>
                                    </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                <div className="border border-slate-400 shadow rounded-md p-4 mx-4 my-4">
                    <div className="sm:col-span-4">
                        <div className="flex items-center justify-between">
                        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">Appointment Status</h2>
                            <Button className="bg-black dark:bg-white dark:text-black">
                            {appointment?.status}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

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

            </div>
        </div>
    );
}