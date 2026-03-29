import React from 'react'
import SectionHeading from './SectionHeading'
import ToggleButton from './ToggleButton'
import Link from 'next/link'
import { ArrowUpRight, Map } from 'lucide-react'
import DoctorsListCarousel from './DoctorsListCarousel'
import { Button } from './ui/button'
import { Doctor } from '@/types/types'

export default function DoctorsList({
  title="Telehealth Visit", 
  isInPerson,
  className="bg-slate-200 py-8 lg:py-24 dark:bg-slate-950",
  doctors
}:{
  title?:string; 
  isInPerson?:boolean;
  className?:string;
  doctors:Doctor[];
}) {

  return (
    <div className={className}>
         <div className="max-w-6xl mx-auto">
            <SectionHeading title={title}/>

            <div className="py-4 flex items-center justify-between">
                {isInPerson?(
                    <Link href="" className="text-sm flex items-center text-sky-600 font-semibold dark:text-white">
                      <Map className="mr-2 flex-shrink-0 w-4 h-4 dark:text-white"/><span>Map View</span>
                    </Link>
                  ):(
                    <ToggleButton/>
                )}
                <Button asChild className="">
                    <Link className="" href={`/category?mode=${title}`}>
                      See All
                      <ArrowUpRight className="h-4 w-4 ms-2"/>
                    </Link>
                </Button>
            </div>
            
            <div className="py-6">
                <DoctorsListCarousel doctors={doctors} isInPerson={isInPerson}/>
            </div>
         </div>   
    </div>
  )
}
