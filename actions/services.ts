"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ServiceProps } from "@/types/types";

// export async function createService(data:ServiceProps){
//     try {
//       const existingService =  await prismaClient.service.findUnique({
//         where:{
//             slug:data.slug
//         }
//       });
//       if(existingService){
//         return {
//             data:null,
//             status:409,
//             error:"Service already exists"
//         };
//       }

//       const newService = await prismaClient.service.create({
//         data,
//       });

//       revalidatePath("/dashboard/services");
//       console.log(newService);

//       return {
//           data:newService,
//           status:201,
//           error:null
//       };

//     } catch (error) {
//         console.log(error)
//         return{
//             data:null,
//             status:500,
//             error,
//         }
//     }
// }

// export async function createManyServices(){
//     try {
//         const services=[
//             {
//                 title:"In-person doctor visit",
//                 imageUrl:"https://utfs.io/f/4mL015KmC6OeUzj2TQxBnQY1oKvxUHIwzFc536ygduZTlhbV",
//                 slug:"in-person-doctor-visit",
//             },
//             {
//                 title:"Psychiatric consultation",
//                 imageUrl:"https://utfs.io/f/4mL015KmC6OeAEuPdM4fypN9onMWquOs3wgU5RaK1FxXihGb",
//                 slug:"psychiatric-consultation",
//             },
//             {
//                 title:"Nutritional counseling",
//                 imageUrl:"https://utfs.io/f/4mL015KmC6OeUbtPFcgxBnQY1oKvxUHIwzFc536ygduZTlhb",
//                 slug:"nutritional-counseling",
//             },
//             {
//                 title:"Telehealth consultation",
//                 imageUrl:"https://utfs.io/f/4mL015KmC6OeQLsGQogix4q6TtKVDscdAEy5eBYjbIU7O8zR",
//                 slug:"telehealth-consultation",
//             },
//             {
//                 title:"Pediatric checkups",
//                 imageUrl:"https://utfs.io/f/4mL015KmC6OexRJ0NfM60KaAvxU9MpwiXljQP3cNt4SmrTYG",
//                 slug:"pediatric-checkups",
//             },
//             {
//                 title:"Dermatology",
//                 imageUrl:"https://utfs.io/f/4mL015KmC6OeHQQbVUU9VNczjTm8aLUPXO25GhqpgxAelywi",
//                 slug:"dermatology",
//             },
//             {
//                 title:"UTI consultation",
//                 imageUrl:"https://utfs.io/f/4mL015KmC6OeK2J7wvTpRvd8l2OCPiM4B5UX0zujITbSQrso",
//                 slug:"uti-consultation",
//             }
//         ];

       
//         for (const service of services) {
//             try {
//                 await createService(service)
//                 // //Create service in the database
//                 // await prisma.service.create({
//                 //     data:{
//                 //         title:service.title,
//                 //         slug:service.slug,
//                 //         imageUrl:service.imageUrl,
//                 //     },
//                 // });
//                 // console.log(`Service "${service.title}" created successfully.`);
//             } catch (error) {
//                 console.error(`Error creating service "${service.title}":`, error)
//             }
//         }

//     } catch (error) {
//         console.log(error)
//         return{
//             data:null,
//             status:500,
//             error,
//         }
//     }
// }

export interface ServiceWithDoctorProfilesCount {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    _count: {
      doctorProfiles: number; // Represents the count of doctorProfiles
    };
}

export async function getServices(){
    try {
        const services = await prismaClient.service.findMany({
            orderBy:{
                createdAt:"desc",
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
                createdAt:true,
                updatedAt:true
            },
        });

        return {
            data:services,
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

export async function deleteService(id:string){
    try {
      await prismaClient.service.delete({
        where:{
            id
        },
      });

      revalidatePath("/dashboard/services")

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

export async function getServiceBySlug(slug:string){
    try {
        if(slug){
            const service = await prismaClient.service.findUnique({
                where:{
                    slug
                },
              });

            //return service;
        
              return {
                  data:service,
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

export async function updateService(id:string, data:ServiceProps){
    try {
      const existingService =  await prismaClient.service.findUnique({
        where:{
            id,
        },
      });
      if(!existingService){
        return {
            data:null,
            status:404,
            error:"Service with that id does not exist"
        };
      }

      const updatedService = await prismaClient.service.update({
        where:{
            id
        },data,
      });

      revalidatePath("/dashboard/services");
      console.log(updatedService);

      return {
          data:updatedService,
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

export async function updateDoctorProfileWithService(id:string|undefined,data:any){
    if(id){
        try{
            const updatedProfile = await prismaClient.doctorProfile.update({
                where:{
                    id,
                },
                data,
            });

            console.log(updatedProfile);
            revalidatePath("/dashboard/doctor/settings");

            return {
                data: updatedProfile,
                error: null,
                status: 201,
            };

        }catch(error){
            console.log(error);
            return {
                data: null,
                error: "Profile was not updated",
                status: 500,
            };
        }
    }
}
