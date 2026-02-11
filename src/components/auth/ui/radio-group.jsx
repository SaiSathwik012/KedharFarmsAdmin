"use client";

import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "./utils";

function RadioGroup({ className, ...props }) {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-3", className)}
            {...props}
        />
    );
}

function RadioGroupItem({ className, ...props }) {
    return (
        <RadioGroupPrimitive.Item
            className={cn("h-4 w-4 rounded-full border border-gray-300", className)}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <Circle className="h-2 w-2 fill-green-600" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
}

export { RadioGroup, RadioGroupItem };
