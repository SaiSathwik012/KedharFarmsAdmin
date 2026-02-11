import { Milk, Sprout, Leaf } from "lucide-react";

export function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F5E9] to-white">
            <div className="text-center space-y-8">

                {/* Logo */}
                <div className="flex justify-center gap-6 animate-pulse">
                    <Milk className="w-12 h-12 text-[#2E7D32]" strokeWidth={1.5} />
                    <Sprout className="w-12 h-12 text-[#2E7D32]" strokeWidth={1.5} />
                    <Leaf className="w-12 h-12 text-[#2E7D32]" strokeWidth={1.5} />
                </div>

                {/* Brand Name */}
                <h1 className="text-3xl font-bold text-[#2E7D32]">
                    KedharFarms Admin
                </h1>

                {/* Loading Spinner */}
                <div className="flex justify-center">
                    <div className="w-10 h-10 border-4 border-[#E8F5E9] border-t-[#2E7D32] rounded-full animate-spin"></div>
                </div>

                {/* Loading Text */}
                <p className="text-gray-600 font-medium">
                    Preparing your dashboard...
                </p>
            </div>
        </div>
    );
}
