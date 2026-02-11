import { useState } from "react";
import { Eye, EyeOff, Milk, Sprout, Leaf } from "lucide-react";

export function LoginPage({ onLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const adminEmail = "admin@kedharfarms.com";
        const adminPassword = "admin123";

        if (email === adminEmail && password === adminPassword) {
            onLogin(); 
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side */}
            <div className="lg:w-1/2 bg-gradient-to-br from-[#E8F5E9] to-white relative overflow-hidden p-8 lg:p-16 flex items-center justify-center">
                <div className="absolute top-10 right-10 opacity-10">
                    <Leaf className="w-64 h-64 text-[#2E7D32] rotate-12" />
                </div>
                <div className="absolute bottom-20 left-10 opacity-10">
                    <Leaf className="w-48 h-48 text-[#2E7D32] -rotate-45" />
                </div>
                <div className="absolute top-1/3 left-1/4 opacity-5">
                    <Leaf className="w-32 h-32 text-[#2E7D32]" />
                </div>

                <div className="relative z-10 max-w-md">
                    <h1 className="text-4xl lg:text-5xl font-bold text-[#2E7D32] mb-4">
                        Welcome Back
                    </h1>
                    <p className="text-lg text-gray-700 mb-12">
                        Manage subscriptions, deliveries, and farm operations efficiently.
                    </p>

                    <div className="flex gap-8 items-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
                                <Milk className="w-8 h-8 text-[#2E7D32]" strokeWidth={1.5} />
                            </div>
                            <span className="text-xs text-gray-600 font-medium">Dairy</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
                                <Sprout className="w-8 h-8 text-[#2E7D32]" strokeWidth={1.5} />
                            </div>
                            <span className="text-xs text-gray-600 font-medium">
                                Vegetables
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
                                <Leaf className="w-8 h-8 text-[#2E7D32]" strokeWidth={1.5} />
                            </div>
                            <span className="text-xs text-gray-600 font-medium">Fresh</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-[#2E7D32] mb-2">
                                KedharFarms
                            </h2>
                            <p className="text-gray-600 font-medium">Admin Dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-[#E8F5E9] focus:border-[#2E7D32] focus:outline-none"
                                    placeholder="admin@kedharfarms.com"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-[#E8F5E9] focus:border-[#2E7D32] focus:outline-none pr-12"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2E7D32]"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#2E7D32] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1B5E20] transition-colors"
                            >
                                Login to Dashboard
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
