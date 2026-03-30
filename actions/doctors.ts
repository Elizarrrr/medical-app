"use server"

import { prismaClient } from "@/lib/db";
import { Doctor } from "@/types/types";
import generateSlug from "../utils/generateSlug";

type ServiceProps={
    title:string;
    slug:string;
};

export type DataProps={
    doctors:Doctor[]|undefined;
    services:ServiceProps[];
};

export async function getDoctorsByServiceSlug(slug:string){
    try {
        if(slug){
            let doctors:Doctor[]|undefined = [];
            let services:ServiceProps[] = [];

            const service = await prismaClient.service.findUnique({
                where:{
                    slug,
                },
                include:{
                    doctorProfiles:{
                        include:{
                            availability:true,
                        },
                    },
                },
            });

            doctors = service?.doctorProfiles.map((doc)=>{
            return{
                id:doc.userId,
                name:`${doc.firstName} ${doc.lastName}`,
                email:doc.email??"",
                phone:doc.phone??"",
                slug:generateSlug(`${doc.firstName} ${doc.lastName}`),
                doctorProfile:doc,
            };
            });

            services = await prismaClient.service.findMany({
                where:{
                    id: {
                        not: service?.id, // Exclude the specific service ID
                    }, 
                },
            });

            const data:DataProps = {
                doctors,
                services,
            };

            return data as DataProps;
        }

    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getDoctorsBySpecialtySlug(slug:string){
    try {
        if(slug){
            let doctors:Doctor[]|undefined = [];
            let services:ServiceProps[] = [];

            const service = await prismaClient.specialty.findUnique({
                where:{
                    slug,
                },
                include:{
                    doctorProfiles:{
                        include:{
                            availability:true,
                        },
                    },
                },
            });

            doctors = service?.doctorProfiles.map((doc)=>{
            return{
                id:doc.userId,
                name:`${doc.firstName} ${doc.lastName}`,
                email:doc.email??"",
                phone:doc.phone??"",
                slug:generateSlug(`${doc.firstName} ${doc.lastName}`),
                doctorProfile:doc,
            };
            });

            services = await prismaClient.specialty.findMany({
                where:{
                    id: {
                        not: service?.id, // Exclude the specific service ID
                    }, 
                },
            });

            const data:DataProps = {
                doctors,
                services,
            };

            return data as DataProps;
        }

    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getDoctorsBySearch(query:string){
    if (query){
        const services = await prismaClient.service.findMany({
            where:{
              OR:[
                {title:{contains:query, mode:'insensitive'}},
                {slug:{contains:query, mode:'insensitive'}},
              ],
            },
            select:{
                id:true,
                title:true,
                slug:true,
                imageUrl:true,
                _count: {
                    select:{
                        doctorProfiles:true,
                    },
                },
            },
            
            // include:{
            //     doctorProfiles:{
            //         include:{
            //             availability:true,
            //         },
            //     },
            // },
        });

        const specialties = await prismaClient.specialty.findMany({
            where:{
              OR:[
                {title:{contains:query, mode:'insensitive'}},
                {slug:{contains:query, mode:'insensitive'}},
              ],
            },
        });

        const doctorProfiles = await prismaClient.doctorProfile.findMany({
            where:{
              OR:[
                {firstName:{contains:query, mode:'insensitive'}},
                {lastName:{contains:query, mode:'insensitive'}},
              ],
            },
            include:{
                availability:true,
            },
        });

        const doctors = doctorProfiles.map((doc)=>{
            return{
                id:doc.userId,
                name:`${doc.firstName} ${doc.lastName}`,
                email:doc.email??"",
                phone:doc.phone??"",
                slug:generateSlug(`${doc.firstName} ${doc.lastName}`),
                doctorProfile:doc,
            };
        });

        return {
            services,
            specialties,
            //doctorProfiles,
            doctors,
        };
    }
}