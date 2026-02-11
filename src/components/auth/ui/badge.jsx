import React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
    {
        variants: {
            variant: {
                default: "bg-green-600 text-white",
                outline: "border-green-600 text-green-600",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "span";

    return (
        <Comp
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Badge, badgeVariants };
