import React from "react";
import { Button } from "@/components/ui/button";
import { Loader, Plus, X } from "lucide-react";

type SelectedProps={
    handleAddAll:()=>void;
    timesArray:string[];
    handleAddTime:(time:string)=>void;
    selectedTimes:string[];
    loading:boolean;
    handleSubmit:()=>void;
    clearAll:()=>void;
    handleRemoveTime:(index:number)=>void;
    day:string
};

export default function SelectedTimes({
    handleAddAll,
    timesArray,
    handleAddTime,
    selectedTimes,
    loading,
    handleSubmit,
    clearAll,
    handleRemoveTime,
    day
}:SelectedProps) {

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2  border-gray-200 dark:border-gray-600 shadow rounded-md divide-x divide-gray-200">
            <div className="p-4">
                <h2 className="font-semibold">Select the Times you are Available for this Day</h2>
                <div className="py-6 grid grid-cols-3 gap-3">
                            <button onClick={handleAddAll} className="flex items-center justify-center py-2 px-2 border border-sky-300 rounded-md">
                                <span>Add All</span>
                                <Plus className="w-3 h-3 ml-2"/>
                            </button>
                    {
                        timesArray.map((time,i)=>{
                            return(
                                <button onClick={()=>handleAddTime(time)} key={i} className="flex items-center justify-center py-2 px-2 border border-slate-200 dark:border-gray-600 rounded-md">
                                    <span>{time}</span>
                                    <Plus className="w-3 h-3 ml-2"/>
                                </button>
                            );
                        })
                    }
                </div>
            </div>
            <div className="p-4">
                <h2 className="font-semibold">Here is your Selected Time for <span className="capitalize">{day}</span></h2>
                <div className="py-6 grid grid-cols-3 gap-3">
                    {
                        selectedTimes.map((time,i)=>{
                            return(
                                <button onClick={()=>handleRemoveTime(i)} key={i} className="flex items-center justify-center py-2 px-2 border border-sky-500 bg-sky-50 rounded-md dark:bg-slate-900 dark:text-white">
                                    <span>{time}</span>
                                    <X className="w-3 h-3 ml-2"/>
                                </button>
                            );
                        })
                    }         
                </div>

                        <div className="border-t border-gray-200 pt-4 flex justify-between">
                            {loading?(<Button disabled className="bg-black text-white hover:bg-slate-900 rounded-md"><Loader className="animate-spin w-4 h-4"/>Saving Please wait...</Button>):
                            (<Button onClick={handleSubmit} className="bg-black text-white hover:bg-slate-900 rounded-md dark:bg-white dark:text-black dark:hover:bg-slate-100">Save Settings</Button>)}   
                            <button onClick={clearAll} className="flex items-center justify-center py-2 px-2 border border-red-300 rounded-md">
                                            <span>Clear All</span>
                                            <X className="w-3 h-3 ml-2"/>
                            </button>
                        </div>

            </div>
        </div>
    );
}