"use client";

import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "./utils";

function Select(props) {
    return <SelectPrimitive.Root {...props} />;
}

function SelectGroup(props) {
    return <SelectPrimitive.Group {...props} />;
}

function SelectValue(props) {
    return <SelectPrimitive.Value {...props} />;
}

function SelectTrigger({ className, children, ...props }) {
    return (
        <SelectPrimitive.Trigger
            className={cn(
                "flex h-9 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-green-600",
                className
            )}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

function SelectContent({ className, children, ...props }) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                className={cn(
                    "z-50 min-w-[8rem] rounded-md border bg-white shadow-md",
                    className
                )}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport className="p-1">
                    {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

function SelectItem({ className, children, ...props }) {
    return (
        <SelectPrimitive.Item
            className={cn(
                "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm hover:bg-gray-100",
                className
            )}
            {...props}
        >
            <span className="absolute right-2 flex items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
}

function SelectLabel({ className, ...props }) {
    return (
        <SelectPrimitive.Label
            className={cn("px-2 py-1.5 text-xs text-gray-500", className)}
            {...props}
        />
    );
}

function SelectSeparator({ className, ...props }) {
    return (
        <SelectPrimitive.Separator
            className={cn("my-1 h-px bg-gray-200", className)}
            {...props}
        />
    );
}

function SelectScrollUpButton(props) {
    return (
        <SelectPrimitive.ScrollUpButton
            className="flex items-center justify-center py-1"
            {...props}
        >
            <ChevronUp className="h-4 w-4" />
        </SelectPrimitive.ScrollUpButton>
    );
}

function SelectScrollDownButton(props) {
    return (
        <SelectPrimitive.ScrollDownButton
            className="flex items-center justify-center py-1"
            {...props}
        >
            <ChevronDown className="h-4 w-4" />
        </SelectPrimitive.ScrollDownButton>
    );
}

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
};
