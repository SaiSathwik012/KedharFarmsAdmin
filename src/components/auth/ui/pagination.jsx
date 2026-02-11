import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

function Pagination({ className, ...props }) {
    return (
        <nav className={cn("flex justify-center", className)} {...props} />
    );
}

function PaginationContent({ className, ...props }) {
    return (
        <ul className={cn("flex items-center gap-1", className)} {...props} />
    );
}

function PaginationItem(props) {
    return <li {...props} />;
}

function PaginationLink({ isActive, className, ...props }) {
    return (
        <a
            className={cn(
                "px-3 py-1 rounded-md text-sm",
                isActive ? "border border-gray-300 bg-gray-100" : "hover:bg-gray-100",
                className
            )}
            {...props}
        />
    );
}

function PaginationPrevious(props) {
    return (
        <PaginationLink {...props}>
            <ChevronLeft className="h-4 w-4" />
        </PaginationLink>
    );
}

function PaginationNext(props) {
    return (
        <PaginationLink {...props}>
            <ChevronRight className="h-4 w-4" />
        </PaginationLink>
    );
}

function PaginationEllipsis(props) {
    return (
        <span className="flex h-9 w-9 items-center justify-center" {...props}>
            <MoreHorizontal className="h-4 w-4" />
        </span>
    );
}

export {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
