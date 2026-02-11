"use client";

import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "./utils";

function Label({ className, ...props }) {
    return (
        <LabelPrimitive.Root
            className={cn(
                "flex items-center gap-2 text-sm font-medium select-none",
                className
            )}
            {...props}
        />
    );
}

export { Label };
