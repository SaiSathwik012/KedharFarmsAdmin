"use client";

import React, { useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { cn } from "./utils";

function InputOTP({ className, containerClassName, ...props }) {
    return (
        <OTPInput
            containerClassName={cn("flex items-center gap-2", containerClassName)}
            className={cn(className)}
            {...props}
        />
    );
}

function InputOTPGroup({ className, ...props }) {
    return <div className={cn("flex gap-1", className)} {...props} />;
}

function InputOTPSlot({ index, className, ...props }) {
    const context = useContext(OTPInputContext);
    const { char, isActive } = context?.slots[index] || {};

    return (
        <div
            className={cn(
                "h-9 w-9 flex items-center justify-center border rounded-md text-sm",
                isActive && "ring-2 ring-green-600",
                className
            )}
            {...props}
        >
            {char}
        </div>
    );
}

function InputOTPSeparator(props) {
    return (
        <div role="separator" {...props}>
            <Minus />
        </div>
    );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
