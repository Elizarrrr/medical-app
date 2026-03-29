import SpecialtyForm from "@/components/Dashboard/SpecialtyForm";
import React from "react";
// import SpecialtyForm from "../../../../../../components/Dashboard/SpecialtyForm";

export default function page() {
    return(
        <div>
            <SpecialtyForm className="text-black dark:text-white" title="Create Specialty"/>
        </div>
    );
}