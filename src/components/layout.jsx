import React, { useState } from 'react';
import {
    LayoutDashboard,
    Package,
    Truck,
    Users,
    Box,
    Settings,
    Gift,
    Menu,
    X
} from 'lucide-react';

export function Layout({ children, activeTab, onTabChange }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { id: 'ongoing', label: 'Ongoing Deliveries', icon: Truck },
        { id: 'orders', label: 'View Orders', icon: LayoutDashboard },
        { id: 'subscriptions', label: 'View Subscriptions', icon: Package },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'products', label: 'Product Management', icon: Box },
        { id: 'inventory', label: 'Inventory Management', icon: Settings },
        { id: 'coupons', label: 'Coupon Management', icon: Gift },
    ];

    const handleTabClick = (id) => {
        onTabChange(id);
        setSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static z-50 h-full w-64 
                bg-[#2E7D32] text-white flex flex-col 
                transform transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0`}
            >
                {/* Header */}
                <div className="p-6 border-b border-green-700 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">KedharFarms</h1>
                        <p className="text-xs text-green-200">Admin Dashboard</p>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden hover:bg-green-700 p-2 rounded-lg transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleTabClick(item.id)}
                                className={`w-full flex items-center gap-3 px-6 py-3 transition-colors
                                ${isActive
                                        ? 'bg-[#E8F5E9] text-[#2E7D32] border-r-4 border-[#2E7D32]'
                                        : 'hover:bg-green-700'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Section */}
            <div className="flex flex-col flex-1 w-full">

                {/* Top Bar (Mobile Only) */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                    <h2 className="ml-4 font-semibold text-gray-800">
                        Admin Dashboard
                    </h2>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
