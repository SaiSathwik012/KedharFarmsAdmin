import { useState, useMemo } from "react";
import { Search, Calendar } from "lucide-react";
import { mockOrders, mockUsers, mockAddresses } from "../../lib/mockData";

/* ✅ Move outside component to fix ESLint dependency issue */
const terminatedStatuses = ["DELIVERED", "REJECTED", "CANCELLED"];

export function OrdersView({ onOrderClick }) {
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    /* ✅ useMemo clean */
    const filteredOrders = useMemo(() => {
        return mockOrders.filter((order) => {
            // Only terminated orders
            if (!terminatedStatuses.includes(order.current_status))
                return false;

            // Status filter
            if (
                statusFilter !== "ALL" &&
                order.current_status !== statusFilter
            )
                return false;

            // Search filter
            if (
                searchQuery &&
                !order.order_no
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
                return false;

            // Date filter
            if (dateFilter) {
                const orderDate = new Date(order.created_at)
                    .toISOString()
                    .split("T")[0];

                if (orderDate !== dateFilter) return false;
            }

            return true;
        });
    }, [statusFilter, searchQuery, dateFilter]);

    const getStatusBadge = (status) => {
        const colors = {
            DELIVERED: "bg-green-100 text-green-800",
            CANCELLED: "bg-gray-100 text-gray-800",
            REJECTED: "bg-red-100 text-red-800",
            PROCESSING: "bg-blue-100 text-blue-800",
            OUT_FOR_DELIVERY: "bg-yellow-100 text-yellow-800",
        };

        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const getUserName = (userId) =>
        mockUsers.find((u) => u.id === userId)?.name || "Unknown";

    const getAddress = (addressId) => {
        const addr = mockAddresses.find((a) => a.id === addressId);
        if (!addr) return "Unknown";
        return `${addr.house}, ${addr.street}, ${addr.city}`;
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-semibold mb-2">
                    Terminated Orders
                </h1>
                <p className="text-gray-600">
                    View all delivered, cancelled, and rejected orders
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            Status
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            Order ID
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search order number..."
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Date Filter */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            Date Created
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                value={dateFilter}
                                onChange={(e) =>
                                    setDateFilter(e.target.value)
                                }
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">
                                    Order No
                                </th>
                                <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">
                                    Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">
                                    Total Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">
                                    Created At
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        onClick={() =>
                                            onOrderClick(order.id)
                                        }
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {order.order_no}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {getUserName(order.user_id)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {getAddress(order.address_id)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getStatusBadge(
                                                    order.current_status
                                                )}`}
                                            >
                                                {order.current_status.replace(
                                                    "_",
                                                    " "
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            ${order.total_amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                Showing {filteredOrders.length} order(s)
            </div>
        </div>
    );
}
