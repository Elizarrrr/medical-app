"use client";
import { useForm } from "react-hook-form";
import { BioDataFormProps } from "../../types/types";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { DoctorProfile, Specialty } from "@prisma/client";
import { useOnboardingContext } from "@/context/context";
import { createDoctorProfile, updateDoctorProfile } from "@/actions/onboarding";
import { generateTrackingNumber } from "@/lib/generateTracking";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import RadioInput from "../FormInputs/RadioInput";

export type StepFormProps={
  page:string;
  title:string;
  description:string;
  userId?:string;
  nextPage?:string;
  formId?:string;
  specialties?:Specialty[];
  doctorProfile:DoctorProfile
};

export default function BioDataForm({
  page,
  title,
  description,
  userId,
  nextPage,
  formId="",
  doctorProfile
}:StepFormProps) {

    //GET CONTEXT DATA
    const {truckingNumber,setTruckingNumber,doctorProfileId,setDoctorProfileId,} = useOnboardingContext();
    console.log(truckingNumber,doctorProfileId);
    const [isLoading, setIsLoading]=useState(false);
    const {savedDBData,setBioData} = useOnboardingContext();
    const initialDOB = doctorProfile.dob||savedDBData.dob;
    // const [dob, setDOB] = useState<Date>(initialDOB);
    const [dob, setDOB] = useState<Date | undefined>(initialDOB);
    // const defaultData = bioData||savedDBData;
    console.log(savedDBData);
    const genderOptions = [{label:"Male",value:"male"},{   label:"Female",value:"female"}];
    const {register,handleSubmit,formState:{errors}}=useForm<BioDataFormProps>({
      defaultValues:{
        firstName:doctorProfile.firstName||savedDBData.firstName,
        lastName:doctorProfile.lastName||savedDBData.lastName,
        dob:doctorProfile.dob||savedDBData.dob,
        gender:doctorProfile.gender||savedDBData.gender,
        page:doctorProfile.page||savedDBData.page,
        //userId:bioData.userId||savedDBData.userId,
        trackingNumber:doctorProfile.trackingNumber||savedDBData.trackingNumber,
      },
    });
    const router=useRouter();
    const pathname = usePathname();

    async function onSubmit (data: BioDataFormProps){
      setIsLoading(true);
      if(!dob){
        toast.error("Please Select Date of Birth");
        setIsLoading(false);
        return;
      }

      
      data.userId=userId as string;
      data.dob=dob;
      data.trackingNumber=generateTrackingNumber();
      data.page=page;
      console.log(data);
      

      try{
        //save data to db
        if(formId){
          const res = await updateDoctorProfile(doctorProfile.id,data);

          if(res && res.status===201){
            setIsLoading(false);
            toast.success("Bio Data Updated Successfully");

            setTruckingNumber(res.data?.trackingNumber??"");
            setDoctorProfileId(res.data?.id??"");

            //route to the next form
            // router.push(`/onboarding/${userId}?page=${nextPage}`);
            router.push(`${pathname}?page=${nextPage}`);
            console.log(res.data);

          }else{
            setIsLoading(false);
            throw new Error("Something went wrong");
          }

        }else{
          const res = await createDoctorProfile(data);

          //save data to the context api
          setBioData(data); 
          //setIsLoading(false);

          if(res.status===201){
            setIsLoading(false);
            toast.success("Doctor Profile Created");

            setTruckingNumber(res.data?.trackingNumber??"");
            setDoctorProfileId(res.data?.id??"");

            //route to the next form
            router.push(`/onboarding/${userId}?page=${nextPage}`);
            console.log(res.data);

          }else{
            setIsLoading(false);
            throw new Error("Something went wrong");
          }
        }

        

      }catch(error){
        setIsLoading(false);
        console.log("Submission error:", error);
      }

    }

    return (
        <div className="w-full">
        <div className="text-center border-b border-gray-200 pb-4">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">{title}</h1>
          <p className="text-balance text-muted-foreground">
            {description}
          </p>
        </div>
        <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-2">
                <TextInput label="First Name" register={register} name="firstName" errors={errors} className="col-span-full sm:col-span-1"/>
                <TextInput label="Last Name" register={register} name="lastName" errors={errors} className="col-span-full sm:col-span-1"/>
                <DatePickerInput className="col-span-full sm:col-span-1" date={dob} setDate={setDOB} title="Date of Birth"/>
                <RadioInput radioOptions={genderOptions} title="Gender" name="gender" register={register} errors={errors} className="col-span-full sm:col-span-1"/>
          </div>

          <div className="mt-8 flex justify-center items-center"> 
                <SubmitButton title="Save and continue" isLoading={isLoading} loadingTitle="Saving please wait..."/>
          </div>
          
        </form>

      </div>
    );
  }
  