"use client";
import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { getShortDate } from '@/utils/getShortDate';

export default function FixedBookButton({price}:{price:number|undefined}) {
    const formattedDate = getShortDate();

  return (
    <div className="fixed bottom-0 bg-white dark:bg-slate-950 z-50 w-full shadow-2xl py-8 px-6">
        <div className="max-w-4xl mx-auto gap-4 items-center flex justify-between">
            <div className="w-full">
                <p className="text-l font-bold">${price}</p>
                <p className="text-sm font-semibold">{formattedDate}</p>
            </div>

            {/* <Button variant="outline" className="px-6 py-3"> */}
            <Button variant="outline" className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold uppercase leading-5 transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                <Plus className="w-5 h-5 mr-1"/>
                Book  Appointment
            </Button>         
        </div>  
    </div>
  )
}
