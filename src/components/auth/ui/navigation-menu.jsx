import React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";

function NavigationMenu({ className, children, ...props }) {
    return (
        <NavigationMenuPrimitive.Root
            className={cn("relative flex items-center justify-center", className)}
            {...props}
        >
            {children}
            <NavigationMenuViewport />
        </NavigationMenuPrimitive.Root>
    );
}

function NavigationMenuList({ className, ...props }) {
    return (
        <NavigationMenuPrimitive.List
            className={cn("flex gap-1 list-none", className)}
            {...props}
        />
    );
}

function NavigationMenuItem(props) {
    return <NavigationMenuPrimitive.Item {...props} />;
}

function NavigationMenuTrigger({ className, children, ...props }) {
    return (
        <NavigationMenuPrimitive.Trigger
            className={cn("flex items-center gap-1 px-4 py-2 text-sm rounded-md hover:bg-gray-100", className)}
            {...props}
        >
            {children}
            <ChevronDown className="h-3 w-3" />
        </NavigationMenuPrimitive.Trigger>
    );
}

function NavigationMenuContent({ className, ...props }) {
    return (
        <NavigationMenuPrimitive.Content
            className={cn("absolute mt-2 rounded-md border bg-white p-2 shadow-md", className)}
            {...props}
        />
    );
}

function NavigationMenuViewport(props) {
    return (
        <NavigationMenuPrimitive.Viewport
            className="absolute top-full left-0 mt-2 rounded-md border bg-white shadow-md"
            {...props}
        />
    );
}

export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
};
