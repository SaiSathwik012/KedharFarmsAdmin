import * as React from "react";
import { cn } from "./utils";

function Textarea({ className, ...props }) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "resize-none border-input min-h-16 w-full rounded-md border px-3 py-2",
                className
            )}
            {...props}
        />
    );
}

export { Textarea };
