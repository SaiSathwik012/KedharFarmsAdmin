import { useState } from "react";
import { LoginPage } from "./components/auth/LoginPage";
import { LoadingScreen } from "./components/auth/LoadingScreen";
import { Layout } from "./components/layout";
import { OrdersView } from "./components/orders/OrdersView";
import { OrderDetails } from "./components/orders/OrderDetails";
import { OngoingOrders } from "./components/orders/OngoingOrders";
import { SubscriptionsView } from "./components/subscriptions/SubscriptionsView";
import { SubscriptionDetails } from "./components/subscriptions/SubscriptionDetails";
import { SubscriptionDeliveries } from "./components/subscriptions/SubscriptionDeliveries";
import { UserManagement } from "./components/users/UserManagement";
import { ProductManagement } from "./components/products/ProductManagement";
import { InventoryManagement } from "./components/inventory/InventoryManagement";
import { CouponManagement } from "./components/cupons/CouponManagement";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("ongoing");
  const [ongoingSubTab, setOngoingSubTab] = useState("orders");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);

  // 🔐 Login Handler
  const handleLogin = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 2000); // 2 seconds loading animation
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show login page first
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // ===============================
  // Dashboard Logic Below
  // ===============================

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedOrderId(null);
    setSelectedSubscriptionId(null);
  };

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleBackFromOrderDetails = () => {
    setSelectedOrderId(null);
  };

  const handleSubscriptionClick = (subscriptionId) => {
    setSelectedSubscriptionId(subscriptionId);
  };

  const handleBackFromSubscriptionDetails = () => {
    setSelectedSubscriptionId(null);
  };

  const renderContent = () => {
    if (
      selectedOrderId !== null &&
      (activeTab === "orders" || activeTab === "ongoing")
    ) {
      return (
        <OrderDetails
          orderId={selectedOrderId}
          onBack={handleBackFromOrderDetails}
        />
      );
    }

    if (
      selectedSubscriptionId !== null &&
      (activeTab === "subscriptions" || activeTab === "ongoing")
    ) {
      return (
        <SubscriptionDetails
          subscriptionId={selectedSubscriptionId}
          onBack={handleBackFromSubscriptionDetails}
        />
      );
    }

    switch (activeTab) {
      case "ongoing":
        return (
          <div>
            <div className="border-b border-gray-200 bg-white px-8 pt-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setOngoingSubTab("orders")}
                  className={`px-4 py-2 border-b-2 transition-colors ${ongoingSubTab === "orders"
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-600"
                    }`}
                >
                  Ongoing Orders
                </button>

                <button
                  onClick={() => setOngoingSubTab("deliveries")}
                  className={`px-4 py-2 border-b-2 transition-colors ${ongoingSubTab === "deliveries"
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-600"
                    }`}
                >
                  Subscription Deliveries
                </button>
              </div>
            </div>

            {ongoingSubTab === "orders" ? (
              <OngoingOrders onOrderClick={handleOrderClick} />
            ) : (
              <SubscriptionDeliveries
                onSubscriptionClick={handleSubscriptionClick}
              />
            )}
          </div>
        );

      case "orders":
        return <OrdersView onOrderClick={handleOrderClick} />;

      case "subscriptions":
        return (
          <SubscriptionsView
            onSubscriptionClick={handleSubscriptionClick}
          />
        );

      case "users":
        return <UserManagement />;

      case "products":
        return <ProductManagement />;

      case "inventory":
        return <InventoryManagement />;

      case "coupons":
        return <CouponManagement />;

      default:
        return <div className="p-8">Select a tab</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      {renderContent()}
    </Layout>
  );
}
