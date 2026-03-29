"use client";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "../../utils/generateSlug";
import { createManySpecialties, createSpecialty, updateSpecialty } from "../../actions/specialties";
import { Specialty } from "@prisma/client";
import { cn } from "@/lib/utils";

export type SpecialtyProps={
    title:string,
    //imageUrl:string,
    slug:string
}

// export default function SpecialtyForm({title,className,initialData}:{title:string;className?:any,initialData?:Specialty}) {
export default function SpecialtyForm({
  title,
  className,
  initialData,
}: {
  title: string;
  className?: string;
  initialData?: Specialty;
}) {
    const editingId = initialData?.id||"";
    const [isLoading, setIsLoading]=useState(false);
    //const [imageUrl,setImageUrl] = useState("");
    const {register,handleSubmit,reset,formState:{errors}}=useForm<SpecialtyProps>({
      defaultValues:{
        title:initialData?.title,
      },
    });
    const router=useRouter();
    
    async function onSubmit (data: SpecialtyProps){
      setIsLoading(true);
      const slug = generateSlug(data.title);
      data.slug = slug;
      //data.imageUrl = imageUrl;
      console.log(data);

      if(editingId){
        await updateSpecialty(editingId,data);
        toast.success("Specialty Updated Successfully");
      }else{
          await createSpecialty(data);
          toast.success("Specialty Created Successfully");
      }
         
      reset();
      router.push("/dashboard/specialties")
    }

    async function handleCreateMany(){
        setIsLoading(true);
        try {
            await createManySpecialties();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // <div className="w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
        <div className={cn("w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-300 dark:border-gray-200 mx-auto", className)}>
        <div className="text-center border-b border-gray-200 py-4">
          <div className="flex items-center justify-between px-6">
            {/* <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">Create Specialty</h1> */}
            <h1 className={cn("scroll-m-20 text-2xl font-bold tracking-tight", /* optional dynamic styles */)}>{title}</h1>
            <Button asChild variant={"outline"}>
                <Link href="/dashboard/specialties"><X className="w-4 h-4"/></Link>
            </Button>
          </div>
        </div>
        <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-2">
                <TextInput label="Specialty Title" register={register} name="title" errors={errors} className="col-span-full"/>
                {/* <ImageInput label="Specialty Image" imageUrl={imageUrl} setImageUrl={setImageUrl} className="col-span-full" endpoint="SpecialtyImage"/> */}
          </div>

          {/* <div className="mt-8 flex justify-end gap-8 items-center"> */}
          <div className="mt-8 flex justify-center gap-8 items-center">
                <SubmitButton title={editingId?"Update Specialty":"Create Specialty"} isLoading={isLoading} loadingTitle={editingId?"Updating please wait...":"Saving please wait..."}/>
                
                {/* <Button className="bg-black text-white hover:bg-slate-900" onClick={handleCreateMany}>
                    {isLoading?"Creating...": "Create Many"}
                </Button> */}

                {/* <Button asChild variant={"outline"}><Link href="/dashboard/specialties">Cancel</Link></Button> */}
          </div>
          
        </form>

      </div>
    );
  }
  