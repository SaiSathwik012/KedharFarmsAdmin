"use client";

import React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "./utils";

function ResizablePanelGroup({ className, ...props }) {
    return (
        <ResizablePrimitive.PanelGroup
            data-slot="resizable-panel-group"
            className={cn("flex h-full w-full", className)}
            {...props}
        />
    );
}

function ResizablePanel(props) {
    return (
        <ResizablePrimitive.Panel
            data-slot="resizable-panel"
            {...props}
        />
    );
}

function ResizableHandle({
    withHandle,
    className,
    ...props
}) {
    return (
        <ResizablePrimitive.PanelResizeHandle
            data-slot="resizable-handle"
            className={cn(
                "bg-border relative flex w-px items-center justify-center",
                className
            )}
            {...props}
        >
            {withHandle && (
                <div className="bg-border flex h-4 w-3 items-center justify-center rounded border">
                    <GripVerticalIcon className="size-2.5" />
                </div>
            )}
        </ResizablePrimitive.PanelResizeHandle>
    );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
