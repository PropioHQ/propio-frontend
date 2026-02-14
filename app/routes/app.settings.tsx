import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";
import useMetaTags from "@/lib/meta";
import { LogOut } from "lucide-react";
import { useNavigate, type MetaArgs, type MetaFunction } from "react-router";
import { toast } from "sonner";

export const meta: MetaFunction<MetaArgs> = () => {
    return useMetaTags({ title: "Settings" });
};

export default function Settings() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            logout();
            navigate("/signin");
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div
            className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto"
            data-testid="settings-page"
        >
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">Settings</h1>

            <div className="bg-white rounded-lg border border-gray-200 divide-y">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-2">Account</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Manage your account settings and preferences
                    </p>
                    <Button
                        data-testid="logout-settings-button"
                        onClick={handleLogout}
                        variant="outline"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-2">About Propio</h2>
                    <p className="text-sm text-gray-600 mb-2">Version 1.0.0</p>
                    <p className="text-sm text-gray-600">
                        A simple expense and booking tracker for homestay owners
                    </p>
                </div>
            </div>
        </div>
    );
}
