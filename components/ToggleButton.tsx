import React from "react";

export default function ToggleButton() {
    return(
        <div>
            <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer"/>
            <div className="relative w-9 h-5 bg-gray-200 border border-gray-300 
            peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft 
            dark:peer-focus:ring-brand-soft rounded-full peer 
            peer-checked:after:translate-x-full 
            rtl:peer-checked:after:-translate-x-full 
            peer-checked:after:border-buffer 
            after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
            after:bg-white after:rounded-full after:h-4 after:w-4 
            after:transition-all peer-checked:bg-brand">
            </div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Within 2 hours</span>
            </label>
        </div>
    );
}
