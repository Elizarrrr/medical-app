import React from "react";
import Image from "next/image";
import DoctorDetails from "@/components/DoctorDetails";
import { getDoctorById } from "@/actions/users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Appointment } from "@prisma/client";
import { getAppointmentByPatientId } from "@/actions/appointments";

export default async function page({
    // params:{slug},
    searchParams, // Don't destructure directly
}: {
    // params:{ slug: string }
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams is a Promise
}) {
    // Await searchParams first, then extract id
    const params = await searchParams;
    const { id } = params;

    //Fetch Doctor
    const session = await getServerSession(authOptions);
    //const doctor = await getDoctorBySlug(slug)||null;
    const doctor = (await getDoctorById(id as string))||null;
    const user = session?.user;
    //Fetch Appointment by Patient Id
    const appointment = await getAppointmentByPatientId(user?.id??"");

    return(
        <>
            {doctor && doctor.id ? (
                    <div className="bg-slate-100 dark:bg-slate-900 py-8 min-h-screen">
                    <div className="bg-white dark:bg-slate-950 max-w-4xl border border-gray-200 dark:border-gray-600 mx-auto shadow-md rounded-md">
                        <div className="py-8 px-6">
                            <div className="flex items-center justify-between"> 
                                <div>
                                    <div className="flex flex-col">
                                        <h2 className="uppercase font-bold text-2xl">{doctor.name}</h2>
                                        <p className="text-gray-600 text-sm uppercase dark:text-gray-400">Adult Health</p>
                                    </div>
                                    <div className="py-3">
                                        <p>{doctor.doctorProfile?.operationMode}</p>
                                        <p>{doctor.doctorProfile?.city}, {doctor.doctorProfile?.country}</p>
                                    </div>
                                </div>
                                <Image src={doctor.doctorProfile?.profilePicture??"/defaultuser.png"} width={365} height={369} alt="Doctor" className="w-36 h-36 rounded-full object-cover"/>
                            </div>  
                        </div>
                        <div className="">
                            <DoctorDetails appointment={appointment as Appointment|null} doctor={doctor}/>
                        </div>
                    </div>
                    {/* <FixedBookButton price={doctor.doctorProfile?.hourlyWage}/> */}
                </div>
            ):(
                <div className="min-h-screen flex items-center justify-center">
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    No Doctor Details Found
                    </h2>
                </div>
            )}
        </>
    );
}
