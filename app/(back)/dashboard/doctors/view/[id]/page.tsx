import React from "react";
import Link from "next/link";
import { CalendarCheck, Check, CircleEllipsis, History, X } from "lucide-react";
import { getDoctorAppointments } from "@/actions/appointments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTimeAgo } from "@/utils/timeAgo";
import { cn } from "@/lib/utils";
import { getDoctorById } from "@/actions/users";
import ApproveButton from "@/components/Dashboard/ApproveButton";
import { getNormalDate } from "@/utils/getNormalDate";

// export default async function page({params:{id}}:{params:{id:string}}) {
//     const appointments = (await getPatientAppointments(id)).data||[];
export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const appointments = (await getDoctorAppointments(id)).data||[];
    const doctor = await getDoctorById(id);
    // const doctorProfile = await getDoctorProfile(id);
    const status = doctor?.doctorProfile?.status??"pending";
    const dob = doctor?.doctorProfile?.dob??"1994-02-13T21:00:00.000Z";
    const medicalLicenseExpiry = doctor?.doctorProfile?.medicalLicenseExpiry??"2025-01-04T21:00:00.000Z";

    return(
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        {doctor?.name}
                    </h2>
                    <h2 className="border-b pb-3 mb-3">
                        {doctor?.email} | {doctor?.phone}
                    </h2>
                </div>
                <div>
                    <ApproveButton status={status}/>
                    <h2 className="border-b pb-3 mb-3">
                        Appointments ({appointments.length.toString().padStart(2,"0")})
                    </h2>
                </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
                <TabsList>
                    <TabsTrigger value="details">Doctor Details</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Bio Data</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <span className="mr-3">First Name: </span>
                                <span>{doctor?.doctorProfile?.firstName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Last Name: </span>
                                <span>{doctor?.doctorProfile?.lastName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Date of Birth :</span>
                                <span>{getNormalDate(dob as string)}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Gender :</span>
                                <span>{doctor?.doctorProfile?.gender}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Profile Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <span className="mr-3">Medical License :</span><span>{doctor?.doctorProfile?.medicalLicense}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-3">Years of Experience :</span><span>{doctor?.doctorProfile?.yearsOfExperience}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-3">Medical License Expiry :</span><span>{getNormalDate(medicalLicenseExpiry as string)}</span>
                        </div>
                        <div className="flex items-center col-span-1 md:col-span-2 lg:col-span-2">
                            <span className="mr-3">Biography :</span><span>{doctor?.doctorProfile?.bio}</span>
                        </div>
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <span className="mr-3">Email :</span><span>{doctor?.doctorProfile?.email}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-3">Phone :</span><span>{doctor?.doctorProfile?.phone}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-3">Country :</span><span>{doctor?.doctorProfile?.country}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-3">City :</span><span>{doctor?.doctorProfile?.city}</span>
                        </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="appointments">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                        {appointments.map((item)=>{
                            return(
                                <Link 
                                    key={item.id} 
                                    href={`/dashboard/doctor/appointments/view/${item.id}`} 
                                    className={cn(
                                        "border border-gray-300 dark:border-gray-700 mb-2 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:bg-slate-950"
                                    )}
                                >
                                    <div className="flex justify-between item-center pb-2">
                                        <h2>{item.firstName} {item.lastName}</h2>
                                        {/* <span className="font-medium">{item.appointmentTime}</span> */}
                                        <div className="flex items-center">
                                            <History className="h-4 w-4 mr-2"/>
                                            <span>{getTimeAgo(item.createdAt)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 border-b">
                                        <div className="flex items-center">
                                            <CalendarCheck className="w-4 h-4 mr-2"/>
                                            <span className="font-medium">{item.appointmentFormattedDate}</span>
                                        </div>
                                        <span className="font-medium">{item.appointmentTime}</span>
                                        {/* <div className="flex items-center">
                                            <History className="h-4 w-4 mr-2"/>
                                            <span>{getTimeAgo(item.createdAt)}</span>
                                        </div> */}
                                    </div>

                                    <div className={cn("flex items-center pt-2 text-blue", item.status==="approved" && "text-teal-600 dark:text-teal-400 font-medium")}> 
                                        {item.status==="pending"?(<CircleEllipsis className="w-4 h-4 mr-2"/>):item.status==="approved"?(<Check className="w-4 h-4 mr-2"/>):(<X className="w-4 h-4 mr-2"/>)}
                                        <span>{item.status}</span>
                                    </div>
                                    {/* <div className="flex items-center pt-2">
                                        <span className="text-teal-600 font-medium dark:text-teal-400">{item.status}</span>
                                    </div> */}
                                </Link>
                            );
                        })}
                    </div>  
                </TabsContent>
            </Tabs>  
        </div>
    );
}