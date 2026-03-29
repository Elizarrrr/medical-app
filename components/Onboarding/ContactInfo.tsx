"use client";
import { useForm } from "react-hook-form";
import { ContactInfoFormProps } from "../../types/types";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { StepFormProps } from "./BioDataForm";
import { useOnboardingContext } from "@/context/context";
import { completeProfile, updateDoctorProfile } from "@/actions/onboarding";

export default function ContactInfo({ 
  page,
  title,
  description,
  doctorProfile
}:StepFormProps) {
  const {savedDBData,setContactData}=useOnboardingContext();
  const [isLoading, setIsLoading]=useState(false);
  console.log(savedDBData);

  const {register,handleSubmit,formState:{errors}}=useForm<ContactInfoFormProps>({
    defaultValues:{
      phone:doctorProfile.phone||savedDBData.phone,
      email:doctorProfile.email||savedDBData.email,
      page:doctorProfile.page||savedDBData.page,
      country:doctorProfile.country||savedDBData.country,
      city:doctorProfile.city||savedDBData.city,
    },
  });
  const router=useRouter();
  const pathname = usePathname();
  const isOnboarding = pathname.split("/").includes("onboarding"); //split creates an array

  async function onSubmit (data: ContactInfoFormProps){
    data.page=page;
    console.log(data);
    setIsLoading(true);

    try{
      if(isOnboarding){
        const res = await completeProfile(doctorProfile.id,data);

        setContactData(data);
        if(res?.status===201){
          setIsLoading(false);
          toast.success("Profile Completed Successfully");
          //extract the profile form from the updated profile
          if(isOnboarding){
            router.push("/login");
          }
          console.log(res.data);
        }else{
          setIsLoading(false);
          throw new Error("Something went wrong");
        }

      }else{
        const res = await updateDoctorProfile(doctorProfile.id,data);

        setContactData(data);
        if(res?.status===201){
          setIsLoading(false);
          toast.success("Profile Completed Successfully");
          //extract the profile form from the updated profile
          if(isOnboarding){
            router.push("/login");
          }
          console.log(res.data);
        }else{
          setIsLoading(false);
          throw new Error("Something went wrong");
        }
      }
      
    }catch(error){
      console.error("Error updating doctor profile:", error);
      toast.error("Something went wrong.");
      setIsLoading(false);
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
              <TextInput label="Email Address" register={register} name="email" type="email" errors={errors} className="col-span-full sm:col-span-1"/>
              <TextInput label="Phone" register={register} name="phone" type="tel" errors={errors} className="col-span-full sm:col-span-1"/>
              <TextInput label="Country" register={register} name="country" errors={errors} className="col-span-full sm:col-span-1"/>
              <TextInput label="City" register={register} name="city" errors={errors} className="col-span-full sm:col-span-1"/>
        </div>

        <div className="mt-8 flex justify-center items-center"> 
              <SubmitButton title={isOnboarding?"Complete":"Save"} isLoading={isLoading} loadingTitle="Saving please wait..."/>
        </div>  
      </form>

    </div>
  );
}
  