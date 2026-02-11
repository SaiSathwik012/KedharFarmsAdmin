import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import {
    mockProducts,
    mockProductVariants,
    mockSubscriptionPlans,
    mockCategories,
} from '../../lib/mockData';

export function ProductManagement() {
    const [activeTab, setActiveTab] = useState('products');
    const [showProductModal, setShowProductModal] = useState(false);
    const [showVariantModal, setShowVariantModal] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [productForm, setProductForm] = useState({
        name: '',
        category_id: 1,
        base_unit: 'liter',
    });

    const [variantForm, setVariantForm] = useState({
        product_id: 1,
        name: '',
        unit_quantity: 0,
        price: 0,
        is_loose_allowed: false,
    });

    const [planForm, setPlanForm] = useState({
        product_variant_id: 1,
        price_per_delivery: 0,
    });

    const handleCreateProduct = (e) => {
        e.preventDefault();
        alert(`Product "${productForm.name}" created successfully!`);
        setShowProductModal(false);
        setProductForm({ name: '', category_id: 1, base_unit: 'liter' });
    };

    const handleCreateVariant = (e) => {
        e.preventDefault();
        alert(`Product variant "${variantForm.name}" created successfully!`);
        setShowVariantModal(false);
        setVariantForm({
            product_id: 1,
            name: '',
            unit_quantity: 0,
            price: 0,
            is_loose_allowed: false,
        });
    };

    const handleCreatePlan = (e) => {
        e.preventDefault();
        alert('Subscription plan created successfully!');
        setShowPlanModal(false);
        setPlanForm({ product_variant_id: 1, price_per_delivery: 0 });
    };

    // Filter data based on search term
    const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredVariants = mockProductVariants.filter(variant =>
        variant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPlans = mockSubscriptionPlans.filter(plan => {
        const variant = mockProductVariants.find(v => v.id === plan.product_variant_id);
        return variant?.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Product Management</h1>
                <p className="text-gray-600">
                    Manage products, variants, and subscription plans
                </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Filter className="w-5 h-5" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
                {['products', 'variants', 'plans'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-shrink-0 px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                            ? 'border-blue-600 text-blue-600 font-medium'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {tab === 'products'
                            ? 'Products'
                            : tab === 'variants'
                                ? 'Product Variants'
                                : 'Subscription Plans'}
                    </button>
                ))}
            </div>

            {/* PRODUCTS */}
            {activeTab === 'products' && (
                <>
                    <div className="mb-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            {filteredProducts.length} products found
                        </div>
                        <button
                            onClick={() => setShowProductModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Onboard New Product</span>
                            <span className="sm:hidden">Add Product</span>
                        </button>
                    </div>

                    <ResponsiveTable>
                        <thead>
                            <tr>
                                <TableHeader>ID</TableHeader>
                                <TableHeader>Product Name</TableHeader>
                                <TableHeader>Category</TableHeader>
                                <TableHeader>Base Unit</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => {
                                const category = mockCategories.find(
                                    c => c.id === product.category_id
                                );

                                return (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{category?.name || 'Unknown'}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {product.base_unit}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge active={product.is_active} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </tbody>
                    </ResponsiveTable>
                </>
            )}

            {/* VARIANTS */}
            {activeTab === 'variants' && (
                <>
                    <div className="mb-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            {filteredVariants.length} variants found
                        </div>
                        <button
                            onClick={() => setShowVariantModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Onboard Product Variant</span>
                            <span className="sm:hidden">Add Variant</span>
                        </button>
                    </div>

                    <ResponsiveTable>
                        <thead>
                            <tr>
                                <TableHeader>ID</TableHeader>
                                <TableHeader>Variant Name</TableHeader>
                                <TableHeader>Unit Quantity</TableHeader>
                                <TableHeader>Price</TableHeader>
                                <TableHeader>Loose Allowed</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVariants.map(variant => (
                                <TableRow key={variant.id}>
                                    <TableCell>{variant.id}</TableCell>
                                    <TableCell className="font-medium">{variant.name}</TableCell>
                                    <TableCell>{variant.unit_quantity}</TableCell>
                                    <TableCell className="font-medium">
                                        ${variant.price.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variant.is_loose_allowed
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {variant.is_loose_allowed ? 'Yes' : 'No'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge active={variant.is_active} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <button className="p-1 hover:bg-gray-100 rounded">
                                                <Edit className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button className="p-1 hover:bg-gray-100 rounded">
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </ResponsiveTable>
                </>
            )}

            {/* PLANS */}
            {activeTab === 'plans' && (
                <>
                    <div className="mb-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            {filteredPlans.length} plans found
                        </div>
                        <button
                            onClick={() => setShowPlanModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Create Subscription Plan</span>
                            <span className="sm:hidden">Add Plan</span>
                        </button>
                    </div>

                    <ResponsiveTable>
                        <thead>
                            <tr>
                                <TableHeader>ID</TableHeader>
                                <TableHeader>Product Variant</TableHeader>
                                <TableHeader>Price per Delivery</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlans.map(plan => {
                                const variant = mockProductVariants.find(
                                    v => v.id === plan.product_variant_id
                                );

                                return (
                                    <TableRow key={plan.id}>
                                        <TableCell>{plan.id}</TableCell>
                                        <TableCell className="font-medium">
                                            {variant?.name || 'Unknown'}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            ${plan.price_per_delivery.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge active={plan.is_active} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </tbody>
                    </ResponsiveTable>
                </>
            )}

            {/* MODALS */}
            {showProductModal && (
                <Modal title="Onboard New Product" onClose={() => setShowProductModal(false)}>
                    <form onSubmit={handleCreateProduct} className="space-y-4">
                        <Input
                            label="Product Name"
                            value={productForm.name}
                            onChange={e =>
                                setProductForm({ ...productForm, name: e.target.value })
                            }
                            required
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Create Product
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowProductModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {showVariantModal && (
                <Modal title="Onboard Product Variant" onClose={() => setShowVariantModal(false)}>
                    <form onSubmit={handleCreateVariant} className="space-y-4">
                        <Input
                            label="Variant Name"
                            value={variantForm.name}
                            onChange={e =>
                                setVariantForm({ ...variantForm, name: e.target.value })
                            }
                            required
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Create Variant
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowVariantModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {showPlanModal && (
                <Modal title="Create Subscription Plan" onClose={() => setShowPlanModal(false)}>
                    <form onSubmit={handleCreatePlan} className="space-y-4">
                        <Input
                            label="Price per Delivery"
                            type="number"
                            min="0"
                            step="0.01"
                            value={planForm.price_per_delivery}
                            onChange={e =>
                                setPlanForm({
                                    ...planForm,
                                    price_per_delivery: parseFloat(e.target.value) || 0,
                                })
                            }
                            required
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Create Plan
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPlanModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

/* ---------- Responsive Table Components ---------- */

function ResponsiveTable({ children }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    {children}
                </table>
            </div>
        </div>
    );
}

function TableHeader({ children }) {
    return (
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
            {children}
        </th>
    );
}

function TableRow({ children }) {
    return (
        <tr className="hover:bg-gray-50 transition-colors border-t border-gray-100">
            {children}
        </tr>
    );
}

function TableCell({ children, className = '' }) {
    return (
        <td className={`px-4 py-3 whitespace-nowrap text-sm ${className}`}>
            {children}
        </td>
    );
}

function StatusBadge({ active }) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${active
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
                }`}
        >
            <span className={`w-2 h-2 rounded-full mr-1 ${active ? 'bg-green-500' : 'bg-red-500'}`} />
            {active ? 'Active' : 'Inactive'}
        </span>
    );
}

function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

function Input({ label, type = 'text', ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type={type}
                {...props}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
}