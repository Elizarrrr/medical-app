import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"
import AnalyticsCard from "../AnalyticsCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { generateInitials } from "../../utils/generateInitials"
import { Button } from "@/components/ui/button"
import { getDoctors } from "@/actions/users"
import { getAdminAnalytics } from "@/actions/stats"

import { getAppointments } from "@/actions/appointments"
import { PatientProps } from "@/app/(back)/dashboard/patients/layout"

export default async function Dashboard() {

  const analytics = await getAdminAnalytics();
  const doctors = await getDoctors()||[];
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const appointments = (await getAppointments()).data||[];
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

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
         <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
              Welcome, Admin {user?.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analytics.map((item,i)=>{
                  return (
                      <AnalyticsCard key={i} data={item}/>
                  );
              })}
          </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <Card className="border border-gray-300 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Doctors</CardTitle>
                <Button asChild>
                  <Link href="/dashboard/doctors">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-8">
              {doctors && doctors.slice(0,5).map((doctor)=>{
                  const initials = generateInitials(doctor.name);
                  return(
                    <div key={doctor.id} className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={doctor.doctorProfile?.profilePicture??""} alt="Avatar" />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {doctor.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {doctor.email}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <button className="text-sm">Approve</button>
                      </div>
                    </div>
                  );
                })
              }
            </CardContent>
          </Card>
          
          <Card className="border border-gray-300 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Patients</CardTitle>
                <Button asChild>
                  <Link href="/dashboard/doctors">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-8">
              {patients && patients.slice(0,5).map((patient)=>{
                  const initials = generateInitials(patient.name);
                  return(
                    <div key={patient.patientId} className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        {/* <AvatarImage src={patient.profilePicture??""} alt="Avatar" /> */}
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {patient.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {patient.email}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <button className="text-sm">Approve</button>
                      </div>
                    </div>
                  );
                })
              }
            </CardContent>
          </Card>
        </div>
      </main>
  );
}