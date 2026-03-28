import * as React from "react";
import Select, { MultiValue } from 'react-select';
// import { MultiSelect } from "react-multi-select-component";

type SelectInputProps = {
  label: string;
  optionTitle: string;
  className?: string;
  options: SelectOption[];
  // selectedOption:any;
  // setSelectedOption:any;
  selectedOption: SelectOption[]; // Fix #1
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectOption[]>>; // Fix #2
};

export type SelectOption = {
    value:string;
    label:string;
};
export default function CustomMultiSelect({
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

      {/* <MultiSelect
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        labelledBy={optionTitle}
      /> */}

      <Select
        isMulti
        options={options}
        value={selectedOption}
        onChange={(newValue: MultiValue<SelectOption>) => {
          setSelectedOption(newValue as SelectOption[]);
        }}
      />

    </div>
  )
}

{/* <SelectTrigger className="w-[180px]"></SelectTrigger> */}