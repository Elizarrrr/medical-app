"use client";

import * as React from "react"
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils"
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar"; // import DatePicker from 'react-date-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerInputProps={
    date:Date|undefined;
    setDate:any;
    className?:string;
    title:string;
};

import { useState } from 'react';
import DatePicker from 'react-date-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export function DatePickerInput({
  date,
  setDate,
  className = "col-span-full",
  title,
}: DatePickerInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
        <h2 className="text-normal font-normal mb-2">{title}</h2>
        <DatePicker 
          className="z-50 rounded-md border border-slate-300 ring-0 py-1.5 px-3" 
          onChange={setDate} 
          value={date}
          // calendarIcon={Calendar}
        />
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover> */}
    </div>
  );
}


// "use client"
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


// "use client"
// import { cn } from "@/lib/utils";
// import * as React from "react"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { format } from "date-fns"
// import { ChevronDownIcon } from "lucide-react"

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
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             data-empty={!date}
//             className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
//           >
//             {date ? format(date, "PPP") : <span>Pick a date</span>}
//             <ChevronDownIcon />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={setDate}
//             defaultMonth={date}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }


