"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AppointmentProps } from "@/types/types";
import { Resend } from "resend";
import NewAppointmentEmail from "@/components/Emails/new-appointment";
import { Appointment } from "@prisma/client";
import { AppointmentUpdateProps } from "@/components/Dashboard/Doctor/AvailabilityDays/UpdateAppointmentForm";

const resend = new Resend(process.env.RESEND_API_KEY); //pass in your API key
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createAppointment(data:AppointmentProps){
    
    try {
        // Get doctor details for email notification
        const doctor = await prismaClient.user.findUnique({
            where:{
                id:data.doctorId,
            },
        });
        
        // Create the appointment in the database
        const newAppointment = await prismaClient.appointment.create({
            data,
        });

        const firstName = doctor?.name;
        const  doctorMail = doctor?.email;
        const link = `${baseUrl}/dashboard/doctor/appointments/view/${newAppointment.id}`;
        const message =
        "You have a new appointment scheduled. Please review and approve it by clicking the button below";
        
        // TRY to send email (but don't fail if email fails)
        try {
            const sendMail = await resend.emails.send({
                from: "Medical App <info@jazzafricaadventures.com>",
                to: doctorMail??"",
                subject: "New Appointment Approval Needed",
                react: NewAppointmentEmail({ firstName, link, message }),
            });
            console.log("Email sent successfully:", sendMail);
        } catch (emailError) {
            // Email failed but appointment is still created
            console.warn("Failed to send email, but appointment was created:", emailError);
        }

        revalidatePath("/dashboard/doctor/appointments");
        console.log(newAppointment);

        return {
            data:newAppointment,
            status:201,
            error:null
        };

    } catch (error) {
        console.log(error)
        return{
            data:null,
            status:500,
            error,
        }
    }
}

export async function getAppointments(){
    try {
      const appointments = await prismaClient.appointment.findMany({
        orderBy:{
            createdAt:"desc"
        },
      });

      return {
          data:appointments,
          status:200,
          error:null
      };

    } catch (error) {
        console.log(error)
        return{
            data:null,
            status:500,
            error,
        }
    }
}

export async function getPatientAppointments(patientId:string){
    try {
      const appointments = await prismaClient.appointment.findMany({
        orderBy:{
            createdAt:"desc"
        },
        where:{
            patientId
        }
      });

      return {
          data:appointments,
          status:200,
          error:null
      };

    } catch (error) {
        console.log(error)
        return{
            data:null,
            status:500,
            error,
        }
    }
}

export async function getAppointmentByPatientId(patientId:string|undefined){
    if(patientId){
        try {
            const appointment = await prismaClient.appointment.findFirst({
              where:{
                  patientId
              },
            });
      
            if(!appointment){
              return null;
            }
      
            return appointment as Appointment;
      
          } catch (error) {
              console.log(error);
              return{
                  data:null,
                  status:500,
                  error,
              };
          }
    }
}

export async function getDoctorAppointments(doctorId:string){
    try {
      const appointments = await prismaClient.appointment.findMany({
        orderBy:{
            createdAt:"desc"
        },
        where:{
            doctorId,
        }
      });

      return {
          data:appointments,
          status:200,
          error:null
      };

    } catch (error) {
        console.log(error)
        return{
            data:null,
            status:500,
            error,
        }
    }
}

export async function deleteAppointment(id:string){
    try {
      await prismaClient.appointment.delete({
        where:{
            id
        },
      });

      revalidatePath("/dashboard/doctor/appointments");

      return {
          ok:true,
          status:200,
          error:null
      };

    } catch (error) {
        console.log(error)
        return{
            data:null,
            status:500,
            error,
        }
    }
}

export async function getAppointmentById(id:string){
    try {
        if(id){
            const appointment = await prismaClient.appointment.findUnique({
                where:{
                    id,
                },
              });
        
            //   return {
            //       data:appointment,
            //       status:200,
            //       error:null
            //   };

            return appointment;
        }

    } catch (error) {
        console.log(error)
        // return{
        //     data:null,
        //     status:500,
        //     error,
        // };
    }
}

export async function updateAppointment(id:string, data:AppointmentProps){
    try {
      const updatedAppointment = await prismaClient.appointment.update({
        where:{
            id
        },data,
      });

      revalidatePath("/dashboard/doctor/appointments");
      console.log(updatedAppointment);

      return {
          data:updatedAppointment,
          status:201,
          error:null
      };

    } catch (error) {
        console.log(error)
        return{
            data:null,
            status:500,
            error,
        }
    }
}

export async function updateAppointmentById(id:string, patientId:string, data:AppointmentUpdateProps){
    try {
      // Update the appointment in the database
      const updatedAppointment = await prismaClient.appointment.update({
        where:{
            id,
        },
        data,
      });

      // Get patient details for email notification
      const patientId = updatedAppointment.patientId;
      const patient = await prismaClient.user.findUnique({
        where:{
            id:patientId,
        },
      })
      const firstName = patient?.name;
      const  doctorMail = patient?.email;
      const link = `${baseUrl}/dashboard/user/appointments/view/${updatedAppointment.id}`;
      const message =
      "Your appointment has been approved. Click the button below to view the details";
      
      // TRY to send email (but don't fail if email fails)
      try {
        const sendMail = await resend.emails.send({
          from: "Medical App <info@jazzafricaadventures.com>",
          to: doctorMail??"",
          subject: "Appointment Approved",
          react: NewAppointmentEmail({ firstName, link, message }),
        });
        console.log("Email sent successfully:", sendMail);
      } catch (emailError) {
        // Email failed but appointment is still updated
        console.warn("Failed to send email, but appointment was updated:", emailError);
      }

      revalidatePath("/dashboard/doctor/appointments");
      revalidatePath("/dashboard/user/appointments");
      console.log(updatedAppointment);

      return {
          data:updatedAppointment,
          status:201,
          error:null
      };

    } catch (error) {
        console.log(error)
        return{
            data:null,
            status:500,
            error,
        }
    }
}