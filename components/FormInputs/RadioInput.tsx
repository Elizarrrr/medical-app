import React from "react";
import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

type RadioInputProps<T extends FieldValues = FieldValues> = {
  className?: string;
  name: string;
  register: UseFormRegister<T>;
  title: string;
  errors: FieldErrors<T>;
  radioOptions: RadioOption[];
};

export type RadioOption = {
    label:string;
    value:string;
}

export default function RadioInput<T extends FieldValues = FieldValues>({
  className = "col-span-full",
  name,
  register,
  title,
  errors,
  radioOptions
}: RadioInputProps<T>) {
  return (
    <div className={cn("grid gap-2", className)}>
      <h3 className="font-normal text-gray-900 dark:text-white">{title}</h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-black dark:border-gray-600 dark:text-white">
        {radioOptions.map((item, i) => (
          <li key={i} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                {...register(name as Path<T>, { required: true })}
                id={item.value}
                type="radio"
                value={item.value}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label htmlFor={item.value} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {item.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
      {errors[name] && <span className="text-red-600 text-sm">{title} is required</span>}
    </div>
  );
}