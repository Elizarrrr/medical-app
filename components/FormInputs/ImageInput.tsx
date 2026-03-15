import {Pencil} from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { UploadDropzone } from "../../utils/uploadthing";

// Define types for the props
type ImageInputProps = {
    label: string;
    imageUrl: string;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>; // Proper type for setter function
    className?: string;
    endpoint: string; // endpoint is likely a string
};

// export default function ImageInput({
//     label,
//     imageUrl="",
//     setImageUrl="",
//     className="col-span-full",
//     endpoint="",
// }:{ 
//     label:string;
//     imageUrl:string;
//     //imageUrl:any;                //CHANGED MYSELF
//     setImageUrl:any;
//     className?:string;
//     endpoint:any;
// }) {

export default function ImageInput({
    label,
    imageUrl = "",
    setImageUrl,
    className = "col-span-full",
    endpoint,
    }: ImageInputProps) {
    return(
        <div className={className}>
            <div className="flex justify-between items-center mb-4">
                <label
                htmlFor="course-image"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
                >
                    {label}
                </label>
                {imageUrl && (
                    <button
                    onClick={()=>setImageUrl("")}
                    type="button"
                    className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
                    >
                        <Pencil className="w-5 h-5"/>
                        <span>Change Image</span>
                    </button>
                )}
            </div>
            {imageUrl ? (
                <Image src={imageUrl} 
                    alt="Item image"
                    width={1000}
                    height={667}
                    className="w-full h-64 object-contain"
                />
            ) : (
                <UploadDropzone
                    // endpoint={`${endpoint}` as any}
                    endpoint={endpoint as "doctorProfileImage" | "serviceImage" | "doctorProfessionDocs"}
                    // onClientUploadComplete={(res:any)=>{

                    // onClientUploadComplete={(res: { url: string }[]) => {
                    //     setImageUrl(res[0].url);
                    //     //Do something with the response
                    //     toast.success("Image uploaded successfully");
                    //     console.log("Files", res);
                    //     console.log("Upload Completed");
                    // }}

                    onClientUploadComplete={(res) => {  // TypeScript will infer automatically
                        setImageUrl(res[0].url);
                        toast.success("Image uploaded successfully");
                    }}

                    // onUploadError={(error:any)=>{
                    onUploadError={(error: Error) => { // Type error as `Error`
                        toast.error("Failed to upload image");
                        //Do something with the error
                        console.log(`ERROR! ${error.message}`, error);
                    }}
                />
            )}
        </div>
    );
}

