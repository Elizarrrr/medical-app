"use client"
import { TabItem, Tabs } from "flowbite-react";
import { Microscope, Stethoscope } from "lucide-react";
import { ServiceWithDoctorProfilesCount } from "@/actions/services";
import { Specialty } from "@prisma/client";
import { FC, SVGProps } from "react";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";

type TabbedItemsProps = {
  services:ServiceWithDoctorProfilesCount[];
  specialties:Specialty[];
}

export default function TabbedItems({services,specialties}:TabbedItemsProps) {
    // const services = [
    //     {
    //         title:"In-person doctor visit",
    //         image:"/doctor1.jpg",
    //         slug:"in-person-doctor-visit",
    //     },
    //     {
    //         title:"Psychiatric consultation",
    //         image:"/doctor1.jpg",
    //         slug:"psychiatric-consultation",
    //     },
    //     {
    //         title:"Nutritional counseling",
    //         image:"/doctor1.jpg",
    //         slug:"nutritional-counseling",
    //     },
    //     {
    //         title:"Telehealth consultation",
    //         image:"/doctor1.jpg",
    //         slug:"telehealth-consultation",
    //     },
    //     {
    //         title:"Pediatric checkups",
    //         image:"/doctor1.jpg",
    //         slug:"pediatric-checkups",
    //     },
    //     {
    //         title:"Dermatology",
    //         image:"/doctor1.jpg",
    //         slug:"dermatology",
    //     },
    //     {
    //         title:"UTI consultation",
    //         image:"/doctor1.jpg",
    //         slug:"uti-consultation",
    //     }
    // ];
    
    // const tabs = [
    //     {
    //         title:"Top Booked",
    //         icon: Stethoscope,
    //         component:<ServiceList data={services}/>,
    //         content:[]
    //     },
    //     {
    //         title:"Doctors",
    //         icon:Syringe,
    //         component:<LinkCards className=""/>,
    //         content:[]
    //     },
    //     {
    //         title:"Specialists",
    //         icon:Microscope,
    //         component:<LinkCards className=""/>,
    //         content:[]
    //     },
    // ];

    const tabs = [
        {
        title: "Popular Services",
        icon: Stethoscope as FC<SVGProps<SVGSVGElement>>,
        component: <ServiceList data={services} />,
        content: [],
        },
        {
        title: "Specialties",
        icon: Microscope as FC<SVGProps<SVGSVGElement>>,
        component: <LinkCards specialties={specialties} />,
        content: [],
        }
    ];

    
  return (
    <Tabs aria-label="Default tabs" variant="default">
        {
            tabs.map((tab,i)=>{
                return(
                    <TabItem key={i} active title={tab.title} icon={tab.icon}>
                    {tab.component}
                    </TabItem>
                )
            })
        }
    </Tabs>
  );
}
