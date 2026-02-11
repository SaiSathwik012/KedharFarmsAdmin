import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "./utils";

function Breadcrumb(props) {
    return <nav aria-label="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }) {
    return (
        <ol
            className={cn(
                "flex flex-wrap items-center gap-2 text-sm text-gray-500",
                className
            )}
            {...props}
        />
    );
}

function BreadcrumbItem({ className, ...props }) {
    return (
        <li
            className={cn("inline-flex items-center gap-1.5", className)}
            {...props}
        />
    );
}

function BreadcrumbLink({ asChild = false, className, ...props }) {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            className={cn("hover:text-black transition-colors", className)}
            {...props}
        />
    );
}

function BreadcrumbPage({ className, ...props }) {
    return (
        <span
            aria-current="page"
            className={cn("text-black font-medium", className)}
            {...props}
        />
    );
}

function BreadcrumbSeparator({ children, className, ...props }) {
    return (
        <li
            role="presentation"
            className={cn("[&>svg]:w-3 [&>svg]:h-3", className)}
            {...props}
        >
            {children ?? <ChevronRight />}
        </li>
    );
}

function BreadcrumbEllipsis({ className, ...props }) {
    return (
        <span
            role="presentation"
            className={cn("flex items-center justify-center w-6 h-6", className)}
            {...props}
        >
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More</span>
        </span>
    );
}

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
