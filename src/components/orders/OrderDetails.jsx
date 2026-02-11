import { ArrowLeft, CheckCircle } from 'lucide-react';
import {
    mockOrders,
    mockUsers,
    mockAddresses,
    mockOrderItems,
    mockOrderStatusLogs,
    mockProductVariants,
} from '../../lib/mockData';

export function OrderDetails({ orderId, onBack }) {
    const order = mockOrders.find((o) => o.id === orderId);
    const user = order ? mockUsers.find((u) => u.id === order.user_id) : null;
    const address = order ? mockAddresses.find((a) => a.id === order.address_id) : null;

    const items = mockOrderItems.filter((item) => item.order_id === orderId);
    const statusLogs = mockOrderStatusLogs
        .filter((log) => log.order_id === orderId)
        .sort(
            (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
        );

    if (!order || !user || !address) {
        return (
            <div className="p-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>
                <div className="text-center text-gray-500">Order not found</div>
            </div>
        );
    }

    const getProductVariantName = (variantId) => {
        return (
            mockProductVariants.find((v) => v.id === variantId)?.name ||
            'Unknown Product'
        );
    };

    const getStatusBadge = (status) => {
        const colors = {
            DELIVERED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-gray-100 text-gray-800',
            REJECTED: 'bg-red-100 text-red-800',
            PROCESSING: 'bg-blue-100 text-blue-800',
            OUT_FOR_DELIVERY: 'bg-yellow-100 text-yellow-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="p-8">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Orders
            </button>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl">Order Details</h1>
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusBadge(
                            order.current_status
                        )}`}
                    >
                        {order.current_status.replace('_', ' ')}
                    </span>
                </div>
                <p className="text-gray-600">{order.order_no}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Customer Details */}
                <div className="bg-white rounded-lg border p-6">
                    <h3 className="text-sm text-gray-500 mb-4">Customer Details</h3>
                    <div className="space-y-2">
                        <div>
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="text-gray-900">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="text-gray-900">{user.phone_number}</p>
                        </div>
                    </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-lg border p-6">
                    <h3 className="text-sm text-gray-500 mb-4">Delivery Address</h3>
                    <div className="space-y-1">
                        <p className="text-gray-900">{address.name}</p>
                        <p className="text-gray-600">
                            {address.house}, {address.street}
                        </p>
                        <p className="text-gray-600">{address.city}</p>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-lg border p-6">
                    <h3 className="text-sm text-gray-500 mb-4">Order Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">
                                ${(order.total_amount - order.delivery_charges).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Charges</span>
                            <span className="text-gray-900">
                                ${order.delivery_charges.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                            <span className="text-gray-900">Total</span>
                            <span className="text-gray-900">
                                ${order.total_amount.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Payment Status</span>
                            <span className="text-gray-900">{order.payment_status}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg border p-6 mb-8">
                <h3 className="text-sm text-gray-500 mb-4">Order Items</h3>
                <table className="w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="pb-3 text-left text-xs text-gray-500 uppercase">
                                Product
                            </th>
                            <th className="pb-3 text-right text-xs text-gray-500 uppercase">
                                Price
                            </th>
                            <th className="pb-3 text-right text-xs text-gray-500 uppercase">
                                Quantity
                            </th>
                            <th className="pb-3 text-right text-xs text-gray-500 uppercase">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="py-3">
                                    {getProductVariantName(item.product_variant_id)}
                                </td>
                                <td className="py-3 text-right">
                                    ${item.mrp.toFixed(2)}
                                </td>
                                <td className="py-3 text-right">{item.quantity}</td>
                                <td className="py-3 text-right">
                                    ${(item.mrp * item.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Order Journey */}
            <div className="bg-white rounded-lg border p-6">
                <h3 className="text-sm text-gray-500 mb-6">Order Journey</h3>
                {statusLogs.map((log, index) => (
                    <div key={log.id} className="flex gap-4 pb-8 last:pb-0">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            {index < statusLogs.length - 1 && (
                                <div className="w-0.5 h-full bg-gray-200 mt-2" />
                            )}
                        </div>
                        <div className="flex-1 pt-1">
                            <div className="flex justify-between mb-1">
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs ${getStatusBadge(
                                        log.status
                                    )}`}
                                >
                                    {log.status.replace('_', ' ')}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {new Date(log.created_at).toLocaleString()}
                                </span>
                            </div>
                            {log.reason && (
                                <p className="text-sm text-gray-600">
                                    Reason: {log.reason}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
