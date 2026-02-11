import React from "react";
import { cn } from "./utils";

function Input({ className, type, ...props }) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "border-input flex h-9 w-full rounded-md border px-3 py-1 text-sm outline-none",
                className
            )}
            {...props}
        />
    );
}

export { Input };
