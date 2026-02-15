"use client"
import { TabItem, Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
import { Microscope, Stethoscope, Syringe } from "lucide-react";

export default function TabbedItems() {
    const services = [
        {
            title:"In-person doctor visit",
            image:"/doctor1.jpg",
            slug:"in-person-doctor-visit",
        },
        {
            title:"Psychiatric consultation",
            image:"/doctor1.jpg",
            slug:"psychiatric-consultation",
        },
        {
            title:"Nutritional counseling",
            image:"/doctor1.jpg",
            slug:"nutritional-counseling",
        },
        {
            title:"Telehealth consultation",
            image:"/doctor1.jpg",
            slug:"telehealth-consultation",
        },
        {
            title:"Pediatric checkups",
            image:"/doctor1.jpg",
            slug:"pediatric-checkups",
        },
        {
            title:"Dermatology",
            image:"/doctor1.jpg",
            slug:"dermatology",
        },
        {
            title:"UTI consultation",
            image:"/doctor1.jpg",
            slug:"uti-consultation",
        }
    ];
    
    const tabs = [
        {
            title:"Top Booked",
            icon: Stethoscope,
            component:<ServiceList data={services}/>,
            content:[]
        },
        {
            title:"Doctors",
            icon:Syringe,
            component:<LinkCards className=""/>,
            content:[]
        },
        {
            title:"Specialists",
            icon:Microscope,
            component:<LinkCards className=""/>,
            content:[]
        },
    ]
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
