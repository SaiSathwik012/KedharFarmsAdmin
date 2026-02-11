"use client";

import React from "react";
import { cn } from "./utils";

function Table({ className, ...props }) {
    return (
        <div className="relative w-full overflow-x-auto">
            <table className={cn("w-full text-sm", className)} {...props} />
        </div>
    );
}

function TableHeader(props) {
    return <thead className="border-b" {...props} />;
}

function TableBody(props) {
    return <tbody {...props} />;
}

function TableFooter(props) {
    return <tfoot className="bg-gray-50 border-t font-medium" {...props} />;
}

function TableRow({ className, ...props }) {
    return (
        <tr
            className={cn("border-b hover:bg-gray-50", className)}
            {...props}
        />
    );
}

function TableHead({ className, ...props }) {
    return (
        <th
            className={cn("h-10 px-2 text-left font-medium", className)}
            {...props}
        />
    );
}

function TableCell({ className, ...props }) {
    return <td className={cn("p-2", className)} {...props} />;
}

function TableCaption({ className, ...props }) {
    return (
        <caption className={cn("mt-4 text-sm text-gray-500", className)} {...props} />
    );
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
