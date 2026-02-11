"use client";

import React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import {
    CheckIcon,
    ChevronRightIcon,
    CircleIcon,
} from "lucide-react";

import { cn } from "./utils";

function ContextMenu(props) {
    return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger(props) {
    return (
        <ContextMenuPrimitive.Trigger
            data-slot="context-menu-trigger"
            {...props}
        />
    );
}

function ContextMenuContent({ className, ...props }) {
    return (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
                data-slot="context-menu-content"
                className={cn(
                    "bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-md",
                    className
                )}
                {...props}
            />
        </ContextMenuPrimitive.Portal>
    );
}

function ContextMenuItem({
    className,
    inset,
    variant = "default",
    ...props
}) {
    return (
        <ContextMenuPrimitive.Item
            data-slot="context-menu-item"
            data-inset={inset}
            data-variant={variant}
            className={cn(
                "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none",
                className
            )}
            {...props}
        />
    );
}

function ContextMenuSeparator({ className, ...props }) {
    return (
        <ContextMenuPrimitive.Separator
            data-slot="context-menu-separator"
            className={cn("bg-border -mx-1 my-1 h-px", className)}
            {...props}
        />
    );
}

function ContextMenuLabel({ className, inset, ...props }) {
    return (
        <ContextMenuPrimitive.Label
            data-slot="context-menu-label"
            data-inset={inset}
            className={cn("px-2 py-1.5 text-sm font-medium", className)}
            {...props}
        />
    );
}

function ContextMenuShortcut({ className, ...props }) {
    return (
        <span
            data-slot="context-menu-shortcut"
            className={cn(
                "text-muted-foreground ml-auto text-xs tracking-widest",
                className
            )}
            {...props}
        />
    );
}

export {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuLabel,
    ContextMenuShortcut,
};
