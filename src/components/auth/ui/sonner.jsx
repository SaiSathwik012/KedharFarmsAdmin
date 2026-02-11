"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

function Toaster(props) {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme}
            className="toaster"
            {...props}
        />
    );
}

export { Toaster };
