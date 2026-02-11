import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { mockOrders, mockUsers, mockAddresses } from "../../lib/mockData";

/* ✅ Move outside component to fix ESLint dependency warning */
const ongoingStatuses = ["PROCESSING", "OUT_FOR_DELIVERY"];

export function OngoingOrders({ onOrderClick }) {
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrders, setSelectedOrders] = useState(new Set());
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    /* ✅ useMemo now clean and ESLint safe */
    const filteredOrders = useMemo(() => {
        return mockOrders.filter((order) => {
            if (!ongoingStatuses.includes(order.current_status)) return false;
            if (
                statusFilter !== "ALL" &&
                order.current_status !== statusFilter
            )
                return false;
            if (
                searchQuery &&
                !order.order_no
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
                return false;

            return true;
        });
    }, [statusFilter, searchQuery]);

    const getStatusBadge = (status) => {
        const colors = {
            PROCESSING: "bg-blue-100 text-blue-800",
            OUT_FOR_DELIVERY: "bg-yellow-100 text-yellow-800",
            DELIVERED: "bg-green-100 text-green-800",
            CANCELLED: "bg-gray-100 text-gray-800",
            REJECTED: "bg-red-100 text-red-800",
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

    const toggleOrderSelection = (orderId) => {
        const newSelected = new Set(selectedOrders);
        if (newSelected.has(orderId)) {
            newSelected.delete(orderId);
        } else {
            newSelected.add(orderId);
        }
        setSelectedOrders(newSelected);
    };

    const toggleSelectAll = () => {
        if (selectedOrders.size === filteredOrders.length) {
            setSelectedOrders(new Set());
        } else {
            setSelectedOrders(
                new Set(filteredOrders.map((o) => o.id))
            );
        }
    };

    const handleBulkAction = (action) => {
        if (action === "rejected") {
            setShowRejectModal(true);
        } else {
            alert(
                `Marked ${selectedOrders.size} order(s) as ${action.replace(
                    "_",
                    " "
                )}`
            );
            setSelectedOrders(new Set());
        }
    };

    const handleReject = () => {
        if (!rejectReason.trim()) {
            alert("Please provide a reason for rejection");
            return;
        }

        alert(
            `Rejected ${selectedOrders.size} order(s). Reason: ${rejectReason}`
        );

        setSelectedOrders(new Set());
        setShowRejectModal(false);
        setRejectReason("");
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-2">
                    Ongoing Orders
                </h1>
                <p className="text-gray-600">
                    Manage orders that are being processed or out for
                    delivery
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm mb-2">
                            Status
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="PROCESSING">
                                Processing
                            </option>
                            <option value="OUT_FOR_DELIVERY">
                                Out for Delivery
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-2">
                            Order ID
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search order number..."
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>

                {selectedOrders.size > 0 && (
                    <div className="pt-4 border-t">
                        <span className="text-sm text-gray-600 mr-3">
                            {selectedOrders.size} selected:
                        </span>

                        <button
                            onClick={() =>
                                handleBulkAction("out_for_delivery")
                            }
                            className="mr-2 px-3 py-1.5 bg-yellow-600 text-white rounded"
                        >
                            Mark Out for Delivery
                        </button>

                        <button
                            onClick={() =>
                                handleBulkAction("delivered")
                            }
                            className="mr-2 px-3 py-1.5 bg-green-600 text-white rounded"
                        >
                            Mark Delivered
                        </button>

                        <button
                            onClick={() =>
                                handleBulkAction("rejected")
                            }
                            className="px-3 py-1.5 bg-red-600 text-white rounded"
                        >
                            Reject
                        </button>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedOrders.size ===
                                        filteredOrders.length &&
                                        filteredOrders.length > 0
                                    }
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="p-3 text-left">
                                Order No
                            </th>
                            <th className="p-3 text-left">
                                Customer
                            </th>
                            <th className="p-3 text-left">
                                Address
                            </th>
                            <th className="p-3 text-left">
                                Status
                            </th>
                            <th className="p-3 text-left">
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-6 text-center text-gray-500"
                                >
                                    No ongoing orders found
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.has(
                                                order.id
                                            )}
                                            onChange={() =>
                                                toggleOrderSelection(order.id)
                                            }
                                        />
                                    </td>

                                    <td
                                        className="p-3 cursor-pointer text-green-600"
                                        onClick={() =>
                                            onOrderClick(order.id)
                                        }
                                    >
                                        {order.order_no}
                                    </td>

                                    <td className="p-3">
                                        {getUserName(order.user_id)}
                                    </td>

                                    <td className="p-3">
                                        {getAddress(order.address_id)}
                                    </td>

                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(
                                                order.current_status
                                            )}`}
                                        >
                                            {order.current_status.replace(
                                                "_",
                                                " "
                                            )}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        ${order.total_amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            Reject Orders
                        </h3>

                        <textarea
                            value={rejectReason}
                            onChange={(e) =>
                                setRejectReason(e.target.value)
                            }
                            placeholder="Enter rejection reason..."
                            className="w-full border rounded-lg p-2 mb-4"
                            rows={4}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() =>
                                    setShowRejectModal(false)
                                }
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Reject Orders
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
