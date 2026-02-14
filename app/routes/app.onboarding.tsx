import PropertyForm from "@/components/propertyform";
import { Button } from "@/components/ui/button";
import useMetaTags from "@/lib/meta";
import { useState } from "react";
import { useNavigate, type MetaArgs, type MetaFunction } from "react-router";

export const meta: MetaFunction<MetaArgs> = () => {
    return useMetaTags({ title: "Onboarding" });
};

export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-2xl">
                {step === 1 && (
                    <div className="text-center space-y-6">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                                Welcome to Propio
                            </h1>
                            <p className="text-lg text-gray-600 max-w-xl mx-auto">
                                Track your property bookings, earnings and
                                expenses in one place. Simple, fast, and
                                designed for homestay and short-term rental
                                owners.
                            </p>
                        </div>
                        <Button
                            data-testid="get-started-button"
                            onClick={() => setStep(2)}
                            size="lg"
                            className="text-lg px-8 py-6"
                        >
                            Add Your First Property
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-3xl font-semibold mb-6">
                            Add Property
                        </h2>
                        <PropertyForm
                            onBack={() => setStep(1)}
                            onSuccess={() => {
                                navigate("/app/dashboard", { replace: true });
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
