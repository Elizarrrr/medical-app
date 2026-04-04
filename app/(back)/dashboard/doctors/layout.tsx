import React, { ReactNode } from "react";
import { Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDoctorAppointments } from "@/actions/appointments";
import NotAuthorized from "@/components/NotAuthorized";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import { getDoctors } from "@/actions/users";
import DoctorPanel from "@/components/Dashboard/Doctor/DoctorPanel";

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

    if(user?.role !=="ADMIN"){
        return(
            <NotAuthorized/>
        );
    }

    const doctors = (await getDoctors())||[];
    //console.log(doctors);

    return(
        <div>
            <div className="grid grid-cols-12">
                {/*List Panel*/}
                <div className="col-span-4 py-3 border-r">
                    <PanelHeader title="Doctors" count={doctors.length??0} icon={Users}/>
                    <div className="px-3">
                        <DoctorPanel doctors={doctors} role={user?.role}/>
                    </div>          
                </div>

                {/*Display Panel*/}
                <div className="col-span-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
