import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginFormWithBg from "@/components/Auth/Login";

export default async function page() {
    const session = await getServerSession(authOptions)
    if(session){
        redirect("/dashboard");
    }
    return(
        <div className="">
            <LoginFormWithBg/>
        </div>
    );
}



