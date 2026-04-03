import React, { ReactNode } from "react";
import { Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotAuthorized from "@/components/NotAuthorized";
import { getPatientAppointments } from "@/actions/appointments";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import DoctorsPanel from "@/components/Dashboard/Doctor/DoctorsPanel";

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

    if(user?.role !=="USER"){
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

    //console.log(patients);

    return(
        <div>
            <div className="grid grid-cols-12">
                {/*List Panel*/}
                <div className="col-span-4 py-3 border-r">
                    <PanelHeader title="Doctors" count={doctors.length??0} icon={Users}/>
                    <div className="px-6">
                        <DoctorsPanel doctors={doctors} role={user?.role}/>
                    </div>          
                </div>

                {/*Display Panel*/}
                <div className="col-span-8">
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
