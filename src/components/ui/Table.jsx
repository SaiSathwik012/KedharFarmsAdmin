"use client";

import * as React from "react";
import { cn } from "./utils";

function Table({ className, ...props }) {
    return (
        <div className="relative w-full overflow-x-auto">
            <table className={cn("w-full text-sm", className)} {...props} />
        </div>
    );
}

function TableHeader({ className, ...props }) {
    return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }) {
    return <tbody className={cn(className)} {...props} />;
}

function TableRow({ className, ...props }) {
    return (
        <tr
            className={cn("border-b hover:bg-muted/50 transition-colors", className)}
            {...props}
        />
    );
}

function TableHead({ className, ...props }) {
    return (
        <th
            className={cn("px-2 text-left font-medium whitespace-nowrap", className)}
            {...props}
        />
    );
}

function TableCell({ className, ...props }) {
    return (
        <td className={cn("p-2 whitespace-nowrap", className)} {...props} />
    );
}

export {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
};
