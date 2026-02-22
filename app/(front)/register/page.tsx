import RegisterWithBg from "@/components/Auth/Register";
import React from "react";

// Make the page component async
export default async function page({
    searchParams
}: {
    searchParams: Promise<{[key:string]: string | string[] | undefined}>;  // searchParams is now a Promise
}) {
    // Await searchParams before accessing properties
    const params = await searchParams;
    const {role, plan} = params;
    
    console.log(role, plan);
    
    return(
        <div className="">
           <RegisterWithBg role={role} plan={plan}/>
        </div>
    );
}