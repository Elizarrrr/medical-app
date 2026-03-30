import React, { ReactNode } from "react";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import ListPanel from "@/components/Dashboard/Doctor/ListPanel";
import { Calendar } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPatientAppointments } from "@/actions/appointments";
import NotAuthorized from "@/components/NotAuthorized";

export default async function AppointmentLayout({children}:{children:ReactNode}) {
    
    const session = await getServerSession(authOptions);
    const user = session?.user
    if(user?.role !=="USER"){
        return(
            <NotAuthorized/>
        );
    }
    const appointments = (await getPatientAppointments(user?.id)).data||[];

    return(
        <div>
            {/* Header */}
            
           
            {/* 2Panels */}
            <div className="grid grid-cols-12">
               
                {/*List Panel*/}
                <div className="col-span-4 py-3 border-r">
                    <PanelHeader title="Appointments" count={appointments.length??0} icon={Calendar}/>
                    <div className="px-6"><ListPanel role={user.role} appointments={appointments}/></div>          
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
