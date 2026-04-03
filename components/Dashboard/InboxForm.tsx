"use client";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import { Service } from "@prisma/client";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { InboxProps } from "@/types/types";
import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { createInboxMessage } from "../../actions/inbox";
import toast from "react-hot-toast";

export type Option = {
  label: string;
  value: string;
};

export type Options = Option[];

// import QuillEditor from "../FormInputs/QuillEditor";

const QuillEditor = dynamic(
  () => import("../FormInputs/QuillEditor"), 
  {
  ssr: false,
  }
);

export type ServiceProps={
    title:string,
    imageUrl:string,
    slug:string
}

interface InboxFormProps {
  title: string;
  initialData?: Service;
  users: Options;
  session: Session | null;
}

// export default function InboxForm({title,initialData,users,session}:{title:string;initialData?:Service;users:Options;session:Session|null;}) {
export default function InboxForm({ title, initialData, users, session }: InboxFormProps) {
    const editingId = initialData?.id||""
    const [isLoading, setIsLoading]=useState(false);
    // const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedUser, setSelectedUser] = useState<Option | null>(null);
    const [content, setContent] = useState("");
    const {register,handleSubmit,reset,formState:{errors}} = useForm<InboxProps>();
    const router = useRouter();
    
    async function onSubmit (data: InboxProps){
      if (!selectedUser) {
        toast.error("Please select a recipient.");
        return;
      }
      data.receiverId = selectedUser.value;
      data.userId = session?.user?.id ?? "";
      data.senderId = session?.user?.id??"";
      data.senderName = session?.user?.name??"";
      data.senderEmail = session?.user?.email??"";
      //subject is the data thus no need for data.subject...
      data.body = content;
      setIsLoading(true);
      console.log(data);

      try {
        const res = await createInboxMessage(data);
        if(res.status===201){
          reset();
          setIsLoading(false);
          toast.success("Message Sent Successfully");
          router.push(`/dashboard/${session?.user.role==="DOCTOR"?"doctor":"user"}/inbox`);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }

    }

    return (
        <div className="w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
        <div className="text-center border-b border-gray-200 py-4">
          <div className="flex items-center justify-between px-6">
            <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">{title}</h1>
            <Button asChild variant={"outline"}>
                <Link href="/dashboard/doctor/inbox"><X className="w-4 h-4"/></Link>
            </Button>
          </div>
        </div>
        <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-2">
                <FormSelectInput
                  label="Recipients"
                  options={users}
                  option={selectedUser}
                  setOption={setSelectedUser}
                />
                <TextInput label="Subject" register={register} name="subject" errors={errors} className="col-span-full "/>
                <QuillEditor
                  label="Write the Content of the Message"
                  className=""
                  value={content}
                  onChange={setContent}
                />
          </div>

          {/* <div className="mt-8 flex justify-end gap-8 items-center"> */}
          <div className="mt-8 flex justify-center gap-8 items-center">
                <SubmitButton title={editingId?"Update Message":"Create Message"} isLoading={isLoading} loadingTitle={editingId?"Updating please wait...":"Saving please wait..."}/>
                {/* <Button className="bg-black text-white hover:bg-slate-900" onClick={handleCreateMany}>
                    {isLoading?"Creating...": "Create Many"}
                </Button> */}
                {/* <Button asChild variant={"outline"}><Link href="/dashboard/doctor/inbox">Cancel</Link></Button> */}
          </div>
          
        </form>
      </div>
    );
  }
  