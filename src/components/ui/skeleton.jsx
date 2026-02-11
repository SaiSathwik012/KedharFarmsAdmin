import React from "react";
import { cn } from "./utils";

function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-accent",
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };
