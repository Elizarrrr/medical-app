"use client";
import React, { useState } from 'react'

export default function DoctorDetails() {
    const [isActive,setIsActive]=useState("availability");

  return (
    <div>
        <div className="flex items-center justify-between">
            <button 
                onClick={()=>setIsActive("details")} 
                className={
                    isActive==="details"
                        ?"border py-4 px-8 bg-sky-600 text-white w-full uppercase dark:bg-teal-500 dark:text-black"
                        :"border py-4 px-8 border-gray-200 bg-slate-100 w-full uppercase dark:text-black"
                    }
            >
                Service Details
            </button>
            <button 
                onClick={()=>setIsActive("availability")} 
                className={
                    isActive==="availability"
                        ?"border py-4 px-8 bg-sky-600 text-white w-full uppercase dark:bg-teal-500 dark:text-black"
                        :"border py-4 px-8 border-gray-200 bg-slate-100 w-full uppercase dark:text-black"
                    }
            >
                Availability
            </button>
        </div>
        <div className="py-8 px-6">
            {isActive==="availability"?(
                <div>Availability Component</div>
            ):(
                <div>Service Details Component</div>
            )}
        </div>
    </div> 
  )
}
