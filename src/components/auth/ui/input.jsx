import React from "react";
import { cn } from "./utils";

function Input({ className, type = "text", ...props }) {
    return (
        <input
            type={type}
            className={cn(
                "h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-600",
                className
            )}
            {...props}
        />
    );
}

export { Input };
