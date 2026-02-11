"use client";

import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "./utils";

function Checkbox({ className, ...props }) {
    return (
        <CheckboxPrimitive.Root
            className={cn(
                "peer h-4 w-4 shrink-0 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white",
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center">
                <Check className="h-3 w-3" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
