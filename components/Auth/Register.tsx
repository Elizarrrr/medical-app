"use client";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { type RegisterInputProps } from "../../types/types";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "../../actions/users";
import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RegisterWithBg({role="USER",plan=""}:{role?:string | string[] | undefined;plan?:string | string[] | undefined}) {

    const [isLoading, setIsLoading]=useState(false);
    const {register,handleSubmit,reset,formState:{errors}}=useForm<RegisterInputProps>();
    const router=useRouter();
    
    async function onSubmit (data: RegisterInputProps){
      setIsLoading(true);

      data.role = role;
      data.plan = plan;

      try{
        const user = await createUser(data);

        if(user && user.status === 200) {
          // Success - account created
          console.log("Account Created Successfully");
          reset();
          toast.success("Account Created Successfully")
          router.push(`/verify-account/${user.data?.id}`);
          console.log(user.data);
        } else {
          // Failed - show error to user
          console.log("Error:", user.error);
          toast.error(user.error || "Failed to create account"); // Added: Show error toast
        }

      } catch(error) {
        // Unexpected error
        console.log("Exception:", error);
        toast.error("Something went wrong. Please try again."); // Added: Show error toast
      } finally {
        setIsLoading(false); // Added: Always stop loading (success or fail)
      }
    }

    return (
      <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details to create an account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                
            <TextInput label="Full Name" register={register} name="fullName" errors={errors} placeholder="eg John Doe"/>    
            <TextInput label="Email Address" register={register} name="email" type="email" errors={errors} placeholder="eg johndoe@gmail.com"/>
            <TextInput label="Phone Number" register={register} name="phone" type="tel" errors={errors} placeholder="eg +254700000000"/>
            <TextInput label="Password" register={register} name="password" type="password" errors={errors} placeholder="******"/>
           
            <SubmitButton title="Sign up" isLoading={isLoading} loadingTitle="Creating account please wait..."/>
            {/* <Button variant="outline" className="w-full">
              Sign up with Google
            </Button> */}
          </form>


          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-green-600 hover:text-green-500">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/nursesbg.jpg"
          alt="Image"
          width="1000"
          height="666"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      </div>
    );
}