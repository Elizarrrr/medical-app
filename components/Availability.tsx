"use client";
import React from 'react'
import { Calendar } from './ui/calendar'

export default function Availability() {
    const [bookDate, setBookDate] = React.useState<Date | undefined>(new Date());

    const GMT = bookDate?.toString().split("GMT")[1].split(" ")[0];

    const formattedDate = `${bookDate?.toString().split(" ").slice(0,3).join(" ")} - GMT${GMT}`;

    const timeStamps=[
        {
        time:"9:00",
        period:"am"
        },
        {
        time:"10:00",
        period:"am"
        },
        {
        time:"11:00",
        period:"am"
        },
        {
        time:"12:00",
        period:"pm"
        },
        {
        time:"1:00",
        period:"pm"
        },
        {
        time:"2:00",
        period:"pm"
        },
        {
        time:"3:00",
        period:"pm"
        },
        {
        time:"4:00",
        period:"pm"
        },
        {
        time:"5:00",
        period:"pm"
        },
    ];

    console.log(bookDate);

  return (
    <div className="mb-[200px]">
        <h2 className="font-bold py-4 text-xl uppercase text-slate-800">Select a Date and Time</h2>
        <div className="grid grid-cols-2 gap-4 lg:gap-0">
            <div className="sm:col-span-1 col-span-full">
                <Calendar mode="single" selected={bookDate} onSelect={setBookDate} className="rounded-md border"/>
            </div>
            <div className="sm:col-span-1 col-span-full">
                <div className="px-4">
                    <h2 className="pb-4 font-semibold text-sky-700 text-center py-3 px-4 border border-sky-500">{formattedDate}</h2>
                    <div className="py-3 grid grid-cols-3 gap-2">
                        {
                            timeStamps.slice(0,5).map((item,i)=>{
                                return (
                                <button className="bg-sky-600 dark:bg-teal-500 text-white p-2 text-sm text-center" key={i}>{item.time}{item.period}</button>
                                );
                            })
                        }
                        <button className="text-[0.7rem] text-center bg-sky-700 dark:bg-teal-400 text-white py-2 px-3 truncate">More times</button>
                    </div>
                </div>
            </div>
        </div>
        {/*Calendar*/}
        {/*Available Time*/}
    </div>
  )
}
