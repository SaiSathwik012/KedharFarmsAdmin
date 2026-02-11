"use client";

import React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "./utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./dialog";

function Command({ className, ...props }) {
    return (
        <CommandPrimitive
            className={cn(
                "flex h-full w-full flex-col overflow-hidden rounded-md bg-white",
                className
            )}
            {...props}
        />
    );
}

function CommandDialog({
    title = "Command Palette",
    description = "Search for a command...",
    children,
    ...props
}) {
    return (
        <Dialog {...props}>
            <DialogHeader className="sr-only">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogContent className="p-0 overflow-hidden">
                <Command>{children}</Command>
            </DialogContent>
        </Dialog>
    );
}

function CommandInput({ className, ...props }) {
    return (
        <div className="flex items-center gap-2 border-b px-3">
            <Search className="h-4 w-4 opacity-50" />
            <CommandPrimitive.Input
                className={cn(
                    "flex h-10 w-full bg-transparent text-sm outline-none",
                    className
                )}
                {...props}
            />
        </div>
    );
}

function CommandList({ className, ...props }) {
    return (
        <CommandPrimitive.List
            className={cn("max-h-[300px] overflow-y-auto", className)}
            {...props}
        />
    );
}

function CommandEmpty(props) {
    return (
        <CommandPrimitive.Empty
            className="py-6 text-center text-sm"
            {...props}
        />
    );
}

function CommandGroup({ className, ...props }) {
    return (
        <CommandPrimitive.Group
            className={cn("p-1 text-sm", className)}
            {...props}
        />
    );
}

function CommandItem({ className, ...props }) {
    return (
        <CommandPrimitive.Item
            className={cn(
                "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100",
                className
            )}
            {...props}
        />
    );
}

function CommandShortcut({ className, ...props }) {
    return (
        <span className={cn("ml-auto text-xs opacity-60", className)} {...props} />
    );
}

function CommandSeparator({ className, ...props }) {
    return (
        <CommandPrimitive.Separator
            className={cn("my-1 h-px bg-gray-200", className)}
            {...props}
        />
    );
}

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
