// import { cn } from "@/lib/utils";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// type DatePickerInputProps = {
//   date: Date | undefined;
//   setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
//   className?: string;
//   title: string;
// };

// export function DatePickerInput({
//   date,
//   setDate,
//   className = "col-span-full",
//   title,
// }: DatePickerInputProps) {
//   return (
//     <div className={cn("grid gap-2", className)}>
//       <h2 className="text-normal font-normal">{title}</h2>

//       <DatePicker
//         className="z-50 rounded-md border border-slate-500 py-1.5"
//         selected={date ?? null}
//         onChange={(value: Date | null) => {
//           if (value) {
//             setDate(value);
//           } else {
//             setDate(undefined);
//           }
//         }}
//       />
//     </div>
//   );
// }

"use client"

import { cn } from "@/lib/utils";
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
