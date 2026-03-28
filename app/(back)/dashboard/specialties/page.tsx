import React from "react";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import NewButton from "@/components/Dashboard/Doctor/NewButton";
import SpecialtyCard from "@/components/Dashboard/SpecialtyCard";
import { Microscope } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSpecialties } from "@/actions/specialties";

export default async function page() {
    const specialties = (await getSpecialties()).data||[];

    return(
        <div>
            {/* Header */}
            
           
            {/* 2Panels */}
            <div className="grid grid-cols-3">
               
                {/*List Panel*/}
                <div className="lg:col-span-1 sm:col-span-full py-3 border-r">
                    <PanelHeader title="Specialties" count={specialties.length} icon={Microscope}/>
                    {/* <div className="flex items-center justify-between">
                        <PanelHeader title="Specialties" count={specialties.length} icon={Microscope}/>
                        <div className="lg:hidden">
                        <NewButton title="New Specialty" href="/dashboard/specialties/new"/>
                        </div>
                    </div> */}
                    <div className="px-6">
                    
                    <ScrollArea className="h-96 w-full">
          
                        {specialties.map((specialty) => (
                            <SpecialtyCard key={specialty.title} specialty={specialty}/>

                        
                        ))}
           
                    </ScrollArea>
                                    
                    </div>          
                </div>

                {/*Display Panel*/}
                <div className="lg:col-span-2 sm:col-span-full hidden lg:block">
                <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
                    <div className="flex items-center gap-4">
                        <NewButton title="New Specialty" href="/dashboard/specialties/new"/>
                    </div>
                </div>

                <div className="flex h-72 items-center justify-center">
                    <div className="py-4 px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center gap-1 text-sm">
                        <Microscope/>
                        <div className="py-3">
                            {""}
                            <p>You have {specialties.length} specialties today</p>
                        </div>
                        <NewButton title="New Specialty" href="/dashboard/specialties/new"/>
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
}

//{services.length.toString().padStart(2,"0")}