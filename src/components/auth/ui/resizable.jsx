"use client";

import React from "react";
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "./utils";

function ResizablePanelGroup({ className, ...props }) {
    return (
        <ResizablePrimitive.PanelGroup
            className={cn("flex h-full w-full", className)}
            {...props}
        />
    );
}

function ResizablePanel(props) {
    return <ResizablePrimitive.Panel {...props} />;
}

function ResizableHandle({ withHandle, className, ...props }) {
    return (
        <ResizablePrimitive.PanelResizeHandle
            className={cn(
                "relative flex w-px items-center justify-center bg-gray-200",
                className
            )}
            {...props}
        >
            {withHandle && (
                <div className="flex h-4 w-3 items-center justify-center rounded border bg-white">
                    <GripVertical className="h-3 w-3" />
                </div>
            )}
        </ResizablePrimitive.PanelResizeHandle>
    );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
