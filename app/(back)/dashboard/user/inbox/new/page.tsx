import React from "react";
import InboxForm from "@/components/Dashboard/InboxForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotAuthorized from "@/components/NotAuthorized";
import { getPatientAppointments } from "@/actions/appointments";
import { DoctorProps } from "../../../doctor/patients/layout";

export default async function page() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if(user?.role !== "USER"){
        return(
            <NotAuthorized/>
        );
    }

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
    console.log(doctors);
    const users = doctors.map((doctor)=>{
        return{
            label:doctor.doctorName,
            value:doctor.doctorId
        }
    });

    return(
        <div>
            <InboxForm users={users} session={session} title="New Message"/>
        </div>
    );
}