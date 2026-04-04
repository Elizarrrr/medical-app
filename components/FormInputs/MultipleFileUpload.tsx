import { UploadDropzone } from "../../utils/uploadthing";
import {File, Pencil, XCircle} from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

type MultipleImageInputProps = {
    label: string;
    files: FileProps[];
    setFiles: any;
    className?: string;
    endpoint?: any;
};

export type FileProps = {
    title: string;
    size: number;
    url: string;
}

export default function MultipleFileUpload({
    label,
    files,
    setFiles,
    className = "col-span-full",
    endpoint="",
}:  MultipleImageInputProps) {
    function handleImageRemove(fileIndex:any){
        const updatedFiles = files.filter(
            (file, index) => index !== fileIndex
        );
        setFiles(updatedFiles);
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
                {files && (
                    <button
                        onClick={() => setFiles([])}
                        type="button"
                        className="flex space-x-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 rounded-md shadow text-slate-50 dark:text-slate-900 py-2 px-4" // Added dark mode styles
                    >
                        <Pencil className="w-5 h-5"/>
                        <span>Change Files</span>
                    </button>
                )}
            </div>
            
            {files.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {files.map((file, i) => {
                        return(
                            <div key={i} className="relative mb-6">
                                <button
                                    type="button"
                                    onClick={() => handleImageRemove(i)}
                                    className="absolute -top-4 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1" // Fixed: Better visibility
                                >
                                    <XCircle className="w-5 h-5"/> {/* Added size */}
                                </button>
                                <div className="py-3 px-6 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center border border-slate-200">
                                    <File className="w-6 h-6 flex-shrink-0 mr-2"/>
                                    <div className="flex flex-col">
                                        <span className="line-clamp-1">{file.title}</span>
                                        {file.size>0 && <span className="text-sm">{(file.size/1000).toFixed(2)} KB</span>}
                                    </div>
                                </div>
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
                            const urls = res.map((item) => {
                                return{
                                    url: item.url,
                                    title: item.name,
                                    size: item.size,
                                }
                            });
                            setFiles(urls);
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