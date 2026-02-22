import React from "react";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FieldValues, Path, UseFormRegister, FieldErrors } from "react-hook-form";


type TextInputProps<T extends FieldValues = FieldValues> = {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  type?: string;
  page?: string;
  placeholder?: string;
  className?: string;
};

export default function TextInput<T extends FieldValues = FieldValues>({
  label,
  register,
  name,
  errors,
  type = "text",
  page,
  placeholder,
  className = "col-span-full"
}: TextInputProps<T>) {
  return (
    <div className={cn("grid gap-2", className)}>
      {type === "password" && page === "login" ? (
        <div className="flex items-center">
          <Label htmlFor={name}>{label}</Label>
          <Link href="/forgot-password" className="ml-auto inline-block text-sm font-semibold text-green-600 hover:text-green-500">
            Forgot your password?
          </Link>
        </div>
      ) : (
        <Label htmlFor={name}>{label}</Label>
      )}

      <Input
        {...register(name as Path<T>, { required: true })}
        id={name}
        type={type}
        autoComplete="name"
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