"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import TextInput from "../../FormInputs/TextInput";
import { useForm } from "react-hook-form";
import SelectInput from "../../FormInputs/SelectInput";
import { Appointment, AppointmentStatus } from "@prisma/client";
import { updateAppointmentById } from "../../../actions/appointments";
import toast from "react-hot-toast";

export type AppointmentUpdateProps = {
    status:AppointmentStatus;
    meetingLink:string;
    meetingProvider:string;
}

export default function UpdateAppointmentForm({appointment}:{appointment:Appointment}) {
    const [loading,setLoading] = useState(false);
    const statusOptions = [
        {
          label:"Approve",
          value:"approved"
        },
        {
            label:"Reject",
            value:"rejected"
        },
        {
            label:"Pending",
            value:"pending"
        }
    ];

    const meetingProviders = [
        {
          label:"Zoom",
          value:"zoom"
        },
        {
            label:"Google Meet",
            value:"google-meet"
        },
        {
            label:"Skype",
            value:"skype"
        },
        {
            label:"Microsoft Teams",
            value:"microsoft-teams"
        }
    ];

    const {register,handleSubmit,formState:{errors}}=useForm<AppointmentUpdateProps>({
        defaultValues:{
            meetingLink:appointment.meetingLink,
            meetingProvider:appointment.meetingProvider,
            status:appointment.status
        },
    });

    async function handleUpdate(data:AppointmentUpdateProps){
        //console.log(data);
        setLoading(true);
        try {
            await updateAppointmentById(appointment.id,appointment.patientId,data);
            setLoading(false);
            toast.success("Appointment Updated Successfully");
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return(
        <form className="border border-teal-700 shadow rounded-md p-4 mx-4 my-4" onSubmit={handleSubmit(handleUpdate)}>
            {/* border-slate-400 */}
            <div className="sm:col-span-4">
            <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">Appointment Details</h2>
                <Button disabled={loading} className="dark:bg-white dark:text-black dark:hover:bg-slate-100">
                {loading?"Saving please wait...":"Update Appointment"}
                </Button>
            </div>
            
            <div className="mt-2">
                {/* <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$</span>
                <input type="number" name="price" id="price" value={price} onChange={(e)=>setPrice(+e.target.value)} autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6" placeholder="100"/>
                </div> */}
                <div className="py-2">
                    <TextInput label="Meeting Link" register={register} name="meetingLink" errors={errors} className="col-span-full sm:col-span-1" placeholder="https://meet.google.com/ecw-kfvt-pcn"/>
                </div>
                <div className="py-2">
                    <div className="grid grid-cols-2 gap-6">
                        {/* <RadioInput title="Approve the Appointment" name="status" errors={errors} register={register} radioOptions={statusOptions} className="col-span-1"/> */}
                        <SelectInput label="Meeting Provider" name="meetingProvider" register={register} options={meetingProviders} className="col-span-1"/>
                        <SelectInput label="Appointment Status" name="status" register={register} options={statusOptions} className="col-span-1"/>
                    </div>
                </div>
                </div>
            </div>
        </form>
    );
}