import React from 'react'
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';

type SubmitButtonProps ={
    title:string; 
    buttonType?:"submit" | "reset" | "button" | undefined 
    isLoading:boolean;
    loadingTitle:string;
}

export default function SubmitButton({title, buttonType="submit", isLoading=false, loadingTitle}:SubmitButtonProps) {
  return (
    <>
        {isLoading?(
            <Button disabled className="bg-black text-white hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100">
            <Loader className="animate-spin" />
            {loadingTitle}
            </Button>
        ):(   
            <Button type={buttonType} className="bg-black text-white hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100">{title}</Button>
        )}
    </>
  )
}
