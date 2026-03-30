import { Stethoscope, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Doctor, DoctorProfileAvailability } from '@/types/types';
import { getDayName } from '@/utils/getDayName';
import { getShortDate } from '@/utils/getShortDate';

export default function DoctorCard({
    // isInPerson=false,
    doctor
}:{
    isInPerson?:boolean;
    doctor:Doctor;
}) {

    // const timeStamps=[
    //     {
    //     time:"9:00",
    //     period:"am"
    //     },
    //     {
    //     time:"10:00",
    //     period:"am"
    //     },
    //     {
    //     time:"11:00",
    //     period:"am"
    //     },
    //     {
    //     time:"12:00",
    //     period:"pm"
    //     },
    //     {
    //     time:"1:00",
    //     period:"pm"
    //     },
    //     {
    //     time:"2:00",
    //     period:"pm"
    //     },
    //     {
    //     time:"3:00",
    //     period:"pm"
    //     },
    //     {
    //     time:"4:00",
    //     period:"pm"
    //     },
    //     {
    //     time:"5:00",
    //     period:"pm"
    //     },
    // ];

    const today: keyof DoctorProfileAvailability = getDayName();
    const times = doctor.doctorProfile?.availability?.[today] ?? null;
    const formattedDate = getShortDate();
    //console.log(times);

  return(

        <>
            {times && times.length > 0 && (
                <div className="border border-gray-300 bg-slate-100 inline-flex flex-col py-8 px-6 rounded-md hover:border-gray-400 duration-300 transition-all dark:bg-slate-900 dark:border-gray-600 dark:hover:border-gray-400">
                    <Link href={`/doctors/${doctor.slug}?id=${doctor.id}`}>
                        <h2 className="uppercase font-bold text-2xl">{`${doctor.doctorProfile?.firstName} ${doctor.doctorProfile?.lastName}`}</h2>
                        {/* {isInPerson && (<p className='py-3'>3250 Lincoln Highway, Kendall Park, NJ 08824</p>)} */}
                        {/* {isInPerson && doctor.doctorProfile.city && (<p>{doctor.doctorProfile.city}</p>)} */}

                        <div className="flex items-center gap-4 py-4">
                            <div className='relative'>
                                <Image src={doctor.doctorProfile?.profilePicture ?? "/defaultuser.png"} width={365} height={369} alt={doctor.name} className="w-24 h-24 rounded-full object-cover"/>
                                {/* {!isInPerson && (<p className="absolute bottom-0 right-2 bg-sky-200 w-10 h-10 flex items-center justify-center rounded-full text-sky-700"><Video className="w-6 h-6"/></p>)} */}    
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="flex items-center">
                                    <Stethoscope className="w-4 h-4 mr-2 flex-shrink-0"/>
                                    {/* <span>${doctor.doctorProfile?.specialty}</span> */}
                                    <span>Family Medicine</span>
                                </p>
                                <p className="bg-slate-200 text-slate-900 py-3 px-4 uppercase">
                                    Available Today
                                </p> 
                            </div>
                        </div>
                    </Link>
                    <div className="pt-6 border-t border-gray-400 dark:border-gray-600">
                        <h3 className="flex gap-4 justify-between item-center"><span className="text-gray-600 dark:text-gray-400">{formattedDate}</span> <span className="font-semibold">${doctor.doctorProfile?.hourlyWage}</span></h3>
                        <div className="py-3 grid grid-cols-3 gap-2">
                            {
                                times.slice(0,5).map((item,i)=>{
                                    return (
                                    <Link 
                                        className="bg-sky-600 p-2 text-sm text-center text-white" 
                                        key={i} 
                                        href={`/doctors/${doctor.slug}?id=${doctor.id}`}
                                    >
                                        {item}
                                    </Link>
                                    );
                                })
                            }
                            <Link 
                                className="text-[0.7rem] text-center bg-sky-700 py-2 px-3 truncate text-white" 
                                href={`/doctors/${doctor.slug}?id=${doctor.id}`}
                            >
                                More times
                            </Link>
                        </div>
                    </div>
                </div>
            )
            // :(
            //     <div className="">
            //     <h2>No {doctor.doctorProfile?.operationMode} available for this Day</h2>
            //     </div>   
            // )
                
            }
        </>

    );
}