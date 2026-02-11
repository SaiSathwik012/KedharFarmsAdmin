"use client";

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "./utils";

function Tooltip({ children, ...props }) {
    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root {...props}>
                {children}
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}

function TooltipTrigger(props) {
    return <TooltipPrimitive.Trigger {...props} />;
}

function TooltipContent({ className, ...props }) {
    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                className={cn(
                    "z-50 rounded-md bg-green-600 px-3 py-1.5 text-xs text-white",
                    className
                )}
                {...props}
            />
        </TooltipPrimitive.Portal>
    );
}

export { Tooltip, TooltipTrigger, TooltipContent };
