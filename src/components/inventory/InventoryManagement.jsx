import React, { useState } from 'react';
import { Edit2, Package } from 'lucide-react';
import { mockProductVariants, mockInventory, mockProducts } from '../../lib/mockData';

export function InventoryManagement() {
    const [inventoryData, setInventoryData] = useState(mockInventory);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);
    const [updateQuantity, setUpdateQuantity] = useState(0);

    const handleUpdate = (inventoryId) => {
        const inventory = inventoryData.find(inv => inv.id === inventoryId);
        if (inventory) {
            setSelectedInventory(inventoryId);
            setUpdateQuantity(inventory.available);
            setShowUpdateModal(true);
        }
    };

    const handleSubmitUpdate = (e) => {
        e.preventDefault();

        if (selectedInventory !== null) {
            setInventoryData(
                inventoryData.map(inv =>
                    inv.id === selectedInventory
                        ? { ...inv, available: updateQuantity }
                        : inv
                )
            );

            alert('Inventory updated successfully!');
            setShowUpdateModal(false);
            setSelectedInventory(null);
            setUpdateQuantity(0);
        }
    };

    const getProductName = (productId) => {
        return mockProducts.find(p => p.id === productId)?.name || 'Unknown';
    };

    const getVariantsByProduct = (productId) => {
        return mockProductVariants.filter(v => v.product_id === productId);
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-3xl mb-2">Inventory Management</h1>
                <p className="text-gray-600">Manage product variant quantities</p>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Variants</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Available</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Committed</th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Total Stock</th>
                                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {inventoryData.map(inventory => {
                                const variants = getVariantsByProduct(inventory.product_id);
                                const totalStock = inventory.available + inventory.committed;
                                const stockLevel =
                                    inventory.available < 20
                                        ? 'low'
                                        : inventory.available < 50
                                            ? 'medium'
                                            : 'high';

                                return (
                                    <tr key={inventory.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {getProductName(inventory.product_id)}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {variants.length} variant(s)
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-900">
                                                    {inventory.available}
                                                </span>
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${stockLevel === 'low'
                                                            ? 'bg-red-100 text-red-800'
                                                            : stockLevel === 'medium'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-green-100 text-green-800'
                                                        }`}
                                                >
                                                    {stockLevel === 'low'
                                                        ? 'Low Stock'
                                                        : stockLevel === 'medium'
                                                            ? 'Medium'
                                                            : 'Good'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {inventory.committed}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {totalStock}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleUpdate(inventory.id)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                Update Quantity
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                Showing {inventoryData.length} product(s)
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <SummaryCard
                    title="Total Available"
                    value={inventoryData.reduce((sum, inv) => sum + inv.available, 0)}
                    color="green"
                />
                <SummaryCard
                    title="Total Committed"
                    value={inventoryData.reduce((sum, inv) => sum + inv.committed, 0)}
                    color="yellow"
                />
                <SummaryCard
                    title="Low Stock Items"
                    value={inventoryData.filter(inv => inv.available < 20).length}
                    color="red"
                />
            </div>

            {/* Update Modal */}
            {showUpdateModal && selectedInventory !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl mb-4">Update Inventory Quantity</h3>

                        <form onSubmit={handleSubmitUpdate}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-2 text-gray-700">
                                        New Quantity *
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={updateQuantity}
                                        onChange={(e) =>
                                            setUpdateQuantity(parseInt(e.target.value) || 0)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowUpdateModal(false);
                                        setSelectedInventory(null);
                                        setUpdateQuantity(0);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Update Quantity
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

/* Summary Card Component */
function SummaryCard({ title, value, color }) {
    const colorMap = {
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        red: 'bg-red-100 text-red-600',
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-2xl text-gray-900 mt-1">{value}</p>
                </div>
                <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorMap[color]}`}
                >
                    <Package className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}
