import { Stethoscope, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DoctorCard({
    isInPerson=false
}:{isInPerson?:boolean}) {

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

  return (
    <div className="border border-gray-200 bg-slate-100 inline-flex flex-col py-8 px-6 rounded-md hover:border-gray-400 duration-300 transition-all dark:bg-slate-900 dark:border-gray-600 dark:hover:border-gray-400">
        
        <Link href="/doctors/slug">
            <h2 className="uppercase font-bold text-2xl">Vijal Patel</h2>
            {isInPerson && (<p  className='py-3'>3250 Lincoln Highway, Kendall Park, NJ 08824</p>)}

            <div className="flex items-center gap-4 py-4">
                <div className='relative'>
                    <Image src="/doctor1.jpg" width={365} height={369} alt="Doctor" className="w-24 h-24 rounded-full object-cover"/>
                    {!isInPerson && (<p className="absolute bottom-0 right-2 bg-sky-200 w-10 h-10 flex items-center justify-center rounded-full text-sky-700"><Video className="w-6 h-6"/></p>)}
                    
                </div>

                <div className="flex flex-col gap-2">
                    <p className="flex items-center">
                        <Stethoscope className="w-4 h-4 mr-2 flex-shrink-0"/>
                        <span>Family Medicine</span>
                    </p>
                    <p className="bg-sky-200 dark:bg-teal-500 py-3 px-4 uppercase">
                        Available Today
                    </p>
                </div>
            </div>  
        </Link>

        <div className="pt-6 border-t border-gray-400 dark:border-gray-600">
            <h3 className="flex gap-4 justify-between item-center"><span className="text-gray-600 dark:text-gray-400">Tue, Mar 12</span> <span className="font-semibold">$137</span></h3>
            <div className="py-3 grid grid-cols-3 gap-2">
                {
                    timeStamps.slice(0,5).map((item,i)=>{
                        return (
                        <Link className="bg-sky-600 dark:bg-teal-500 p-2 text-sm text-center text-white" key={i} href="#">
                            {item.time}{item.period}
                        </Link>
                        );
                    })
                }
                <Link className="text-[0.7rem] text-center bg-sky-700 dark:bg-teal-400 py-2 px-3 truncate text-white" href="/doctors/slug">
                    More times
                </Link>
            </div>
        </div> 
    </div>
  )
}
