import { useState, useMemo } from 'react';
import { Search, Check, Truck, XCircle } from 'lucide-react';
import { mockOrders, mockUsers, mockAddresses } from '../../lib/mockData';

export function OngoingOrders({ onOrderClick }) {
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrders, setSelectedOrders] = useState(new Set());
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    const ongoingStatuses = ['PROCESSING', 'OUT_FOR_DELIVERY'];

    const filteredOrders = useMemo(() => {
        return mockOrders.filter(order => {
            if (!ongoingStatuses.includes(order.current_status)) return false;
            if (statusFilter !== 'ALL' && order.current_status !== statusFilter) return false;
            if (
                searchQuery &&
                !order.order_no.toLowerCase().includes(searchQuery.toLowerCase())
            )
                return false;
            return true;
        });
    }, [statusFilter, searchQuery]);

    const getStatusBadge = status => {
        const colors = {
            PROCESSING: 'bg-blue-100 text-blue-800',
            OUT_FOR_DELIVERY: 'bg-yellow-100 text-yellow-800',
            DELIVERED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-gray-100 text-gray-800',
            REJECTED: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getUserName = userId =>
        mockUsers.find(u => u.id === userId)?.name || 'Unknown';

    const getAddress = addressId => {
        const addr = mockAddresses.find(a => a.id === addressId);
        if (!addr) return 'Unknown';
        return `${addr.house}, ${addr.street}, ${addr.city}`;
    };

    const toggleOrderSelection = orderId => {
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
            setSelectedOrders(new Set(filteredOrders.map(o => o.id)));
        }
    };

    const handleBulkAction = action => {
        if (action === 'rejected') {
            setShowRejectModal(true);
        } else {
            alert(
                `Marked ${selectedOrders.size} order(s) as ${action.replace('_', ' ')}`
            );
            setSelectedOrders(new Set());
        }
    };

    const handleReject = () => {
        if (!rejectReason.trim()) {
            alert('Please provide a reason for rejection');
            return;
        }
        alert(
            `Rejected ${selectedOrders.size} order(s). Reason: ${rejectReason}`
        );
        setSelectedOrders(new Set());
        setShowRejectModal(false);
        setRejectReason('');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl mb-2">Ongoing Orders</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    Manage orders that are being processed or out for delivery
                </p>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            Status
                        </label>
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="PROCESSING">Processing</option>
                            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            Order ID
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search order number..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-9 sm:pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            />
                        </div>
                    </div>
                </div>

                {selectedOrders.size > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <span className="text-sm text-gray-600">
                                {selectedOrders.size} selected:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleBulkAction('out_for_delivery')}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm flex-1 sm:flex-none justify-center"
                                >
                                    <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="whitespace-nowrap">Mark Out for Delivery</span>
                                </button>
                                <button
                                    onClick={() => handleBulkAction('delivered')}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex-1 sm:flex-none justify-center"
                                >
                                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="whitespace-nowrap">Mark Delivered</span>
                                </button>
                                <button
                                    onClick={() => handleBulkAction('rejected')}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex-1 sm:flex-none justify-center"
                                >
                                    <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="whitespace-nowrap">Reject</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 sm:px-6 sm:py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedOrders.size === filteredOrders.length &&
                                            filteredOrders.length > 0
                                        }
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Order No
                                </th>
                                <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Address
                                </th>
                                <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Total Amount
                                </th>
                                <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-8 sm:px-6 text-center text-gray-500 text-sm"
                                    >
                                        No ongoing orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map(order => (
                                    <tr
                                        key={order.id}
                                        className={`hover:bg-gray-50 transition-colors ${selectedOrders.has(order.id) ? 'bg-blue-50' : ''
                                            }`}
                                    >
                                        <td className="px-4 py-3 sm:px-6 sm:py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.has(order.id)}
                                                onChange={() => toggleOrderSelection(order.id)}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td
                                            className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-900 cursor-pointer"
                                            onClick={() => onOrderClick(order.id)}
                                        >
                                            {order.order_no}
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-900">
                                            {getUserName(order.user_id)}
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600 max-w-[150px] sm:max-w-none truncate">
                                            {getAddress(order.address_id)}
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4">
                                            <span
                                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getStatusBadge(
                                                    order.current_status
                                                )}`}
                                            >
                                                {order.current_status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-900">
                                            ${order.total_amount.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">
                                            {new Date(order.created_at).toLocaleDateString()}
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

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl mb-4">Reject Orders</h3>
                        <p className="text-gray-600 text-sm sm:text-base mb-4">
                            Please provide a reason for rejecting {selectedOrders.size} order(s):
                        </p>
                        <textarea
                            value={rejectReason}
                            onChange={e => setRejectReason(e.target.value)}
                            placeholder="Enter rejection reason..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-sm sm:text-base"
                            rows={4}
                        />
                        <div className="flex flex-col sm:flex-row gap-2 justify-end">
                            <button
                                onClick={() => {
                                    setShowRejectModal(false);
                                    setRejectReason('');
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base order-1 sm:order-2"
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