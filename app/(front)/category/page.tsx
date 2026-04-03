import React from "react";
import { Doctor } from "@/types/types";
import { getDoctors } from "@/actions/users";
import { getServices } from "@/actions/services";
import Link from "next/link";
import DoctorCard from "@/components/DoctorCard";

export default async function page({
    // params:{slug},
    searchParams, // Don't destructure directly
}: {
    // params:{ slug: string };
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams is a Promise
}) {
    // Await searchParams first, then extract mode
    const { mode } = await searchParams;
    const allDoctors = (await getDoctors())||[];
    //console.log(doctors);
    const doctors = allDoctors.filter(
        (doctor) => doctor.doctorProfile?.operationMode === mode
    );
    const services = (await getServices()).data||[];

    return(
        <div className="container p-8">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-6">
                {/* {mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()}  {"  "} ({doctors.length.toString().padStart(2,"0")}) */}
                {mode} ({doctors.length.toString().padStart(2,"0")})
            </h1>

            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
                <div className="col-span-3 border border-gray-200/50 rounded-sm p-6">
                    <h2 className="capitalize font-semibold">Other Services</h2>

                        {
                            services && services.length > 0 && (
                                <div className="py-3 flex flex-col text-sm space-y-2">
                                    {
                                        services.map((service,i)=>{
                                            return(
                                                <Link key={i} href={`/service/${service.slug}`} className="hover:text-teal-600">{service.title}</Link>
                                            );
                                        })
                                    }
                                </div>
                            )
                        }
                        
                </div>
                <div className="col-span-9">
                    {
                        doctors && doctors.length>0 ? (
                            <div className="grid grid-cols-2 gap-6">
                                {
                                    doctors.map((doctor:Doctor)=>{
                                        return(
                                            <DoctorCard key={doctor.id} doctor={doctor}/>
                                        )
                                    })
                                }
                            </div>
                        ):(
                            <div className="">
                                <h2>No Doctors for this Category</h2>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
}