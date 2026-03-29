"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getDayFromDate } from "@/utils/getDayFromDate";
import { getLongDate } from "@/utils/getLongDate";
import { Loader2, MoveRight } from "lucide-react";
import TextInput from "./FormInputs/TextInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "./FormInputs/DatePickerInput";
import RadioInput from "./FormInputs/RadioInput";
import { TextAreaInput } from "./FormInputs/TextAreaInput";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { createAppointment } from "../actions/appointments";
import { Appointment } from "@prisma/client";
import { AppointmentProps, DoctorDetail } from "@/types/types";
import MultipleFileUpload, { FileProps } from "./FormInputs/MultipleFileUpload";

export default function DoctorDetails({doctor,appointment}:{doctor:DoctorDetail; appointment:Appointment|null}) {
    const [isActive,setIsActive]=useState("availability");
    const [step,setStep] = useState(1);
    const {data:session} = useSession();
    const patient = session?.user;

    const [selectedTime,setSelectedTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const day = getDayFromDate(date?.toDateString());
    const longDate = getLongDate(date!.toDateString());
    const [dob, setDOB] = useState<Date | undefined>(undefined);
    console.log(longDate);
    const times = doctor.doctorProfile?.availability?.[day] ?? null;
    const [medicalDocs,setMedicalDocs] = useState<FileProps[]>([]);
    const genderOptions = [{label:"Male",value:"male"},{   label:"Female",value:"female"}];
    // const [imageUrl,setImageUrl] = useState(initialImageUrl);
    const router = useRouter();
    const {register,handleSubmit,formState:{errors}}=useForm<AppointmentProps>({
        defaultValues:{
            email: appointment?.email ?? "",
            firstName: appointment?.firstName ?? "",
            lastName: appointment?.lastName ?? "",
            phone: appointment?.phone ?? "",
            //dob:appointment?.dob?? new Date(),
            occupation: appointment?.occupation ?? "",
            location: appointment?.location ?? "",
            gender: appointment?.gender ?? "",
        },
    });

    async function onSubmit (data: AppointmentProps){
        // data.medicalDocuments = medicalDocs.map((item)=>item.url);
        data.appointmentDate = date;
        data.appointmentFormattedDate = longDate;
        data.appointmentTime = selectedTime;
        (data.doctorId = doctor.id);
        (data.charge = doctor.doctorProfile?.hourlyWage??0);
        data.dob = dob;
        data.patientId = patient?.id??"";
        data.doctorName = doctor.name;
        console.log(data);
        
        try {
            setLoading(true);
            const res = await createAppointment(data);
            const appo = res.data;
            setLoading(false);
            toast.success("Appointment Created Successfully");
            router.push("/dashboard/user/appointments");
            console.log(appo);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
        
        // router.push("/dashboard/services");
    }

    function initiateAppointment(){
        if(patient?.id){
            if(!selectedTime){
                toast.error("Please select time");
                return
            }
            setStep((curr)=>curr+1);
        }else{
            router.push("/login");
        }    
    }
    
    return(
        <>
            {step===1?(
                <div className="">
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={()=>setIsActive("details")} 
                            className={
                                isActive==="details"
                                ?"border py-4 px-8 bg-sky-700 text-white w-full uppercase"
                                :"border py-4 px-8 border-gray-200 bg-slate-100 w-full uppercase dark:text-black"
                            }
                        >
                            Service Details
                        </button>

                        <button 
                            onClick={()=>setIsActive("availability")} 
                            className={
                                isActive==="availability"
                                ?"border py-4 px-8 bg-sky-700 text-white w-full uppercase"
                                :"border py-4 px-8 border-gray-200 bg-slate-100 w-full uppercase dark:text-black"
                            }
                        >
                            Availability
                        </button>
                    </div>

                    <div className="py-8 px-6">
                        {isActive==="availability"?(
                            // <div><Availability/></div>
        
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />
                                </div>
                                <div className="">
                                    <span className="text-sm text-slate-600 dark:text-gray-400">You have selected</span>
                                    <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">{longDate}</h2>
                                    {times && times.length > 0 && (
                                        <div className="py-3 grid grid-cols-4 gap-2">
                                            {
                                                times.map((item,i)=>{
                                                    return (
                                                        <Button 
                                                            key={i} 
                                                            onClick={()=>setSelectedTime(item)} 
                                                            // variant={"outline"}
                                                            variant={selectedTime===item?"default":"outline"}
                                                            >
                                                            {item}
                                                        </Button>
                                                    );
                                                })
                                            }
                                        </div>
                                    )}
                                    <div className="py-4">
                                    {/* <button onClick={()=>setStep(curr=>curr+1)} type="button" className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"> */}

                                    {/* <button onClick={initiateAppointment} type="button" className="text-white bg-black hover:bg-slate-900 dark:text-black dark:bg-white dark:hover:bg-slate-100 border focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"> */}
                                    <button onClick={initiateAppointment} type="button" className="text-white bg-sky-700 hover:bg-sky-800 border focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                                        Book Now (${doctor.doctorProfile?.hourlyWage}) <MoveRight className="w-4 h-4 ml-3"/>
                                    </button>
                                    </div>
        
                                    {/* <h2 className="scroll-m-20 border-b py-4 text-2xl font-semibold tracking-tight first:mt-0">${doctor.doctorProfile?.hourlyWage}</h2> */}
        
                                </div>    
                            </div>
                        ):(
                            <div>Service Details Component</div>
                        )}        
                    </div>
                </div>
            ):(
                <div className="p-8">
                    {/*
                        FullName 
                        Gender 
                        Phone Number 
                        Email 
                        DOB 
                        Address/Location 
                        Reason for the Visit 
                        Occupation 
                        Upload Medical Docs
                    */}
                    <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="scroll-m-20 border-b pb-2 mb-6 text-3xl font-semibold tracking-tight first:mt-0">Please provide the following details</h2>
                        
                        {step===2?(
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <TextInput label="First Name" register={register} name="firstName" errors={errors} className="col-span-1"/>
                                    <TextInput label="Last Name" register={register} name="lastName" errors={errors} className="col-span-1"/>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <TextInput label="Phone Number" register={register} name="phone" errors={errors} className="col-span-1"/>
                                    <TextInput label="Email Address" register={register} name="email" errors={errors} className="col-span-1"/>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <DatePickerInput className="col-span-1" date={dob} setDate={setDOB} title="Date of Birth"/>
                                    <RadioInput radioOptions={genderOptions} title="Gender" name="gender" register={register} errors={errors} className="col-span-1"/>
                                </div>
                                <div className="mt-8 flex justify-center gap-8 items-center">
                                    {/* <div className="flex items-center space-x-8 py-4"> */}
                                    <Button  type="button" onClick={()=>setStep(currStep=>currStep-1)}>Previous</Button>
                                    <Button variant={"outline"} type="button" onClick={()=>setStep(currStep=>currStep+1)}>Next</Button>
                                </div> 
                            </div>
                        ):(
                            <div className="space-y-6">
                                {/* <h2>step 3</h2> */}
                                <div className="grid grid-cols-2 gap-6">
                                    <TextInput label="Location" register={register} name="location" errors={errors} className="col-span-1"/>
                                    <TextInput label="Occupation" register={register} name="occupation" errors={errors} className="col-span-1"/>
                                </div>
                                <TextAreaInput label="Reason for Seeing the Doctor" register={register} name="appointmentReason" errors={errors}/>
                                {/* <MultipleFileUpload 
                                    label="Medical documents" 
                                    files={medicalDocs} 
                                    setFiles={setMedicalDocs} 
                                    endpoint="patientMedicalDocs"
                                /> */}
                                <div className="mt-8 flex justify-center gap-8 items-center">
                                    <Button type="button" onClick={()=>setStep(currStep=>currStep-1)}>Previous</Button>
                                    {loading?(
                                        <Button disabled><Loader2 className="animate-spin" />Saving please wait...</Button>
                                    ):(
                                        <Button variant={"outline"} type="submit" onClick={()=>setStep(currStep=>currStep+1)}>Submit</Button>
                                    )}                           
                                </div> 
                            </div>
                        )}
                    </form>     
                </div>
            )}
        </>

    );
}