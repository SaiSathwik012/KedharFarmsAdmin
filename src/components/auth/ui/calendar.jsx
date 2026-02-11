"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row gap-2",
                month: "flex flex-col gap-4",
                caption: "flex justify-center items-center relative",
                caption_label: "text-sm font-medium",
                nav: "flex items-center gap-1",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell: "w-8 text-xs text-gray-500",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0",
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-8 w-8 p-0 font-normal"
                ),
                day_selected:
                    "bg-green-600 text-white hover:bg-green-600",
                day_today: "bg-green-100 text-green-700",
                day_disabled: "text-gray-400 opacity-50",
                ...classNames,
            }}
            components={{
                IconLeft: (props) => (
                    <ChevronLeft className="w-4 h-4" {...props} />
                ),
                IconRight: (props) => (
                    <ChevronRight className="w-4 h-4" {...props} />
                ),
            }}
            {...props}
        />
    );
}

export { Calendar };
