//"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import UpdateServiceForm from "./UpdateServiceForm";
import { getServices } from "../../../actions/services";
import { getSpecialties } from "../../../actions/specialties";
import { DoctorProfile } from "@prisma/client";

export default async function DoctorServiceSettings({profile}:{profile:DoctorProfile|undefined|null}) {

    const services = (await getServices()).data;
    const specialties = (await getSpecialties()).data;

    // const services:SelectOption[] = allServices?.map((item)=>{
    //     return {
    //         label:item.title,
    //         value:item.id
    //     }
    // })||[];

    // const specialties:SelectOption[] = allSpecialties?.map((item)=>{
    //     return {
    //         label:item.title,
    //         value:item.id
    //     }
    // })||[];

    return(
        <div className="grid gap-6 w-full">
            <Card x-chunk="A form to update the store name.">
              {/* <CardHeader>
                <CardTitle>Choose Service</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader> */}
              <UpdateServiceForm profile={profile} services={services} specialties={specialties}/>      
            </Card>
         
          </div>
    );
}
