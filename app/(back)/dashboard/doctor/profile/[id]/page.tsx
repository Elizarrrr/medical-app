import React from "react";
import { getDoctorProfileById } from "@/actions/onboarding";
import { getSpecialties } from "@/actions/specialties";
import OnboardingSteps from "@/components/Onboarding/OnboardingSteps";

// export default async function page({params:{id}}:{params:{id:string}}) {
export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // Get existing doctor profile
    const specialties = (await getSpecialties()).data||[];
    const doctorProfile = (await getDoctorProfileById(id))?.data;
    // console.log(doctorProfile);

    return(
        <div className="bg-white dark:bg-slate-900">
            {doctorProfile && doctorProfile.id && (
                <div className="max-w-5xl mx-auto py-8 min-h-screen">
                    <OnboardingSteps doctorProfile={doctorProfile} id={id} specialties={specialties}/>
                </div>
            )}
        </div>
    );
}
