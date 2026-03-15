import { cn } from "@/lib/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerInputProps = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  className?: string;
  title: string;
};

export function DatePickerInput({
  date,
  setDate,
  className = "col-span-full",
  title,
}: DatePickerInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <h2 className="text-normal font-normal">{title}</h2>

      <DatePicker
        className="z-50 rounded-md border border-slate-500 py-1.5"
        selected={date ?? null}
        onChange={(value: Date | null) => {
          if (value) {
            setDate(value);
          } else {
            setDate(undefined);
          }
        }}
      />
    </div>
  );
}