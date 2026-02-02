import { authApi } from "@/lib/api";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function AuthCallback() {
    const navigate = useNavigate();
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const processSession = async () => {
            try {
                const hash = window.location.hash;
                const params = new URLSearchParams(hash.substring(1));
                const sessionId = params.get("session_id");

                if (!sessionId) {
                    toast.error("Invalid session");
                    navigate("/signin");
                    return;
                }

                const response = await authApi.googleSession(sessionId);
                const user = response.data;

                window.history.replaceState(
                    {},
                    document.title,
                    "/app/dashboard",
                );

                navigate("/app/dashboard", { replace: true, state: { user } });
            } catch (error) {
                console.error("Auth callback error:", error);
                toast.error("Authentication failed");
                navigate("/signin");
            }
        };

        processSession();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-lg">Signing you in...</p>
            </div>
        </div>
    );
}
