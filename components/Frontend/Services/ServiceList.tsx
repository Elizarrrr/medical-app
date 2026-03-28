import React from "react";
import ServiceCard from "./ServiceCard";
import { ServiceWithDoctorProfilesCount } from "@/actions/services";

export default function TabbedItems({data}:{data:ServiceWithDoctorProfilesCount[]}) {
    return(
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-6">
            {
                data.map((service,i)=>{
                    return<ServiceCard key={i} service={service}/>
                })
            }
        </div>
    )
}