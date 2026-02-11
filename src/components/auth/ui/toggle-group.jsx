"use client";

import React, { createContext, useContext } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = createContext({
    size: "default",
    variant: "default",
});

function ToggleGroup({ className, variant, size, children, ...props }) {
    return (
        <ToggleGroupPrimitive.Root
            className={cn(
                "flex w-fit items-center rounded-md",
                className
            )}
            {...props}
        >
            <ToggleGroupContext.Provider value={{ variant, size }}>
                {children}
            </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
    );
}

function ToggleGroupItem({ className, children, variant, size, ...props }) {
    const context = useContext(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            className={cn(
                toggleVariants({
                    variant: context.variant || variant,
                    size: context.size || size,
                }),
                "rounded-none first:rounded-l-md last:rounded-r-md",
                className
            )}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
}

export { ToggleGroup, ToggleGroupItem };
