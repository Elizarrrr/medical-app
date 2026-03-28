"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useOnboardingContext } from "../../context/context";
import { DoctorProfile, Specialty } from "@prisma/client";
import BioDataForm from "./BioDataForm";
import ProfileInfoForm from "./ProfileInfoForm";
import ContactInfo from "./ContactInfo";

export default function OnboardingSteps({
    id,
    // specialties, // this is the unused prop
    specialties: _specialties, // eslint-disable-line @typescript-eslint/no-unused-vars
    doctorProfile
}: {
    id: string;
    specialties: Specialty[];
    doctorProfile: DoctorProfile;
}) {
    const pathname = usePathname();
    // console.log(pathname);
    const params = useSearchParams();
    const page = params.get("page")??"bio-data";
    const {truckingNumber,doctorProfileId,savedDBData} = useOnboardingContext();
    console.log(page);
    const steps =[
        {
            title: "Bio Data",
            page:"bio-data",
            component:<BioDataForm userId={id} title="Bio Data" description="Please fill in your Bio Data Information" page={page} nextPage="profile" formId={doctorProfile.id?doctorProfileId:savedDBData.id} doctorProfile={doctorProfile}/>,
        },
        {
            title: "Profile Information",
            page:"profile",
            component:<ProfileInfoForm userId={id} title="Profile Information" description="Please fill in your Profile Information" page={page} nextPage="contact" formId={doctorProfile.id?doctorProfileId:savedDBData.id} doctorProfile={doctorProfile}/>,
        },
        {
            title: "Contact Information",
            page:"contact",
            component:<ContactInfo userId={id} title="Contact Information" description="Please fill in your Contact Information" page={page} nextPage="final" formId={doctorProfile.id?doctorProfileId:savedDBData.id} doctorProfile={doctorProfile}/>
        }
    ];

    const currentStep = steps.find((step)=>step.page===page)
    console.log(currentStep)

    return(
        <div className="grid grid-cols-12 mx-auto rounded-lg shadow-inner border border-slate-200 dark:border-gray-700">
            <div className="col-span-full sm:col-span-3 bg-slate-100 min-h-screen divide-y-2 divide-gray-200 dark:bg-gray-900">
                
                {
                    steps.map((step,i)=>{
                        return(
                            // <Link key={i} href={`/onboarding/${id}?page=${step.page}`} className={cn("block py-3 px-4 bg-slate-300 dark:bg-slate-400 shadow-inner uppercase text-sm", step.page===page? "bg-teal-400 text-sm dark:bg-teal-600":"")}>{step.title}</Link>
                            <Link key={i} href={`${pathname}?page=${step.page}`} className={cn("block py-3 px-4 bg-slate-300 dark:bg-slate-400 shadow-inner uppercase text-black text-sm", step.page===page? "bg-sky-700 text-white text-sm dark:bg-sky-700":"")}>{step.title}</Link>
                        );
                    })
                }
                
            </div>
            <div className="col-span-full sm:col-span-9 bg-slate-50 p-4 dark:bg-black">
                {truckingNumber&&<p className="border-b border-gray-200 mb-4 text-teal-600 dark:text-teal-400">Use this Trucking Number to Resume your Application or Check the Status: <span className="font-bold">{truckingNumber}</span></p>}  
                {currentStep?.component}
            </div>
        </div>
    );
}