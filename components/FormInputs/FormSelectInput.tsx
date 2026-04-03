"use client";
import React from "react";
import Select, { SingleValue } from "react-select";

export type Option = {
  label: string;
  value: string;
};

export type Options = Option[];

type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option | null;
  setOption: React.Dispatch<React.SetStateAction<Option | null>>;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
};

export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  labelShown = true,
}: FormSelectInputProps) {
  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900 dark:text-white">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2">
        <Select
          value={option}
          // onChange={(selectedOption) => setOption(selectedOption)}
          onChange={(selectedOption: SingleValue<Option>) =>
            setOption(selectedOption)
          }
          options={options}
          placeholder={`Select ${label}`}
          className="w-full" // ✅ Make it full width
          classNamePrefix="select" // ✅ Add prefix for styling
          // ✅ Add dark mode styles
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: 'var(--background)',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: 'var(--background)',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? 'hsl(var(--accent))' : 'var(--background)',
              color: 'hsl(var(--foreground))',
            }),
            singleValue: (base) => ({
              ...base,
              color: 'hsl(var(--foreground))',
            }),
          }}
        />
      </div>
    </div>
  );
}