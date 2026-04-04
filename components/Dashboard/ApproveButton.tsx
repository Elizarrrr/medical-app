import { cn } from "@/lib/utils";
import { DoctorStatus } from "@prisma/client";
import React from "react";

export default function ApproveButton({status}:{status:DoctorStatus}) {
    return(
        <button
            className={cn(
                "text-xs py-1.5 px-3 rounded-md uppercase",
                status === "approved"
                ? "bg-green-500"
                : status === "pending"
                ? "bg-orange-500"
                : "bg-red-500"
            )}
        >
            {status}
        </button>
    );
}