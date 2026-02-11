"use client";

import React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import { cn } from "./utils";

function InputOTP({
    className,
    containerClassName,
    ...props
}) {
    return (
        <OTPInput
            data-slot="input-otp"
            containerClassName={cn(
                "flex items-center gap-2 has-disabled:opacity-50",
                containerClassName
            )}
            className={cn("disabled:cursor-not-allowed", className)}
            {...props}
        />
    );
}

function InputOTPGroup({ className, ...props }) {
    return (
        <div
            data-slot="input-otp-group"
            className={cn("flex items-center gap-1", className)}
            {...props}
        />
    );
}

function InputOTPSlot({ index, className, ...props }) {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } =
        inputOTPContext?.slots?.[index] ?? {};

    return (
        <div
            data-slot="input-otp-slot"
            data-active={isActive}
            className={cn(
                "relative flex h-9 w-9 items-center justify-center border text-sm transition-all",
                className
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-foreground h-4 w-px animate-pulse" />
                </div>
            )}
        </div>
    );
}

function InputOTPSeparator(props) {
    return (
        <div data-slot="input-otp-separator" role="separator" {...props}>
            <MinusIcon />
        </div>
    );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
    