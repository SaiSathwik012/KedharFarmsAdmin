"use client";

import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "./utils";

function Progress({ className, value = 0, ...props }) {
    return (
        <ProgressPrimitive.Root
            className={cn("h-2 w-full rounded-full bg-gray-200 overflow-hidden", className)}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className="h-full bg-green-600 transition-all"
                style={{ width: `${value}%` }}
            />
        </ProgressPrimitive.Root>
    );
}

export { Progress };
