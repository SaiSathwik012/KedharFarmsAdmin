"use client";

import React from "react";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";

const SidebarContext = React.createContext(null);

export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used inside SidebarProvider");
    }
    return context;
}

export function SidebarProvider({
    defaultOpen = true,
    children,
    className,
    ...props
}) {
    const [open, setOpen] = React.useState(defaultOpen);
    const [openMobile, setOpenMobile] = React.useState(false);

    const isMobile =
        typeof window !== "undefined" && window.innerWidth < 768;

    const toggleSidebar = () => {
        if (isMobile) {
            setOpenMobile((prev) => !prev);
        } else {
            setOpen((prev) => !prev);
        }
    };

    return (
        <SidebarContext.Provider
            value={{
                open,
                setOpen,
                openMobile,
                setOpenMobile,
                toggleSidebar,
                isMobile,
            }}
        >
            <div
                className={cn(
                    "flex min-h-screen w-full",
                    className
                )}
                style={{
                    "--sidebar-width": SIDEBAR_WIDTH,
                }}
                {...props}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    );
}

export function Sidebar({
    side = "left",
    className,
    children,
    ...props
}) {
    const { open, openMobile, isMobile } = useSidebar();

    if (isMobile) {
        if (!openMobile) return null;

        return (
            <div
                className="fixed inset-0 z-50 bg-black/50"
            >
                <div
                    className={cn(
                        "absolute top-0 h-full bg-sidebar text-sidebar-foreground shadow-lg transition-all",
                        side === "left" && "left-0 w-[18rem]",
                        side === "right" && "right-0 w-[18rem]",
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "hidden md:flex h-screen bg-sidebar text-sidebar-foreground transition-all",
                side === "left" && "border-r",
                side === "right" && "border-l",
                open ? "w-[16rem]" : "w-[4rem]",
                className
            )}
            {...props}
        >
            <div className="flex flex-col w-full">
                {children}
            </div>
        </div>
    );
}

export function SidebarTrigger({
    className,
    ...props
}) {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("size-8", className)}
            onClick={toggleSidebar}
            {...props}
        >
            <PanelLeftIcon className="size-4" />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}

export function SidebarContent({
    className,
    ...props
}) {
    return (
        <div
            className={cn(
                "flex flex-1 flex-col overflow-auto p-2",
                className
            )}
            {...props}
        />
    );
}

export function SidebarHeader({
    className,
    ...props
}) {
    return (
        <div
            className={cn("p-2 border-b", className)}
            {...props}
        />
    );
}

export function SidebarFooter({
    className,
    ...props
}) {
    return (
        <div
            className={cn("p-2 border-t mt-auto", className)}
            {...props}
        />
    );
}

export function SidebarMenu({
    className,
    ...props
}) {
    return (
        <ul
            className={cn("flex flex-col gap-1", className)}
            {...props}
        />
    );
}

export function SidebarMenuItem({
    className,
    ...props
}) {
    return (
        <li
            className={cn("w-full", className)}
            {...props}
        />
    );
}

export function SidebarMenuButton({
    className,
    isActive,
    children,
    ...props
}) {
    return (
        <button
            className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent",
                isActive && "bg-sidebar-accent font-medium",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
