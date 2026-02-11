import React from "react";
import { cn } from "./utils";

function Card({ className, ...props }) {
    return (
        <div
            data-slot="card"
            className={cn(
                "flex flex-col gap-6 rounded-xl border bg-white text-black",
                className
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }) {
    return (
        <div
            data-slot="card-header"
            className={cn("grid gap-1.5 px-6 pt-6", className)}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }) {
    return (
        <h4
            data-slot="card-title"
            className={cn("leading-none font-semibold", className)}
            {...props}
        />
    );
}

function CardDescription({ className, ...props }) {
    return (
        <p
            data-slot="card-description"
            className={cn("text-gray-500 text-sm", className)}
            {...props}
        />
    );
}

function CardAction({ className, ...props }) {
    return (
        <div
            data-slot="card-action"
            className={cn("self-start justify-self-end", className)}
            {...props}
        />
    );
}

function CardContent({ className, ...props }) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-6 pb-6", className)}
            {...props}
        />
    );
}

function CardFooter({ className, ...props }) {
    return (
        <div
            data-slot="card-footer"
            className={cn("flex items-center px-6 pb-6", className)}
            {...props}
        />
    );
}

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
};
