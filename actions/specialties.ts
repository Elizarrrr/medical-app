"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { SpecialtyProps } from "@/components/Dashboard/SpecialtyForm";

export async function createSpecialty(data:SpecialtyProps){
    try {
      const existingSpecialty =  await prismaClient.specialty.findUnique({
        where:{
            slug:data.slug
        }
      });
      if(existingSpecialty){
        return {
            data:null,
            status:409,
            error:"Specialty already exists"
        };
      }

      const newSpecialty = await prismaClient.specialty.create({
        data,
      });

      revalidatePath("/dashboard/specialties");
      console.log(newSpecialty);

      return {
          data:newSpecialty,
          status:201,
          error:null,
      };

    } catch (error) {
        console.log(error);
        return{
            data:null,
            status:500,
            error,
        };
    }
}

export async function createManySpecialties(){
    try {
        const specialties=[
            {
                title:"Gastroenterology",
                //imageUrl:"https://utfs.io/f/4mL015KmC6OeUzj2TQxBnQY1oKvxUHIwzFc536ygduZTlhbV",
                slug:"gastroenterology",
            },
            {
                title:"Psychiatry",
                //imageUrl:"https://utfs.io/f/4mL015KmC6OeAEuPdM4fypN9onMWquOs3wgU5RaK1FxXihGb",
                slug:"psychiatry",
            },
            {
                title:"Urology",
                //imageUrl:"https://utfs.io/f/4mL015KmC6OeUbtPFcgxBnQY1oKvxUHIwzFc536ygduZTlhb",
                slug:"urology",
            },
            {
                title:"Cardiology",
                //imageUrl:"https://utfs.io/f/4mL015KmC6OeQLsGQogix4q6TtKVDscdAEy5eBYjbIU7O8zR",
                slug:"cardiology",
            },
            {
                title:"Pediatrics",
                //imageUrl:"https://utfs.io/f/4mL015KmC6OexRJ0NfM60KaAvxU9MpwiXljQP3cNt4SmrTYG",
                slug:"pediatrics",
            },
            {
                title:"Dermatology",
                //imageUrl:"https://utfs.io/f/4mL015KmC6OeHQQbVUU9VNczjTm8aLUPXO25GhqpgxAelywi",
                slug:"dermatology",
            },
            {
                title:"Dentistry",
                //imageUrl:"https://utfs.io/f/4mL015KmC6OeK2J7wvTpRvd8l2OCPiM4B5UX0zujITbSQrso",
                slug:"dentistry",
            }
        ];

       
        for (const specialty of specialties) {
            try {
                await createSpecialty(specialty)
                
            } catch (error) {
                console.error(`Error creating specialty "${specialty.title}":`, error)
            }
        }

    } catch (error) {
        console.log(error)
        return{
            data:null,
            status:500,
            error,
        }
    }
}

export async function getSpecialties(){
    try {
      const specialties = await prismaClient.specialty.findMany({
        orderBy:{
            createdAt:"desc"
        },
      });

      return {
          data:specialties,
          status:200,
          error:null,
      };

    } catch (error) {
        console.log(error);
        return{
            data:null,
            status:500,
            error,
        };
    }
}

export async function deleteSpecialty(id:string){
    try {
      await prismaClient.specialty.delete({
        where:{
            id
        },
      });

      revalidatePath("/dashboard/specialties")

      return {
          ok:true,
          status:200,
          error:null,
      };

    } catch (error) {
        console.log(error);
        return{
            data:null,
            status:500,
            error,
        };
    }
}

export async function updateSpecialty(id:string, data:SpecialtyProps){
    try {
      const existingSpecialty =  await prismaClient.specialty.findUnique({
        where:{
            id,
        },
      });
      if(!existingSpecialty){
        return {
            data:null,
            status:404,
            error:"Specialty with that id does not exist"
        };
      }

      const updatedSpecialty = await prismaClient.specialty.update({
        where:{
            id
        },data,
      });

      revalidatePath("/dashboard/specialties");
      console.log(updatedSpecialty);

      return {
          data:updatedSpecialty,
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

export async function getSpecialtyBySlug(slug:string){
    try {
        if(slug){
            const specialty = await prismaClient.specialty.findUnique({
                where:{
                    slug
                },
              });

        
              return {
                  data:specialty,
                  status:200,
                  error:null
              };
        }

    } catch (error) {
        console.log(error)
        return{
            data:null,
            status:500,
            error,
        }
    }
}