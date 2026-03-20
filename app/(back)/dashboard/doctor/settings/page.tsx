import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDoctorProfileById } from "@/actions/onboarding";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AvailabilitySettings from "@/components/Dashboard/Doctor/AvailabilitySettings";
import DoctorServiceSettings from "@/components/Dashboard/Doctor/DoctorServiceSettings";
// import { Tabs } from "flowbite-react";
// import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
// import { MdDashboard } from "react-icons/md";

export default async function page() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const profile = await getDoctorProfileById(user?.id);

    return(
        <div className="max-w-5xl mx-auto w-full px-6 py-6">
            <h2 className="pb-2 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">Settings</h2>
            <Tabs defaultValue="availability" className="w-full">
                <TabsList>
                    <TabsTrigger value="availability">Availability Settings</TabsTrigger>
                    <TabsTrigger value="service">Service Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="availability" className="">
                    {/* Availability Form */}
                    <AvailabilitySettings profile={profile?.data}/>
                </TabsContent>
                <TabsContent value="service">
                    <DoctorServiceSettings profile={profile?.data}/>
                </TabsContent>
                </Tabs>
        </div>
    );
}