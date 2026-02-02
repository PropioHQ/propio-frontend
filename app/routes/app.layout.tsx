import ScreenLoader from "@/components/screenloader";
import { useAuth } from "@/contexts/auth.context";
import { PROPERTY_COUNT_KEY } from "@/querykeys";
import PropertyService from "@/services/property.service";
import { useQuery } from "@tanstack/react-query";
import {
    Building2,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    FileText,
    Home,
    LogOut,
    Receipt,
    Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const NavItems = [
    {
        path: "/app/dashboard",
        icon: Home,
        label: "Dashboard",
        color: "#10b981",
    },
    {
        path: "/app/bookings",
        icon: Receipt,
        label: "Bookings",
        color: "#3b82f6",
    },
    {
        path: "/app/earnings",
        icon: Wallet,
        label: "Earnings",
        color: "#db1df6",
    },
    {
        path: "/app/expenses",
        icon: DollarSign,
        label: "Expenses",
        color: "#ef4444",
    },
    {
        path: "/app/properties",
        icon: Building2,
        label: "Properties",
        color: "#8b5cf6",
    },
    {
        path: "/app/reports",
        icon: FileText,
        label: "Reports",
        color: "#f59e0b",
    },
];

export default function AppLayout() {
    const { status, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const isOnboardingPage = useMemo(
        () => location.pathname.includes("/app/onboarding"),
        [location.pathname],
    );

    const { data: propertyCount, isLoading } = useQuery({
        queryKey: [PROPERTY_COUNT_KEY],
        queryFn: PropertyService.getPropertyCount,
        staleTime: Infinity,
    });

    const handleLogout = async () => {
        logout();
        toast.success("Logged out successfully");
    };

    const handleNavigation = async (path: string) => {
        if (location.pathname === path) return;
        navigate(path);
    };

    useEffect(() => {
        if (isLoading) return;

        if (isOnboardingPage && propertyCount > 0) {
            navigate("/app/dashboard", { replace: true });
        }

        if (!isOnboardingPage && propertyCount === 0) {
            navigate("/app/onboarding", { replace: true });
        }
    }, [isLoading, propertyCount, isOnboardingPage]);

    // Show loading only during initial check
    if (status === "loading" || isLoading) {
        return <ScreenLoader />;
    }

    if (status === "unauthenticated") {
        return <Navigate to="/signin" replace />;
    }

    // User is authenticated - render protected content
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {!isOnboardingPage ? (
                <>
                    {/* Desktop Sidebar */}
                    <aside
                        className={`hidden md:flex md:flex-col ${collapsed ? "w-20" : "w-64"} bg-white border-r border-gray-200 transition-all duration-300 relative`}
                    >
                        <div className="p-6 flex items-center justify-between">
                            {!collapsed && (
                                <h1 className="text-2xl font-bold">Propio</h1>
                            )}
                            {collapsed && (
                                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                                    P
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="absolute z-10 -right-3 top-6 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm"
                            data-testid="sidebar-toggle"
                        >
                            {collapsed ? (
                                <ChevronRight className="w-4 h-4" />
                            ) : (
                                <ChevronLeft className="w-4 h-4" />
                            )}
                        </button>

                        <nav className="flex-1 px-4 space-y-1">
                            {NavItems.map((item) => {
                                const Icon = item.icon;
                                const isActive =
                                    location.pathname === item.path;
                                return (
                                    <button
                                        key={item.path}
                                        data-testid={`nav-${item.label.toLowerCase()}`}
                                        onClick={() =>
                                            handleNavigation(item.path)
                                        }
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                        title={collapsed ? item.label : ""}
                                    >
                                        <Icon
                                            className="w-5 h-5"
                                            style={{
                                                color: isActive
                                                    ? "white"
                                                    : item.color,
                                            }}
                                        />
                                        {!collapsed && item.label}
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="p-4 border-t border-gray-200">
                            <button
                                data-testid="logout-button"
                                onClick={handleLogout}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100`}
                                title={collapsed ? "Logout" : ""}
                            >
                                <LogOut className="w-5 h-5 text-red-500" />
                                {!collapsed && "Logout"}
                            </button>
                        </div>
                    </aside>

                    {/* Mobile Bottom Navigation */}
                    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                        <div className="flex justify-around items-center py-2">
                            {NavItems.map((item) => {
                                const Icon = item.icon;
                                const isActive =
                                    location.pathname === item.path;
                                return (
                                    <button
                                        key={item.path}
                                        data-testid={`nav-${item.label.toLowerCase()}-mobile`}
                                        onClick={() =>
                                            handleNavigation(item.path)
                                        }
                                        className={`flex flex-col items-center gap-1 px-3 py-2 text-xs ${
                                            isActive
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        <Icon
                                            className="w-5 h-5"
                                            style={{
                                                color: isActive
                                                    ? item.color
                                                    : undefined,
                                            }}
                                        />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </>
            ) : null}

            {/* Main Content */}
            <main className="flex-1 pb-20 md:pb-0 relative">
                <Outlet />
            </main>
        </div>
    );
}
