"use server";

import { prismaClient } from "@/lib/db";
import { DoctorDetail, RegisterInputProps } from "../types/types";
import bcrypt from "bcrypt";
import {Resend} from "resend";
import EmailTemplate from "../components/Emails/email-template";
import generateSlug from "@/utils/generateSlug";

export async function createUser(formData:RegisterInputProps) {
    const{fullName,email,phone,role,password,plan}=formData;
    const resend = new Resend(process.env.RESEND_API_KEY);

    try{
        // Check if user already exists
        const existingUser = await prismaClient.user.findUnique({
            where: {
              email,
            },
          });

          if (existingUser) {
            return {
              data: null,
              error: `User with this email ( ${email})  already exists in the Database`,
              status: 409,
            };
          }

        // Encrypt the Password =>bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //Generate Token
        const generateToken = () => {
        const min = 100000; // Minimum 6-figure number
        const max = 999999; // Maximum 6-figure number
        return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const userToken = generateToken();
        
        // Create the user in database
        const newUser = await prismaClient.user.create({
        data: {
            name: fullName,
            slug: generateSlug(fullName),
            email,
            phone,
            password: hashedPassword,
            role,
            plan,
            token: userToken,
        },
        });

        // TRY to send verification email (but don't fail registration if email fails)
        try {
            const token = newUser.token;
            const firstName = newUser.name.split(" ")[0];
            const linkText = "Verify your Account ";
            const message =
            "Thank you for registering with Oasis Hospital. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
            
            const sendMail = await resend.emails.send({
                from: "Oasis Hospital <info@jazzafricaadventures.com>", // Changed to working test domain
                to: email,
                subject: "Verify Your Email Address",
                react: EmailTemplate({ firstName, token, linkText, message }),
            });
            
            console.log("Email sent successfully:", sendMail);
            console.log("Verification token:", token);
        } catch (emailError) {
            // Email failed but that's okay - user is still created
            console.warn("Failed to send email, but user was created:", emailError);
            console.log("User can verify later. Token:", newUser.token);
        }

        console.log("New user created:", newUser);

        // Return success response
        return {
            data: newUser,
            error: null,
            status: 200,
        };

    }catch(error){
        // Something went wrong with user creation
        console.log("Error creating user:", error);
        return {
            data: null,           // Added: Always return data field
            error:"Something went wrong",
            status: 500,          // Added: Always return status field
        };
    } 
}

export async function getUserById(id:string){
    if(id){
        try{
            const user = await prismaClient.user.findUnique({
                where:{
                    id
                },
            });
        
        return user

        }catch(error){
            console.log(error);
        }
    }
}

export async function updateUserById(id:string){
    if(id){
        try{
            const updatedUser = await prismaClient.user.update({
                where:{
                    id,
                },
                data:{
                    isVerfied:true,
                },
            });

            return updatedUser;

        }catch(error){
            console.log(error)
        }
    }
}