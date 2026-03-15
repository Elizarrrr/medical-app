import React from "react";
import { FieldValues, Path, UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type TextAreaInputProps<T extends FieldValues = FieldValues> = {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  className?: string;
};

export function TextAreaInput<T extends FieldValues = FieldValues>({
  label,
  register,
  name,
  errors,
  placeholder,
  className = "col-span-full"
}: TextAreaInputProps<T>) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        {...register(name as Path<T>, { required: true })}
        id={name}
        placeholder={placeholder || ""}
      />
      {errors[name] && (
        <span className="text-red-600 text-sm">
          {(errors[name] as { message?: string })?.message || `${label} is required`}
        </span>
      )}
    </div>
  );
}