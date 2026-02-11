import React from "react";
import { cn } from "./utils";

function Textarea({ className, ...props }) {
    return (
        <textarea
            className={cn(
                "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600",
                className
            )}
            {...props}
        />
    );
}

export { Textarea };
