"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "./utils";

function Sheet(props) {
    return <Dialog.Root {...props} />;
}

function SheetTrigger(props) {
    return <Dialog.Trigger {...props} />;
}

function SheetClose(props) {
    return <Dialog.Close {...props} />;
}

function SheetContent({ className, children, side = "right", ...props }) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content
                className={cn(
                    "fixed z-50 bg-white shadow-lg p-4",
                    side === "right" && "right-0 top-0 h-full w-80",
                    side === "left" && "left-0 top-0 h-full w-80",
                    side === "top" && "top-0 left-0 w-full",
                    side === "bottom" && "bottom-0 left-0 w-full",
                    className
                )}
                {...props}
            >
                {children}
                <Dialog.Close className="absolute top-4 right-4">
                    <X className="h-4 w-4" />
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent };
