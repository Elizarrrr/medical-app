"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { deleteService } from "../../actions/services";
import toast from "react-hot-toast";
import { Service } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ServiceCard({service}:{service:Service}) {
    async function handleDelete(id:string){
        await deleteService(id)
        toast.success("Service deleted successfully")
    }

    return(
        <div className="border mb-2 shadow-sm text-xs bg-white py-3 px-2 w-full rounded-md flex items-center gap-4 justify-between dark:bg-black">   
            <Image src={service.imageUrl} width={512} height={512} alt={service.title} className="w-14 h-auto"/>
            <h2>{service.title}</h2>
            

            <div className="flex gap-2">
                <Link className="text-blue-600" href={`/dashboard/services/update/${service.slug}`}>
                <Pencil className="w-4 h-4"/>
                </Link>

                {/* <DeletePopup title="service" id={service.id} handleDelete={()=>handleDelete(service.id)}/> */}

                {/* <button onClick={()=>handleDelete(service.id)} className="text-red-600">
                    <Trash className="w-4 h-4"/>
                </button> */}

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        {/* <Button onClick={handleDelete} variant="outline">Show Dialog</Button> */}
                        <button className="text-red-600">
                            <Trash className="w-4 h-4"/>
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle className="">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            Service.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>handleDelete(service.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}