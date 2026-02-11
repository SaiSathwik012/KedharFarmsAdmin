import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import {
    mockSubscriptions,
    mockUsers,
    mockProductVariants,
} from '../../lib/mockData';

export function SubscriptionsView({ onSubscriptionClick }) {
    const [searchQuery, setSearchQuery] = useState('');

    const sortedSubscriptions = useMemo(() => {
        return [...mockSubscriptions]
            .filter(sub => {
                if (
                    searchQuery &&
                    !sub.subscription_no
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                ) {
                    return false;
                }
                return true;
            })
            .sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            );
    }, [searchQuery]);

    const getStatusBadge = status => {
        const colors = {
            ACTIVE: 'bg-green-100 text-green-800',
            PAUSED: 'bg-yellow-100 text-yellow-800',
            CANCELLED: 'bg-red-100 text-red-800',
            EXPIRED: 'bg-gray-100 text-gray-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getUserName = userId => {
        return mockUsers.find(u => u.id === userId)?.name || 'Unknown';
    };

    const getProductVariantName = variantId => {
        return (
            mockProductVariants.find(v => v.id === variantId)?.name ||
            'Unknown'
        );
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-3xl mb-2">View Subscriptions</h1>
                <p className="text-gray-600">
                    All subscriptions sorted by date (ongoing and past)
                </p>
            </div>
        
            {/* Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <div className="max-w-md">
                    <label className="block text-sm mb-2 text-gray-700">
                        Subscription ID
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search subscription number..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Subscription No
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Price / Delivery
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Start Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sortedSubscriptions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No subscriptions found
                                    </td>
                                </tr>
                            ) : (
                                sortedSubscriptions.map(subscription => (
                                    <tr
                                        key={subscription.id}
                                        onClick={() =>
                                            onSubscriptionClick(subscription.id)
                                        }
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {subscription.subscription_no}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {getUserName(subscription.user_id)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {getProductVariantName(
                                                subscription.product_variant_id
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getStatusBadge(
                                                    subscription.current_status
                                                )}`}
                                            >
                                                {subscription.current_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            $
                                            {subscription.price_per_delivery.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(
                                                subscription.start_date
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(
                                                subscription.created_at
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
                Showing {sortedSubscriptions.length} subscription(s)
            </div>
        </div>
    );
}
