"use client";

import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "./utils";

function Drawer(props) {
    return <DrawerPrimitive.Root {...props} />;
}

function DrawerTrigger(props) {
    return <DrawerPrimitive.Trigger {...props} />;
}

function DrawerPortal(props) {
    return <DrawerPrimitive.Portal {...props} />;
}

function DrawerClose(props) {
    return <DrawerPrimitive.Close {...props} />;
}

function DrawerOverlay({ className, ...props }) {
    return (
        <DrawerPrimitive.Overlay
            className={cn("fixed inset-0 z-50 bg-black/50", className)}
            {...props}
        />
    );
}

function DrawerContent({ className, children, ...props }) {
    return (
        <DrawerPortal>
            <DrawerOverlay />
            <DrawerPrimitive.Content
                className={cn(
                    "fixed z-50 flex flex-col bg-white",
                    className
                )}
                {...props}
            >
                {children}
            </DrawerPrimitive.Content>
        </DrawerPortal>
    );
}

function DrawerHeader({ className, ...props }) {
    return <div className={cn("p-4 flex flex-col gap-2", className)} {...props} />;
}

function DrawerFooter({ className, ...props }) {
    return <div className={cn("p-4 mt-auto flex flex-col gap-2", className)} {...props} />;
}

function DrawerTitle({ className, ...props }) {
    return (
        <DrawerPrimitive.Title
            className={cn("font-semibold text-lg", className)}
            {...props}
        />
    );
}

function DrawerDescription({ className, ...props }) {
    return (
        <DrawerPrimitive.Description
            className={cn("text-sm text-gray-500", className)}
            {...props}
        />
    );
}

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
