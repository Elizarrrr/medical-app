import React from "react";
import SpecialtyForm from "@/components/Dashboard/SpecialtyForm";
import { getSpecialtyBySlug } from "@/actions/specialties";

export default async function page({
    params
}:{
    params:Promise<{slug:string}>
}) {
     // Await params first, then extract slug
    const { slug } = await params;
    
    const specialty = (await getSpecialtyBySlug(slug))?.data;

    return(
        <div>
            {specialty && specialty.id && <SpecialtyForm className="text-black" title="Update Specialty" initialData={specialty}/>}
        </div>
    );
}
