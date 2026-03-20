import { authOptions } from "@/lib/auth";
import Dashboard from "@/components/Dashboard/Dashboard";

import { getServerSession } from "next-auth";
import DoctorDashboard from "@/components/Dashboard/DoctorDashboard";
import PatientDashboard from "@/components/Dashboard/PatientDashboard";
//import Dashboard2 from "../../../../components/Dashboard/Dashboard2";

export default async function page(){
    const session = await getServerSession(authOptions)
    const user = session?.user;
    const role = user?.role;

    if (role==="DOCTOR"){
        return(
            <>
            <DoctorDashboard session={session}/>
            </>
        ) 
    }

    if (role==="USER"){
        return(
            <>
            <PatientDashboard session={session}/>
            </>
        ) 
    }

    return(
        <div>
            <Dashboard/>
        </div>
    );
}