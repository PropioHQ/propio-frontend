import ScreenLoader from "@/components/screenloader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";
import { cn } from "@/lib/utils";
import { PROPERTY_COUNT_KEY } from "@/querykeys";
import PropertyService from "@/services/property.service";
import { useQuery } from "@tanstack/react-query";
import {
    Archive,
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
    },
    {
        path: "/app/bookings",
        icon: Receipt,
        label: "Bookings",
    },
    {
        path: "/app/earnings",
        icon: Wallet,
        label: "Earnings",
    },
    {
        path: "/app/expenses",
        icon: DollarSign,
        label: "Expenses",
    },
    {
        path: "/app/properties",
        icon: Building2,
        label: "Properties",
    },
    {
        path: "/app/reports",
        icon: FileText,
        label: "Reports",
    },
    {
        path: "/app/vault",
        icon: Archive,
        label: "Vault",
    },
];

export default function AppLayout() {
    const { status, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [initialized, setInitialized] = useState(false);

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

        setInitialized(true);
    }, [isLoading, propertyCount, isOnboardingPage]);

    // Show loading only during initial check
    if (status === "loading" || isLoading || !initialized) {
        return <ScreenLoader />;
    }

    if (status === "unauthenticated") {
        return <Navigate to="/signin" replace />;
    }

    // User is authenticated - render protected content
    return (
        <div className="h-screen flex flex-col md:flex-row">
            {!isOnboardingPage && !isLoading ? (
                <>
                    {/* Desktop Sidebar */}
                    <aside
                        className={cn(
                            "hidden md:flex md:flex-col relative bg-white border-r border-gray-200 transition-all duration-300",
                            collapsed ? "w-20" : "w-64",
                        )}
                    >
                        <div className="p-6 flex items-center gap-1">
                            <img
                                src={
                                    collapsed
                                        ? "/assets/logo-x.png"
                                        : "/assets/logo-light.png"
                                }
                                className={cn("h-7 w-auto", {
                                    "rounded-full": collapsed,
                                })}
                            />
                            <p className="mb-4 text-xs text-gray-500 font-medium">
                                beta
                            </p>
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
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-transform",
                                            isActive
                                                ? "bg-primary text-white"
                                                : "text-gray-700 hover:bg-gray-100",
                                        )}
                                        title={collapsed ? item.label : ""}
                                    >
                                        <Icon
                                            className={cn(
                                                "w-4 h-4",
                                                isActive
                                                    ? "text-white"
                                                    : "text-gray-600",
                                            )}
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
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                                title={collapsed ? "Logout" : ""}
                            >
                                <LogOut className="w-4 h-4 text-red-500" />
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
                                    <Button
                                        key={item.path}
                                        data-testid={`nav-${item.label.toLowerCase()}-mobile`}
                                        onClick={() =>
                                            handleNavigation(item.path)
                                        }
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "p-2 rounded-lg",
                                            isActive
                                                ? "text-brand bg-blue-50"
                                                : "text-gray-500",
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                "w-4 h-4",
                                                isActive
                                                    ? "text-brand"
                                                    : "text-gray-600",
                                            )}
                                        />
                                    </Button>
                                );
                            })}
                        </div>
                    </nav>
                </>
            ) : null}

            {/* Main Content */}
            <main className="flex-1 pb-20 md:pb-0 relative max-h-screen overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
