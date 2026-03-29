import {Pencil} from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { UploadDropzone } from "../../utils/uploadthing";

type ImageInputProps = {
    label: string;
    imageUrl: string;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
    endpoint: string;
};

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
                        onClick={() => setImageUrl("")}
                        type="button"
                        className="flex space-x-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 rounded-md shadow text-slate-50 dark:text-slate-900 py-2 px-4" // Added dark mode styles
                    >
                        <Pencil className="w-5 h-5"/>
                        <span>Change Image</span>
                    </button>
                )}
            </div>
            {imageUrl ? (
                <Image 
                    src={imageUrl} 
                    alt="Item image"
                    width={1000}
                    height={667}
                    className="w-full h-64 object-contain rounded-md" // ✅ Added rounded-md
                />
            ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-800"> {/* Added wrapper with dark mode */}
                    <UploadDropzone
                        endpoint={endpoint as "doctorProfileImage" | "serviceImage" | "doctorProfessionDocs"}
                        onClientUploadComplete={(res) => {
                            setImageUrl(res[0].url);
                            toast.success("Image uploaded successfully");
                        }}
                        onUploadError={(error: Error) => {
                            toast.error("Failed to upload image");
                            console.log(`ERROR! ${error.message}`, error);
                        }}
                        appearance={{ // Added appearance customization
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