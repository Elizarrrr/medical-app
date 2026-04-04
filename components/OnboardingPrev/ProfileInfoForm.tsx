"use client";
import { useForm } from "react-hook-form";
import { ProfileFormProps } from "../../types/types";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import { StepFormProps } from "./BioDataForm";
import { useOnboardingContext } from "@/context/context";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function ProfileInfoForm({
  page,
  title,
  description,
  nextPage,
  formId="",
}:StepFormProps) {
  const [isLoading, setIsLoading]=useState(false);
  const {profileData,savedDBData,setProfileData}=useOnboardingContext();
  const initialExpiryDate = profileData.medicalLicenseExpiry||savedDBData.medicalLicenseExpiry;
  const initialProfileImage = profileData.profilePicture||savedDBData.profilePicture;
  // const [expiry, setExpiry] = useState<Date>(initialExpiryDate);
  // After (type-safe solution)
  const [expiry, setExpiry] = useState<Date | undefined>(initialExpiryDate);
  const [profileImage,setProfileImage] = useState(initialProfileImage);
  console.log(savedDBData);

  const {register,handleSubmit,formState:{errors}}=useForm<ProfileFormProps>({
    defaultValues:{
      profilePicture:profileData.profilePicture||savedDBData.profilePicture,
      bio:profileData.bio||savedDBData.bio,
      page:profileData.page||savedDBData.page,
      medicalLicense:profileData.medicalLicense||savedDBData.medicalLicense,
      medicalLicenseExpiry:profileData.medicalLicenseExpiry||savedDBData.medicalLicenseExpiry,
      yearsOfExperience:profileData.yearsOfExperience||savedDBData.yearsOfExperience,
    },
  });
  const router=useRouter();
  const pathname = usePathname();
  
  async function onSubmit (data: ProfileFormProps){
    setIsLoading(true);
    if(!expiry){
      toast.error("Please Select your License Expiry Date")
      setIsLoading(false);
      return;
    }
    data.medicalLicenseExpiry=expiry;
    data.page=page;
    data.yearsOfExperience=Number(data.yearsOfExperience);
    data.profilePicture=profileImage;
    console.log(data);

    // profilePicture?: string;
    // bio: string;
    // page: string;
    // medicalLicense:string;
    // medicalLicenseExpiry?:Date;
    // yearsOfExperience:number;

    try{
      const res = await updateDoctorProfile(formId,data);
      setProfileData(data);
      if(res?.status===201){
        setIsLoading(false);
        //extract the profile form from the updated profile
        // router.push(`/onboarding/${userId}?page=${nextPage}`);
        router.push(`${pathname}?page=${nextPage}`);
        console.log(res.data);
      }else{
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
      
    }catch(error){
      console.error("Error updating doctor profile:", error);
      toast.error("An unexpected error occurred.");
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
              <TextInput label="Medical License" register={register} name="medicalLicense" errors={errors} className="col-span-full sm:col-span-1"/>
              <TextInput label="Years of Experience" register={register} name="yearsOfExperience" errors={errors} className="col-span-full sm:col-span-1"/>
              <DatePickerInput date={expiry} setDate={setExpiry} title="Medical License Expiry" className="col-span-full sm:col-span-1"/>
              {/* <TextInput label="Hourly Charge" register={register} name="hourlyWage" type="number" errors={errors} className="col-span-full sm:col-span-1"/> */}
              <TextAreaInput label="Biography" register={register} name="bio" errors={errors}/>
              <ImageInput label="Professional Profile Image" imageUrl={profileImage} setImageUrl={setProfileImage} className="col-span-full" endpoint="doctorProfileImage"/>
        </div>

        <div className="mt-8 flex justify-center items-center"> 
              <SubmitButton title="Save and continue" isLoading={isLoading} loadingTitle="Saving please wait..."/>
        </div>
        
      </form>

    </div>
  );
}
  