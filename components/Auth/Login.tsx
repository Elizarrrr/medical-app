"use client";
import Image from "next/image";
import Link from "next/link";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "../../types/types";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useRouter, useSearchParams } from "next/navigation";
import TextInput from "../FormInputs/TextInput";

export default function LoginFormWithBg() {
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get("returnUrl") || "dashboard";
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginInputProps>();
    
    async function onSubmit(data: LoginInputProps) {
      setIsLoading(true);

      try {
        console.log("Attempting to sign in with credentials:", data);
        const loginData = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        
        console.log("SignIn response:", loginData);
        
        if (loginData?.error) {
          // Login failed - wrong credentials
          toast.error("Sign-in error: Check your credentials");
          setShowNotification(true);
        } else {
          // Login successful
          setShowNotification(false);
          reset();
          toast.success("Login Successful");
          router.push(returnUrl);
        }
      } catch (error) {
        // Network or unexpected error
        console.error("Network Error:", error);
        toast.error("It seems something is wrong with your Network");
        setShowNotification(false);
      } finally {
        setIsLoading(false); // Always stop loading (success or fail)
      }
    }

    return(
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
            Enter your details to login to your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                {showNotification && (
                <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Signin error!</span> Please Check your Credentials
                </Alert>
                )}
          
            <TextInput label="Email Address" register={register} name="email" type="email" errors={errors} placeholder="eg johndoe@gmail.com"/>
            <TextInput label="Password" register={register} page="login" name="password" type="password" errors={errors} placeholder="******"/>
           
            <SubmitButton title="Login" isLoading={isLoading} loadingTitle="Signing you in please wait..."/>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-green-600 hover:text-green-500">
              Sign up
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