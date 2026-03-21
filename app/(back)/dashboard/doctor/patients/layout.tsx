import React, { ReactNode } from "react";
import { Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDoctorAppointments } from "@/actions/appointments";
import NotAuthorized from "@/components/NotAuthorized";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import PatientPanel from "@/components/Dashboard/Doctor/PatientPanel";

export interface PatientProps {
    patientId:string;
    name:string;
    email:string;
    phone:string;
    location:string;
    gender:string;
    occupation:string;
    dob:string;
}

export interface DoctorProps {
    doctorId:string;
    doctorName:string;
}

export default async function PatientLayout({children}:{children:ReactNode}) {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if(user?.role !=="DOCTOR"){
        return(
            <NotAuthorized/>
        );
    }

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

    console.log(patients);

    return(
        <div>
            <div className="grid grid-cols-12">
                {/*List Panel*/}
                <div className="col-span-3 py-3 border-r">
                    <PanelHeader title="Patients" count={patients.length??0} icon={Users}/>
                    <div className="px-6"><PatientPanel patients={patients} role={user?.role}/></div>          
                </div>

                {/*Display Panel*/}
                <div className="col-span-9">
                {/* <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
                    <div className="flex items-center gap-4">
                        <NewButton title="New Appointment" href="#"/>
                    </div>
                </div>
                <HomeDisplayCard count={appointments.length}/> */}
                {children}
                </div>
            </div>
        </div>
    );
}
