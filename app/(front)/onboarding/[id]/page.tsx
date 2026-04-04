import React from "react";
import { getSpecialties } from "@/actions/specialties";
import OnboardingSteps from "@/components/OnboardingPrev/OnboardingSteps";
// import OnboardingSteps from "@/components/Onboarding/OnboardingSteps";

export default async function page({
    params // Changed: Don't destructure params directly
}: {
    params: Promise<{id: string}> // Changed: params is now a Promise
}) {
    // Added: Await params first, then extract id
    const { id } = await params;

    // Get existing doctor profile
    const specialties = (await getSpecialties()).data || [];
    // const doctorProfile = (await getDoctorProfileById(id))?.data;
    // console.log(doctorProfile);

    return(
        <div className="bg-white dark:bg-slate-900">
            <div className="max-w-5xl mx-auto py-8 min-h-screen">
                <OnboardingSteps  
                    id={id} 
                    specialties={specialties}
                />
            </div>
        </div>
    );
}


// import React from "react";
// import { getSpecialties } from "@/actions/specialties";
// import { getDoctorProfileById } from "@/actions/onboarding";
// import OnboardingSteps from "@/components/Onboarding/OnboardingSteps";

// export default async function page({
//     params // Changed: Don't destructure params directly
// }: {
//     params: Promise<{id: string}> // Changed: params is now a Promise
// }) {
//     // Added: Await params first, then extract id
//     const { id } = await params;

//     // Get existing doctor profile
//     const specialties = (await getSpecialties()).data || [];
//     const doctorProfile = (await getDoctorProfileById(id))?.data;
//     // console.log(doctorProfile);

//     return(
//         <div className="bg-white dark:bg-slate-900">
//             {doctorProfile && doctorProfile.id && (
//                 <div className="max-w-5xl mx-auto py-8 min-h-screen">
//                     <OnboardingSteps 
//                         doctorProfile={doctorProfile} 
//                         id={id} 
//                         specialties={specialties}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// }