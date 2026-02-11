import React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Pagination({ className, ...props }) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn("flex justify-center", className)}
            {...props}
        />
    );
}

function PaginationContent({ className, ...props }) {
    return (
        <ul
            className={cn("flex items-center gap-1", className)}
            {...props}
        />
    );
}

function PaginationItem(props) {
    return <li {...props} />;
}

function PaginationLink({
    className,
    isActive,
    size = "icon",
    ...props
}) {
    return (
        <a
            aria-current={isActive ? "page" : undefined}
            className={cn(
                buttonVariants({
                    variant: isActive ? "outline" : "ghost",
                    size,
                }),
                className
            )}
            {...props}
        />
    );
}

function PaginationPrevious(props) {
    return (
        <PaginationLink {...props}>
            <ChevronLeftIcon />
        </PaginationLink>
    );
}

function PaginationNext(props) {
    return (
        <PaginationLink {...props}>
            <ChevronRightIcon />
        </PaginationLink>
    );
}

function PaginationEllipsis({ className, ...props }) {
    return (
        <span
            className={cn("flex size-9 items-center justify-center", className)}
            {...props}
        >
            <MoreHorizontalIcon className="size-4" />
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
