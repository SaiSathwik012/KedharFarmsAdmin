"use client";

import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "./utils";

function DropdownMenu(props) {
    return <DropdownMenuPrimitive.Root {...props} />;
}

function DropdownMenuTrigger(props) {
    return <DropdownMenuPrimitive.Trigger {...props} />;
}

function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                sideOffset={sideOffset}
                className={cn(
                    "z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
                    className
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    );
}

function DropdownMenuItem({ className, ...props }) {
    return (
        <DropdownMenuPrimitive.Item
            className={cn(
                "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100",
                className
            )}
            {...props}
        />
    );
}

function DropdownMenuCheckboxItem({ children, ...props }) {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            className="relative flex items-center gap-2 pl-8 pr-2 py-1.5 text-sm"
            {...props}
        >
            <span className="absolute left-2">
                <DropdownMenuPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    );
}

function DropdownMenuRadioItem({ children, ...props }) {
    return (
        <DropdownMenuPrimitive.RadioItem
            className="relative flex items-center gap-2 pl-8 pr-2 py-1.5 text-sm"
            {...props}
        >
            <span className="absolute left-2">
                <DropdownMenuPrimitive.ItemIndicator>
                    <Circle className="h-2 w-2 fill-current" />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    );
}

function DropdownMenuSeparator(props) {
    return (
        <DropdownMenuPrimitive.Separator
            className="my-1 h-px bg-gray-200"
            {...props}
        />
    );
}

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
};
