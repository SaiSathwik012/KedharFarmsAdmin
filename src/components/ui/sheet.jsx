"use client";

import React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

function Sheet(props) {
    return <SheetPrimitive.Root {...props} />;
}

function SheetTrigger(props) {
    return <SheetPrimitive.Trigger {...props} />;
}

function SheetContent({
    className,
    children,
    side = "right",
    ...props
}) {
    return (
        <SheetPrimitive.Portal>
            <SheetPrimitive.Overlay className="fixed inset-0 bg-black/50" />
            <SheetPrimitive.Content
                className={cn(
                    "fixed z-50 bg-background shadow-lg",
                    side === "right" && "inset-y-0 right-0 w-3/4 sm:max-w-sm",
                    side === "left" && "inset-y-0 left-0 w-3/4 sm:max-w-sm",
                    className
                )}
                {...props}
            >
                {children}
                <SheetPrimitive.Close className="absolute top-4 right-4">
                    <XIcon className="size-4" />
                </SheetPrimitive.Close>
            </SheetPrimitive.Content>
        </SheetPrimitive.Portal>
    );
}

export { Sheet, SheetTrigger, SheetContent };
