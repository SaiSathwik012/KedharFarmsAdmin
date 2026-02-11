"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "./utils";

function Slider({
    className,
    defaultValue,
    value,
    min = 0,
    max = 100,
    ...props
}) {
    const _values = React.useMemo(() => {
        if (Array.isArray(value)) return value;
        if (Array.isArray(defaultValue)) return defaultValue;
        return [min, max];
    }, [value, defaultValue, min, max]);

    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn(
                "relative flex w-full touch-none items-center select-none",
                className
            )}
            {...props}
        >
            <SliderPrimitive.Track className="bg-muted relative grow overflow-hidden rounded-full h-4 w-full">
                <SliderPrimitive.Range className="bg-primary absolute h-full" />
            </SliderPrimitive.Track>

            {_values.map((_, index) => (
                <SliderPrimitive.Thumb
                    key={index}
                    className="border-primary bg-background block size-4 rounded-full border shadow-sm"
                />
            ))}
        </SliderPrimitive.Root>
    );
}

export { Slider };
