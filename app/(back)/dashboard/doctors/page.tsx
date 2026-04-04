import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotAuthorized from "@/components/NotAuthorized";
import NewButton from "@/components/Dashboard/Doctor/NewButton";
import HomeDisplayCard from "@/components/Dashboard/Doctor/HomeDisplayCard";
import { getDoctors } from "@/actions/users";

export default async function page() {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if(user?.role !== "ADMIN"){
        return(
            <NotAuthorized/>
        );
    }
    
    const doctors = (await getDoctors())||[];
    //console.log(doctors);

    return(
        <div>
            <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
                <div className="flex items-center gap-4">
                    <NewButton title="New Doctor" href={`#`}/>
                </div>
            </div>
            <HomeDisplayCard title="Doctor" newAppointmentLink={`#`} count={doctors.length}/>
        </div>
    );
}