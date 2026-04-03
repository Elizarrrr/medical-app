import Link from "next/link";
import React from "react";
import { Doctor } from "@/types/types";
import { getDoctorsBySearch } from "@/actions/doctors";
import DoctorCard from "@/components/DoctorCard";
import ServiceList from "@/components/Frontend/Services/ServiceList";
import LinkCards from "@/components/Frontend/Doctors/LinkCards";
import { getServices } from "@/actions/services";

export default async function page({
    searchParams, // Don't destructure directly
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams is a Promise
}) {
    // Await searchParams first, then extract query
    const {query} = await searchParams;
    const data = await getDoctorsBySearch(query as string);
    const doctors = data?.doctors||[];
    const searchServices = data?.services||[];
    const specialties = data?.specialties||[];
    const allServices = (await getServices()).data||[];
    const services = searchServices.length>0 ? searchServices : allServices;
    //console.log(data);

    return(
        <div className="container p-8">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl pb-6">
                Search results for <span className="capitalize">{query}</span> 
                {/* {"  "} ({doctors.length.toString().padStart(2,"0")}) */}
            </h1>

            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
                <div className="col-span-3 border border-gray-200/50 rounded-sm p-6">
                    <h2 className="capitalize font-semibold">Browse by Services</h2>

                        {services && services.length > 0 && (
                                <div className="py-3 flex flex-col text-sm space-y-2">
                                    {
                                        services.map((service,i)=>{
                                            return(
                                                // <Link key={i} href={`/service/${service.slug}`} className="hover:text-teal-600">{service.title} ({service._count.doctorProfiles.toString().padStart(2,"0")})</Link>
                                                <Link key={i} href={`/service/${service.slug}`} className="hover:text-sky-600">{service.title}</Link>
                                            );
                                        })
                                    }
                                </div>
                        )}
                        
                </div>
                
                <div className="col-span-9">
                    {searchServices && searchServices.length>0 && <div className="py-6 border-b">
                        <h2 className="pb-3">Results for <span className="font-semibold">{query}</span> in Services</h2>
                        <ServiceList data={searchServices}/>
                    </div>}
                    
                    {specialties && specialties.length>0 && <div className="py-6 border-b">
                        <h2 className="pb-3">Results for <span className="font-semibold">{query}</span> in Specialties</h2>
                        <LinkCards specialties={specialties}/>
                    </div>}

                    {doctors && doctors.length> 0 && (
                        <div className="py-6">
                            <h2 className="pb-3">Results for <span className="font-semibold">{query}</span> in Doctors</h2>
                            <div className="grid grid-cols-2 gap-6">
                                {doctors.map((doctor:Doctor)=>{
                                        return(
                                            <DoctorCard key={doctor.id} doctor={doctor}/>
                                        )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}