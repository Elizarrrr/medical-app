"use client";
//context => useState at a global level

import { createContext, ReactNode, useContext, useState } from "react";
import { BioDataFormProps, ContactInfoFormProps, ProfileFormProps } from "@/types/types";

//Steps for creating Context API
//CREATING AND EXPORT THE CONTEXT:
    //1)Define the shape of the data you want to track
    //2)Define the initial data
    //3)Create and export the context
    //4)Add the types to the context and initial data

//USE THE CREATED CONTEXT TO CREATE AND EXPORT THE CONTEXT PROVIDER

//CREATE AND EXPORT THE USECONTEXT HOOK

//WRAP THE ENTIRE APP WITH THE PROVIDER

interface IOnBoardingContextData{
    truckingNumber:string;
    setTruckingNumber:(value:string)=>void;
    doctorProfileId:string;
    setDoctorProfileId:(value:string)=>void;

    //Track the form data
    bioData:BioDataFormProps;
    profileData:ProfileFormProps;
    contactData:ContactInfoFormProps;
    savedDBData:any;
    setSavedDBData:(data:any)=>void;
    setBioData:(data:BioDataFormProps)=>void;
    setProfileData:(data:ProfileFormProps)=>void;
    setContactData:(data:ContactInfoFormProps)=>void;
};

const initialBioData = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    page: "",
    userId: "",
    trackingNumber: "",
};

const initialProfileData = {
    profilePicture: "",
    bio: "",
    page: "",
    medicalLicense: "",
    medicalLicenseExpiry: "",
    yearsOfExperience: 0,
    hourlyWage: 100
};

const initialContactData = {
    phone: "",
    email: "",
    page: "",
    country: "",
    city: "",
};

const initialContextData = {
    truckingNumber:"",
    doctorProfileId:"",
    bioData:initialBioData,
    profileData:initialProfileData,
    contactData:initialContactData,
    savedDBData:{},
    setSavedDBData:()=>{},
    setTruckingNumber:()=>{},
    setDoctorProfileId:()=>{},
    setBioData:()=>{},  
    setProfileData:()=>{},
    setContactData:()=>{},
    
};

const OnBoardingContext = createContext<IOnBoardingContextData>(initialContextData);

export function OnboardingContextProvider({
    children,
}:{
    children:ReactNode;
}) {
    const [truckingNumber,setTruckingNumber] = useState<string>("");
    const [doctorProfileId,setDoctorProfileId] = useState<string>("");
    const [bioData,setBioData] = useState<BioDataFormProps>(initialBioData);
    const [profileData,setProfileData] = useState<ProfileFormProps>(initialProfileData);
    const [contactData,setContactData] = useState<ContactInfoFormProps>(initialContactData);
    const [savedDBData,setSavedDBData] = useState<any>({});
    console.log(savedDBData);

    const contextValues = {
        truckingNumber,
        setTruckingNumber,
        doctorProfileId,
        setDoctorProfileId,
        bioData,
        setBioData,
        profileData,
        setProfileData,
        contactData,
        setContactData,
        savedDBData,
        setSavedDBData,
    };

    return (
        <OnBoardingContext.Provider value={contextValues}>
            {children}
        </OnBoardingContext.Provider>
    );
}


export function useOnboardingContext(){  //the hook
    return useContext(OnBoardingContext)
}
export default OnBoardingContext;