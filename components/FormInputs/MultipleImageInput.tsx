import { UploadDropzone } from "../../utils/uploadthing";
import {Pencil, XCircle} from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

type MultipleImageInputProps = {
    label: string;
    imageUrls: string[];
    setImageUrls: any;
    className?: string;
    endpoint?: any;
};

export default function MultipleImageInput({
    label,
    imageUrls,
    setImageUrls,
    className = "col-span-full",
    endpoint="",
}:  MultipleImageInputProps) {
    function handleImageRemove(imageIndex:any){
        const updatedImages = imageUrls.filter(
            (image, index) => index !== imageIndex
        );
        setImageUrls(updatedImages);
    }
    
    return(
        <div className={className}>
            <div className="flex justify-between items-center mb-4">
                <label
                    htmlFor="course-image"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
                >
                    {label}
                </label>
                {imageUrls && (
                    <button
                        onClick={() => setImageUrls("")}
                        type="button"
                        className="flex space-x-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 rounded-md shadow text-slate-50 dark:text-slate-900 py-2 px-4" // Added dark mode styles
                    >
                        <Pencil className="w-5 h-5"/>
                        <span>Change Images</span>
                    </button>
                )}
            </div>
            
            {imageUrls.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imageUrls.map((imageUrl, i) => {
                        return(
                            <div key={i} className="relative mb-6">
                                <button
                                    onClick={() => handleImageRemove(i)}
                                    className="absolute -top-4 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1" // Fixed: Better visibility
                                >
                                    <XCircle className="w-5 h-5"/> {/* Added size */}
                                </button>
                                <Image 
                                    src={imageUrl} 
                                    alt="Item image"
                                    width={1000}
                                    height={667}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            </div>
                        );
                    })}
                </div>  
            ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-800"> {/* Added wrapper with dark mode */}
                    <UploadDropzone
                        endpoint={endpoint}
                        onClientUploadComplete={(res) => {
                            console.log(res);
                            const urls = res.map((item) => item.url);
                            setImageUrls(urls);
                            toast.success("Upload completed!");
                            console.log("Upload Completed");
                        }}
                        onUploadError={(error) => {
                            toast.error("Failed to upload image");
                            console.log(`ERROR! ${error.message}`, error);
                        }}
                        appearance={{
                            button: "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600",
                            label: "text-gray-900 dark:text-white",
                            allowedContent: "text-gray-600 dark:text-gray-300",
                        }}
                    />
                </div>
            )}
        </div>
    );
}