"use client";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    function handleSearch(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(query);
        router.push(`/search?query=${query}`);
        setQuery("");
    }

  return (
    <div>
        <form className="max-w-md" onSubmit={handleSearch}>   
            <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true"/>
                </div>
                 <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-gray-900 focus:border-white" 
                    placeholder="Search..." 
                    onChange = {e=>setQuery(e.target.value)}
                    value={query}
                />
                <button type="submit" className="text-white absolute end-1.5 bottom-1.5 bg-sky-700 hover:bg-sky-800 focus:outline-none font-medium rounded-full text-sm px-4 py-2">Search</button>
            </div>
        </form>
    </div>
  )
}
