import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import {
    mockCoupons,
    mockUsers,
    mockSubscriptionPlans,
    mockProductVariants,
} from '../../lib/mockData';

export function CouponManagement() {
    const [coupons, setCoupons] = useState(mockCoupons);
    const [showModal, setShowModal] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [formData, setFormData] = useState({
        user_id: 1,
        subscription_plan_id: 1,
        code: '',
        amount: 0,
        valid_from: '',
        valid_until: '',
    });

    const handleCreate = () => {
        setEditingCoupon(null);
        const now = new Date();
        const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        setFormData({
            user_id: 1,
            subscription_plan_id: 1,
            code: '',
            amount: 0,
            valid_from: now.toISOString().split('T')[0],
            valid_until: nextMonth.toISOString().split('T')[0],
        });

        setShowModal(true);
    };

    const handleEdit = (couponId) => {
        const coupon = coupons.find(c => c.id === couponId);
        if (!coupon) return;

        setEditingCoupon(couponId);
        setFormData({
            user_id: coupon.user_id,
            subscription_plan_id: coupon.subscription_plan_id,
            code: coupon.code,
            amount: coupon.amount,
            valid_from: coupon.valid_from.split('T')[0],
            valid_until: coupon.valid_until.split('T')[0],
        });
        setShowModal(true);
    };

    const handleDelete = (couponId) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            setCoupons(coupons.filter(c => c.id !== couponId));
            alert('Coupon deleted successfully');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.code || formData.amount <= 0) {
            alert('Please fill all required fields with valid values');
            return;
        }

        const codeExists = coupons.some(
            c =>
                c.code.toUpperCase() === formData.code.toUpperCase() &&
                c.id !== editingCoupon
        );

        if (codeExists) {
            alert('Coupon code already exists. Please use a different code.');
            return;
        }

        if (editingCoupon) {
            setCoupons(
                coupons.map(c =>
                    c.id === editingCoupon
                        ? {
                            ...c,
                            user_id: formData.user_id,
                            subscription_plan_id: formData.subscription_plan_id,
                            code: formData.code.toUpperCase(),
                            amount: formData.amount,
                            valid_from: new Date(formData.valid_from).toISOString(),
                            valid_until: new Date(formData.valid_until + 'T23:59:59').toISOString(),
                        }
                        : c
                )
            );
            alert('Coupon updated successfully');
        } else {
            const newCoupon = {
                id: Math.max(...coupons.map(c => c.id), 0) + 1,
                user_id: formData.user_id,
                subscription_plan_id: formData.subscription_plan_id,
                code: formData.code.toUpperCase(),
                amount: formData.amount,
                valid_from: new Date(formData.valid_from).toISOString(),
                valid_until: new Date(formData.valid_until + 'T23:59:59').toISOString(),
            };

            setCoupons([...coupons, newCoupon]);
            alert('Coupon created successfully');
        }

        setShowModal(false);
        setFormData({
            user_id: 1,
            subscription_plan_id: 1,
            code: '',
            amount: 0,
            valid_from: '',
            valid_until: '',
        });
    };

    const getUserName = (userId) =>
        mockUsers.find(u => u.id === userId)?.name || 'Unknown';

    const getSubscriptionPlanName = (planId) => {
        const plan = mockSubscriptionPlans.find(p => p.id === planId);
        if (!plan) return 'Unknown';
        const variant = mockProductVariants.find(v => v.id === plan.product_variant_id);
        return variant?.name || 'Unknown';
    };

    const isExpired = (validUntil) => new Date(validUntil) < new Date();

    const isActive = (validFrom, validUntil) => {
        const now = new Date();
        return new Date(validFrom) <= now && new Date(validUntil) >= now;
    };

    const getCouponStatus = (coupon) => {
        if (isExpired(coupon.valid_until)) {
            return { label: 'Expired', color: 'bg-gray-100 text-gray-800' };
        }
        if (isActive(coupon.valid_from, coupon.valid_until)) {
            return { label: 'Active', color: 'bg-green-100 text-green-800' };
        }
        return { label: 'Scheduled', color: 'bg-blue-100 text-blue-800' };
    };

    return (
        <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl mb-2">Coupon Management</h1>
                    <p className="text-gray-600">
                        Create and manage coupons for users and subscription plans
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-5 h-5" />
                    Create Coupon
                </button>
            </div>

            {/* Coupons Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs text-gray-500">Coupon</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500">User</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500">Plan</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500">Amount</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500">Status</th>
                            <th className="px-6 py-3 text-right text-xs text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map(coupon => {
                            const status = getCouponStatus(coupon);
                            return (
                                <tr key={coupon.id} className="border-t">
                                    <td className="px-6 py-4 font-mono">{coupon.code}</td>
                                    <td className="px-6 py-4">{getUserName(coupon.user_id)}</td>
                                    <td className="px-6 py-4">{getSubscriptionPlanName(coupon.subscription_plan_id)}</td>
                                    <td className="px-6 py-4">${coupon.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${status.color}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEdit(coupon.id)} className="mr-2">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(coupon.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl mb-4">
                            {editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
                        </h3>

                        <input
                            className="w-full mb-3 border p-2"
                            placeholder="Coupon Code"
                            value={formData.code}
                            onChange={e =>
                                setFormData({ ...formData, code: e.target.value.toUpperCase() })
                            }
                            required
                        />

                        <input
                            type="number"
                            className="w-full mb-3 border p-2"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={e =>
                                setFormData({ ...formData, amount: Number(e.target.value) })
                            }
                            required
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                                {editingCoupon ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
