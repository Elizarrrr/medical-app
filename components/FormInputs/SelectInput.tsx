import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type SelectInputProps<T extends FieldValues = FieldValues> = {
  label: string;
  register?: UseFormRegister<T>;
  name: string;
  className?: string;
  options?: SelectOption[];
  multiple?: boolean;
};

export type SelectOption = {
    value:string;
    label:string;
};

export default function SelectInput<T extends FieldValues = FieldValues>({
  label,
  name,
  register,
  className = "sm:col-span-2",
  options = [],
  multiple = false,
}: SelectInputProps<T>) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium leading-6">
        {label}
      </label>
      <div className="mt-2">
        <select
          {...(register ? register(name as Path<T>) : {})}
          id={name}
          multiple={multiple}
          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm"
        >
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}