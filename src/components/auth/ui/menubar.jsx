"use client";

import React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "./utils";

function Menubar({ className, ...props }) {
    return (
        <MenubarPrimitive.Root
            className={cn("flex h-9 items-center gap-1 rounded-md border bg-white p-1", className)}
            {...props}
        />
    );
}

function MenubarTrigger({ className, ...props }) {
    return (
        <MenubarPrimitive.Trigger
            className={cn("px-2 py-1 text-sm rounded-sm hover:bg-gray-100", className)}
            {...props}
        />
    );
}

function MenubarContent({ className, ...props }) {
    return (
        <MenubarPrimitive.Portal>
            <MenubarPrimitive.Content
                className={cn("min-w-[12rem] rounded-md border bg-white p-1 shadow-md", className)}
                {...props}
            />
        </MenubarPrimitive.Portal>
    );
}

function MenubarItem({ className, ...props }) {
    return (
        <MenubarPrimitive.Item
            className={cn("flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm", className)}
            {...props}
        />
    );
}

function MenubarCheckboxItem({ children, ...props }) {
    return (
        <MenubarPrimitive.CheckboxItem
            className="relative flex items-center gap-2 pl-8 pr-2 py-1.5 text-sm"
            {...props}
        >
            <span className="absolute left-2">
                <MenubarPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </MenubarPrimitive.ItemIndicator>
            </span>
            {children}
        </MenubarPrimitive.CheckboxItem>
    );
}

function MenubarRadioItem({ children, ...props }) {
    return (
        <MenubarPrimitive.RadioItem
            className="relative flex items-center gap-2 pl-8 pr-2 py-1.5 text-sm"
            {...props}
        >
            <span className="absolute left-2">
                <MenubarPrimitive.ItemIndicator>
                    <Circle className="h-2 w-2 fill-current" />
                </MenubarPrimitive.ItemIndicator>
            </span>
            {children}
        </MenubarPrimitive.RadioItem>
    );
}

export {
    Menubar,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarCheckboxItem,
    MenubarRadioItem,
};
