import React from "react";
import ServiceForm from "@/components/Dashboard/ServiceForm";

export default function page() {
    return(
        <div>
            <ServiceForm className="text-black dark:text-white" title="Create Service"/>
        </div>
    );
}