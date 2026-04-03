import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotAuthorized from "@/components/NotAuthorized";
import NewButton from "@/components/Dashboard/Doctor/NewButton";
import HomeDisplayCard from "@/components/Dashboard/Doctor/HomeDisplayCard";
import { getPatientAppointments } from "@/actions/appointments";
import { DoctorProps } from "../../doctor/patients/layout";

export default async function page() {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if(user?.role !== "USER"){
        return(
            <NotAuthorized/>
        );
    }
    
    //const slug = await getUserById(session?.user.id);
    //const slug = generateSlug(user.name??"");

    const appointments = (await getPatientAppointments(user?.id)).data||[];

    const uniquePatientsMap = new Map();

    appointments.forEach((app)=>{
        if (!uniquePatientsMap.has(app.doctorId)){
            uniquePatientsMap.set(app.doctorId, {
                doctorId:app.doctorId,
                doctorName:app.doctorName??"Name Not Provided",
            });
        }
    });

    const doctors = Array.from(uniquePatientsMap.values()) as DoctorProps[];

    //console.log(patients);

    return(
        <div>
            <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
                <div className="flex items-center gap-4">
                    <NewButton title="New Doctor" href={`/category?mode=In-person%20doctor%20Visit`}/>
                </div>
            </div>
            <HomeDisplayCard title="Doctor" newAppointmentLink={`/category?mode=In-person%20doctor%20Visit`} count={doctors.length}/>
        </div>
    );
}