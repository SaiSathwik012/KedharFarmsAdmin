// Mock data for the admin panel

// USERS
export const mockUsers = [
    { id: 1, name: 'John Doe', phone_number: '+1234567890', is_active: true },
    { id: 2, name: 'Jane Smith', phone_number: '+1234567891', is_active: true },
    { id: 3, name: 'Bob Johnson', phone_number: '+1234567892', is_active: true },
];

// ADMIN USERS ✅ FIX
export const mockAdminUsers = [
    {
        id: 1,
        username: 'superadmin',
        password: 'admin123',
        role: 'super_admin',
        is_active: true,
    },
    {
        id: 2,
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        is_active: true,
    },
];

// ADDRESSES
export const mockAddresses = [
    { id: 1, user_id: 1, name: 'Home', house: '123', street: 'Main St', city: 'New York', is_active: true, is_default: true },
    { id: 2, user_id: 2, name: 'Office', house: '456', street: 'Park Ave', city: 'Boston', is_active: true, is_default: true },
    { id: 3, user_id: 3, name: 'Home', house: '789', street: 'Oak St', city: 'Chicago', is_active: true, is_default: true },
];

// CATEGORIES
export const mockCategories = [
    { id: 1, name: 'Dairy', description: 'Fresh dairy products', is_active: true, is_opening_soon: false },
    { id: 2, name: 'Beverages', description: 'Drinks and juices', is_active: true, is_opening_soon: false },
    { id: 3, name: 'Bakery', description: 'Fresh baked goods', is_active: true, is_opening_soon: true },
];

// PRODUCTS
export const mockProducts = [
    { id: 1, category_id: 1, name: 'Milk', base_unit: 'liter', is_active: true },
    { id: 2, category_id: 1, name: 'Yogurt', base_unit: 'gram', is_active: true },
    { id: 3, category_id: 2, name: 'Orange Juice', base_unit: 'liter', is_active: true },
    { id: 4, category_id: 3, name: 'Bread', base_unit: 'piece', is_active: true },
];

// PRODUCT VARIANTS
export const mockProductVariants = [
    { id: 1, product_id: 1, name: 'Whole Milk 1L', unit_quantity: 1, price: 3.99, is_active: true, is_loose_allowed: false },
    { id: 2, product_id: 1, name: 'Whole Milk 500ml', unit_quantity: 0.5, price: 2.49, is_active: true, is_loose_allowed: false },
    { id: 3, product_id: 2, name: 'Greek Yogurt 500g', unit_quantity: 500, price: 4.99, is_active: true, is_loose_allowed: true },
];

// INVENTORY
export const mockInventory = [
    { id: 1, product_id: 1, available: 100, committed: 20 },
    { id: 2, product_id: 2, available: 50, committed: 10 },
];

export const mockOrders = [
    {
        id: 1,
        order_no: 'ORD-001',
        user_id: 1,
        address_id: 1,
        current_status: 'PROCESSING',
        delivery_charges: 5,            // ✅ ADD THIS
        total_amount: 23.96,
        payment_status: 'COMPLETED',    // ✅ ADD THIS
        created_at: '2024-01-14T10:00:00Z',
    },
    {
        id: 2,
        order_no: 'ORD-002',
        user_id: 2,
        address_id: 2,
        current_status: 'OUT_FOR_DELIVERY',
        delivery_charges: 5,            // ✅ ADD
        total_amount: 10.99,
        payment_status: 'COMPLETED',    // ✅ ADD
        created_at: '2024-01-16T12:00:00Z',
    },
];

// ORDER ITEMS
export const mockOrderItems = [
    { id: 1, order_id: 1, product_variant_id: 1, mrp: 3.99, quantity: 2 },
];

// ORDER STATUS LOGS
export const mockOrderStatusLogs = [
    { id: 1, order_id: 1, status: 'PROCESSING', created_at: '2024-01-14T10:00:00Z' },
    { id: 2, order_id: 1, status: 'DELIVERED', created_at: '2024-01-15T14:00:00Z' },
];

// SUBSCRIPTION PLANS ✅ FIX
export const mockSubscriptionPlans = [
    {
        id: 1,
        product_variant_id: 1,
        price_per_delivery: 3.49,
        is_active: true,
    },
];

// SUBSCRIPTIONS
export const mockSubscriptions = [
    {
        id: 1,
        subscription_no: 'SUB-001',
        user_id: 1,
        subscription_plan_id: 1,
        product_variant_id: 1,
        current_status: 'ACTIVE',
        start_date: '2024-01-10',
        price_per_delivery: 3.49,
        payment_status: 'COMPLETED',
        amount_paid: 100,
        created_at: '2024-01-09T10:00:00Z',
    },
];

// SUBSCRIPTION DELIVERIES ✅ FIX
export const mockSubscriptionDeliveries = [
    {
        id: 1,
        subscription_id: 1,
        subscription_no: 'SUB-001',
        user_id: 1,
        product_variant_id: 1,
        delivery_date: '2024-01-20',
        status: 'PROCESSING',
    },
    {
        id: 2,
        subscription_id: 1,
        subscription_no: 'SUB-001',
        user_id: 1,
        product_variant_id: 1,
        delivery_date: '2024-01-21',
        status: 'OUT_FOR_DELIVERY',
    },
];

// COUPONS
export const mockCoupons = [
    {
        id: 1,
        user_id: 1,
        subscription_plan_id: 1,
        code: 'WELCOME10',
        amount: 10,
        valid_from: '2024-01-01',
        valid_until: '2024-12-31',
    },
];
