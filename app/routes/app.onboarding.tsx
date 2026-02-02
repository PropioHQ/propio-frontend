import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    COUNTRIES_KEY,
    COUNTRY_STATES_KEY,
    PROPERTY_COUNT_KEY,
} from "@/querykeys";
import ConstantsService from "@/services/constants.service";
import PropertyService from "@/services/property.service";
import { UserRoles } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Onboarding() {
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [propertyData, setPropertyData] = useState({
        name: "",
        city: "",
        state: "",
        country: "",
        role: UserRoles.OWNER,
    });

    const { data: countries } = useQuery({
        queryKey: [COUNTRIES_KEY],
        queryFn: ConstantsService.getCountryNames,
    });

    const { data: states } = useQuery({
        queryKey: [COUNTRY_STATES_KEY, propertyData.country],
        queryFn: () =>
            ConstantsService.getStatesByCountry(propertyData.country),
        enabled: !!propertyData.country,
    });

    const handleSubmit = async () => {
        let { name, city, state, country, role } = propertyData;
        name = name.trim();
        city = city.trim();

        if (!name || !city || !state || !country || !role) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            await PropertyService.addProperty(name, city, state, country, role);

            // Refresh property count
            queryClient.invalidateQueries({
                queryKey: [PROPERTY_COUNT_KEY],
            });

            toast.success("Property added successfully!");
            navigate("/app/dashboard", { replace: true });
        } catch (error) {
            toast.error(error.message || "Failed to add property");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!propertyData.country && countries) {
            setPropertyData({
                ...propertyData,
                country: countries[0],
            });
        }
    }, [countries]);

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

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="property-name">
                                    Property Name *
                                </Label>
                                <Input
                                    id="property-name"
                                    data-testid="property-name-input"
                                    type="text"
                                    placeholder="e.g., Beach Villa, Mountain Cottage"
                                    value={propertyData.name}
                                    onChange={(e) =>
                                        setPropertyData({
                                            ...propertyData,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-2 text-base"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="country">Country *</Label>
                                    <Select
                                        value={propertyData.country}
                                        onValueChange={(value) =>
                                            setPropertyData({
                                                ...propertyData,
                                                country: value,
                                                state: "",
                                            })
                                        }
                                        required
                                    >
                                        <SelectTrigger
                                            data-testid="country-select"
                                            className="mt-2"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent
                                            position="popper"
                                            side="bottom"
                                            align="start"
                                            sideOffset={4}
                                            className="max-h-64 overflow-y-auto"
                                        >
                                            {countries.map((country) => (
                                                <SelectItem
                                                    key={country}
                                                    value={country}
                                                >
                                                    {country}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="state">State *</Label>
                                    <Select
                                        value={propertyData.state}
                                        onValueChange={(value) =>
                                            setPropertyData({
                                                ...propertyData,
                                                state: value,
                                            })
                                        }
                                        disabled={!propertyData.country}
                                        required
                                    >
                                        <SelectTrigger
                                            data-testid="state-select"
                                            className="mt-2"
                                        >
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent
                                            position="popper"
                                            side="bottom"
                                            align="start"
                                            sideOffset={4}
                                            className="max-h-64 overflow-y-auto"
                                        >
                                            {states.map((state) => (
                                                <SelectItem
                                                    key={state}
                                                    value={state}
                                                >
                                                    {state}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="city">City/Town *</Label>
                                    <Input
                                        id="city"
                                        data-testid="city-input"
                                        type="text"
                                        placeholder="e.g., Goa, Manali"
                                        value={propertyData.city}
                                        onChange={(e) =>
                                            setPropertyData({
                                                ...propertyData,
                                                city: e.target.value,
                                            })
                                        }
                                        required
                                        className="mt-2 text-base"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="role">Role *</Label>
                                    <Select
                                        value={propertyData.role}
                                        onValueChange={(value) =>
                                            setPropertyData({
                                                ...propertyData,
                                                role: value as UserRoles,
                                            })
                                        }
                                        required
                                    >
                                        <SelectTrigger
                                            data-testid="role-select"
                                            className="mt-2"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent
                                            position="popper"
                                            side="bottom"
                                            align="start"
                                            sideOffset={4}
                                            className="max-h-64 overflow-y-auto"
                                        >
                                            {Object.values(UserRoles).map(
                                                (role) => (
                                                    <SelectItem
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                    className="flex-1"
                                    disabled={loading}
                                >
                                    Back
                                </Button>
                                <Button
                                    data-testid="save-property-button"
                                    onClick={handleSubmit}
                                    className="flex-1 bg-gray-900 hover:bg-gray-800"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            {"Saving"}{" "}
                                            <LoaderCircle className="animate-spin" />
                                        </>
                                    ) : (
                                        "Save & Continue"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
