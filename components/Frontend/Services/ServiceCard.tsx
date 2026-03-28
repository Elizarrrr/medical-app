import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceWithDoctorProfilesCount } from "@/actions/services";

export default function ServiceCard({service}:{service:ServiceWithDoctorProfilesCount}) {
    return(
        <Link href={`/service/${service.slug}`} className="border rounded-md bg-slate-200 hover:bg-slate-300 duration-300 flex items-center gap-4 overflow-hidden px-2 dark:bg-slate-800 dark:hover:bg-slate-700">
            <Image src={service.imageUrl} width={365} height={369} alt={service.title} className="w-14 h-14 object-contain aspect-video"/>
            <div className="flex flex-col w-2/3 py-4">
                <h2>{service.title}</h2>
                <p className="text-[0.6rem]">{service._count.doctorProfiles} Doctors Available</p>
            </div>
        </Link>
    );
}