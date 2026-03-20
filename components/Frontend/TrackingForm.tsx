"use client";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
//import { updateUserById } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//import SubmitButton from "../FormInputs/SubmitButton";
import { Input } from "@/components/ui/input";
import { getApplicationByTrack } from "../../actions/onboarding";
import { useOnboardingContext } from "../../context/context";
 
// const FormSchema = z.object({
//   token: z.string().min(6, {
//     message: "Your token must be 6 characters.",
//   }),
// });
 
export default function TrackingForm() {
  const {setSavedDBData} = useOnboardingContext();
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
 
  const router = useRouter();
  const FormSchema = z.object({
    trackingNumber: z.string().min(2, {
      message: "Username must be at least 10 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackingNumber: "",
    },
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
       //Make Request
       const res = await getApplicationByTrack(data.trackingNumber);

       //Save this to the context API
       setSavedDBData(res?.data);

       if(res?.status===404){
        setShowNotification(true);
        setLoading(false);
       }
       if(res?.status===200){
        // setUserId(res.data?.userId!);
        // setPage(res.data?.page!);
        // setTrackingSuccessful(true);
        toast.success("Redirecting you");
        
        // router.push(`/onboarding/${res.data?.userId!}?page=${res.data?.page!}`);
        if(res?.status===200){
          if (res.data?.userId && res.data?.page) {
            toast.success("Redirecting you");
            router.push(`/onboarding/${res.data.userId}?page=${res.data.page}`);
            setLoading(false);
          } else {
            toast.error("Invalid response data");
            setLoading(false);
          }
        }

        setLoading(false);
       }else{
        throw new Error("Something went wrong")
       }
      //OnBoarding Page
    } catch (error) {
      toast.error("Something went wrong, Try again");
      setLoading(false);
      console.log(error);
    }
  }
 
  return (
        <Form {...form}>
            {showNotification && (
            <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Wrong Tracking Number!</span> Please Check the
                Number and Enter again
            </Alert>
            )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
             <FormField
                control={form.control}
                name="trackingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tracking Number</FormLabel>
                    <FormControl>
                      <Input placeholder="eg 6CXS5SN0H1" {...field} />
                    </FormControl>
                    <FormDescription>
                      {/* This is your public display name. */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
                {/* <Button type="submit" className="rounded-md bg-black text-white w-auto hover:bg-slate-900">Submit to Resume</Button> */}
                <Button
                  type="submit"
                  disabled={loading}
                  className=""
                >
                  {loading ? "Loading..." : "Submit to Resume"}
                </Button>

                {/*<SubmitButton title="Submit" isLoading={loading} loadingTitle="Fetching please wait..."/>*/}
        </form>
        </Form>
  
  );
}