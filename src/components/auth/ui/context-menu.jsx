"use client";

import React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "./utils";

function ContextMenu(props) {
    return <ContextMenuPrimitive.Root {...props} />;
}

function ContextMenuTrigger(props) {
    return <ContextMenuPrimitive.Trigger {...props} />;
}

function ContextMenuContent({ className, ...props }) {
    return (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
                className={cn(
                    "z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
                    className
                )}
                {...props}
            />
        </ContextMenuPrimitive.Portal>
    );
}

function ContextMenuItem({ className, ...props }) {
    return (
        <ContextMenuPrimitive.Item
            className={cn(
                "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100",
                className
            )}
            {...props}
        />
    );
}

function ContextMenuCheckboxItem({ children, ...props }) {
    return (
        <ContextMenuPrimitive.CheckboxItem
            className="relative flex items-center gap-2 pl-8 pr-2 py-1.5 text-sm"
            {...props}
        >
            <span className="absolute left-2">
                <ContextMenuPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </ContextMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </ContextMenuPrimitive.CheckboxItem>
    );
}

function ContextMenuRadioItem({ children, ...props }) {
    return (
        <ContextMenuPrimitive.RadioItem
            className="relative flex items-center gap-2 pl-8 pr-2 py-1.5 text-sm"
            {...props}
        >
            <span className="absolute left-2">
                <ContextMenuPrimitive.ItemIndicator>
                    <Circle className="h-2 w-2 fill-current" />
                </ContextMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </ContextMenuPrimitive.RadioItem>
    );
}

function ContextMenuSeparator(props) {
    return (
        <ContextMenuPrimitive.Separator
            className="my-1 h-px bg-gray-200"
            {...props}
        />
    );
}

export {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
    ContextMenuSeparator,
};
