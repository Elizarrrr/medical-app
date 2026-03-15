"use server";

import { prismaClient } from "@/lib/db";
import { Resend } from "resend";
import WelcomeEmail from "@/components/Emails/welcome-email";
// import { BioDataFormProps, RegisterInputProps } from "../types/types";
// import bcrypt from "bcrypt";
// import { DoctorProfile } from "@prisma/client";

export async function createDoctorProfile(formData:any) {
    //const resend = new Resend(process.env.RESEND_API_KEY); //pass in your API key
    const{
        dob,
        firstName,
        gender,
        lastName,
        page,
        trackingNumber,
        userId,
    }=formData;


    try{

        const newProfile = await prismaClient.doctorProfile.create({
        data: {
            dob,
            firstName,
            gender,
            lastName,
            page,
            trackingNumber,
            userId,
        },
        });

        console.log(newProfile);

        //return newProfile;

        return {
            data: newProfile,
            error: null,
            status: 201,
        };


    }catch(error){
        console.log(error);
        // return {
        //     error:"Something went wrong",
        // };
        return {
            data: null,
            error: "Something went wrong",
            status: 500,
        };
    } 
}

export async function updateDoctorProfile(id:string|undefined,data:any){
    if(id){
        try{
            const updatedProfile = await prismaClient.doctorProfile.update({
                where:{
                    id,
                },
                data,
            });

            console.log(updatedProfile);

            return {
                data: updatedProfile,
                error: null,
                status: 201,
            };

        }catch(error){
            console.log(error)
            return {
                data: null,
                error: "Profile was not updated",
                status: 500,
            };
        }
    }
}

export async function getDoctorProfileById(userId:string|undefined){
    if(userId){
        try{
            const profile = await prismaClient.doctorProfile.findUnique({
                where:{
                    userId,
                },
                include:{
                    availability:true,
                },
            });

            console.log(profile);

            return {
                data: profile,
                error: null,
                status: 200,
            };

        }catch(error){
            console.log(error)
            return {
                data: null,
                error: "Profile was not fetched",
                status: 500,
            };
        }
    }
}

export async function createAvailability(data:any) {
  
    try{

        const newAvail = await prismaClient.availability.create({data});

        console.log(newAvail);

        return newAvail;

        }catch(error){
            console.log(error);
            return {
                data: null,
                error: "Something went wrong",
                status: 500,
            };
        } 
}

export async function updateAvailabilityById(id:string|undefined,data:any){
    if(id){
        try{
            const updatedAva= await prismaClient.availability.update({
                where:{
                    id,
                },
                data,
            });

            console.log(updatedAva);

            return {
                data: updatedAva,
                error: null,
                status: 201,
            };

        }catch(error){
            console.log(error)
            return {
                data: null,
                error: "Availability was not updated",
                status: 500,
            };
        }
    }
}

export async function getApplicationByTrack(trackingNumber:string){
    if(trackingNumber){

        try{

            const existingProfile = await prismaClient.doctorProfile.findUnique({
                where:{
                    trackingNumber,
                },
            });

            if (!existingProfile){
                return {
                    data: null,
                    error: "Wrong Tracking Number",
                    status: 404,
                };
            }
        
            return {
                data: existingProfile,
                error: null,
                status: 200,
            };

        }catch(error){
            console.log(error);
            return {
                data: null,
                error: "Something went wrong",
                status: 500,
            };
        }
    }
}

export async function completeProfile(id:string|undefined,data:any){
    const resend = new Resend(process.env.RESEND_API_KEY);
    if(id){
        try{
            const existingProfile = await prismaClient.doctorProfile.findUnique({
                where:{
                    id,
                },
            });

            if(!existingProfile){
                return {
                    data:null,
                    status:404,
                    error:"Profile Not Found",
                };
            }

            //send a welcome email
            const firstName = existingProfile.firstName;
            const email = existingProfile.email as string;
            const previewText = "Welcome to Online Doctors";
            const message = "Thank you for joining Online Doctors!";
            const sendMail = await resend.emails.send({
                from: "Medical App <info@jazzafricaadventures.com>", //should be from the website used to verify your API key
                to: email,
                subject: "Welcome to Online Doctors",
                react: WelcomeEmail({ firstName, previewText, message }),
            });

            const updatedProfile = await prismaClient.doctorProfile.update({
                where:{
                    id,
                },
                data,
            });

            console.log(updatedProfile);

            return {
                data: updatedProfile,
                error: null,
                status: 201,
            };

        }catch(error){
            console.log(error)
            return {
                data: null,
                error: "Profile was not updated", //not sure
                status: 500,
            };
        }
    }
}