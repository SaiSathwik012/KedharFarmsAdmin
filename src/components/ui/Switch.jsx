"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "./utils";

function Switch({ className, ...props }) {
    return (
        <SwitchPrimitive.Root
            data-slot="switch"
            className={cn(
                "inline-flex h-5 w-8 items-center rounded-full transition-all",
                className
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className="bg-card block size-4 rounded-full transition-transform"
            />
        </SwitchPrimitive.Root>
    );
}

export { Switch };
