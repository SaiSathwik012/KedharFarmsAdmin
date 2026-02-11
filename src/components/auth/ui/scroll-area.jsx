"use client";

import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "./utils";

function ScrollArea({ className, children, ...props }) {
    return (
        <ScrollAreaPrimitive.Root
            className={cn("relative overflow-hidden", className)}
            {...props}
        >
            <ScrollAreaPrimitive.Viewport className="h-full w-full">
                {children}
            </ScrollAreaPrimitive.Viewport>

            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}

function ScrollBar({ className, orientation = "vertical", ...props }) {
    return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            orientation={orientation}
            className={cn(
                orientation === "vertical"
                    ? "w-2.5"
                    : "h-2.5 flex-col",
                className
            )}
            {...props}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb className="flex-1 rounded-full bg-gray-300" />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
}

export { ScrollArea, ScrollBar };
