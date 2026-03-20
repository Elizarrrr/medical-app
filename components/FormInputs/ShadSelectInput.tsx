import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// type SelectInputProps={
//     label:string; 
//     optionTitle:string; 
//     className?:string; 
//     options: SelectOption[];
//     selectedOption:any;
//     setSelectedOption:any;
// };
type SelectInputProps = {
  label: string;
  optionTitle: string;
  className?: string;
  options: SelectOption[];
  selectedOption: SelectOption | null;
  setSelectedOption: (value: SelectOption | undefined) => void;
};
export type SelectOption = {
    value:string;
    label:string;
};
export default function ShadSelectInput({
    label,
    className="sm:col-span-2",
    optionTitle,
    options=[],
    selectedOption,
    setSelectedOption,
}:SelectInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        {label}
      </label>

        <Select
            onValueChange={(value) =>
            setSelectedOption(options.find((option) => option.value === value))
            }
        >
            <SelectTrigger className="w-full">
            <SelectValue
                placeholder={selectedOption?.label || `Select ${optionTitle}`}
            />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                <SelectLabel>{optionTitle}</SelectLabel>
                {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
                ))}
            </SelectGroup>
            </SelectContent>
        </Select>

    </div>
  )
}

{/* <SelectTrigger className="w-[180px]"></SelectTrigger> */}