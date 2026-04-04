import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotAuthorized from "@/components/NotAuthorized";
import generateSlug from "@/utils/generateSlug";
import { getDoctorAppointments } from "@/actions/appointments";
import NewButton from "@/components/Dashboard/Doctor/NewButton";
import HomeDisplayCard from "@/components/Dashboard/Doctor/HomeDisplayCard";
import { PatientProps } from "./layout";

export default async function page() {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if(user?.role !== "DOCTOR"){
        return(
            <NotAuthorized/>
        );
    }
    
    //const slug = await getUserById(session?.user.id);
    const slug = generateSlug(user.name??"");

    const appointments = (await getDoctorAppointments(user?.id)).data||[];

    const uniquePatientsMap = new Map();

    appointments.forEach((app)=>{
        if (!uniquePatientsMap.has(app.patientId)){
            uniquePatientsMap.set(app.patientId, {
                patientId:app.patientId,
                name:`${app.firstName} ${app.lastName}`,
                email:app.email,
                phone:app.phone,
                location:app.location,
                gender:app.gender,
                occupation:app.occupation,
                dob:app.dob,
            });
        }
    });

    const patients = Array.from(uniquePatientsMap.values()) as PatientProps[];

    //console.log(patients);

    return(
        <div>
            <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
                <div className="flex items-center gap-4">
                    <NewButton title="New Patient" href={`/doctors/${slug}`}/>
                </div>
            </div>
            <HomeDisplayCard title="Patient" newAppointmentLink={`/doctors/${slug}`} count={patients.length}/>
        </div>
    );
}