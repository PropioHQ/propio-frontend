import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { bookingApi, expenseApi, locationApi, propertyApi } from "@/lib/api";
import dayjs from "dayjs";
import { Loader2, MapPin, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const COUNTRIES = ["India", "United States"];

export default function Properties() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [states, setStates] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        city: "",
        state: "",
        country: "India",
    });

    useEffect(() => {
        loadProperties();
    }, []);

    useEffect(() => {
        if (formData.country) {
            loadStates(formData.country);
        }
    }, [formData.country]);

    const loadStates = async (country) => {
        try {
            const response = await locationApi.getStates(country);
            setStates(response.data);
        } catch (error) {
            console.error("Failed to load states:", error);
        }
    };

    const loadProperties = async () => {
        try {
            const response = await propertyApi.getAll();
            const props = response.data;
            setProperties(props);
            await loadStats(props);
        } catch (error) {
            toast.error("Failed to load properties");
        } finally {
            setPageLoading(false);
        }
    };

    const loadStats = async (props) => {
        const currentMonth = dayjs().format("YYYY-MM");
        const statsData = {};

        for (const prop of props) {
            try {
                const [bookingsRes, expensesRes] = await Promise.all([
                    bookingApi.getAll(prop.property_id),
                    expenseApi.getAll(prop.property_id),
                ]);

                const monthBookings = bookingsRes.data.filter((b) =>
                    b.check_in.startsWith(currentMonth),
                );
                const monthExpenses = expensesRes.data.filter((e) =>
                    e.date.startsWith(currentMonth),
                );

                const totalBookings = monthBookings.reduce(
                    (sum, b) => sum + b.amount,
                    0,
                );
                const totalExpenses = monthExpenses.reduce(
                    (sum, e) => sum + e.amount,
                    0,
                );

                statsData[prop.property_id] = {
                    bookings: totalBookings,
                    expenses: totalExpenses,
                    net: totalBookings - totalExpenses,
                };
            } catch (error) {
                statsData[prop.property_id] = {
                    bookings: 0,
                    expenses: 0,
                    net: 0,
                };
            }
        }

        setStats(statsData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.city.trim() ||
            !formData.state ||
            !formData.country
        ) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            await propertyApi.create(formData);
            toast.success("Property added successfully!");
            setIsDialogOpen(false);
            setFormData({ name: "", city: "", state: "", country: "India" });
            loadProperties();
        } catch (error) {
            toast.error(
                error.response?.data?.detail || "Failed to add property",
            );
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-gray-900" />
            </div>
        );
    }

    return (
        <div
            className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto"
            data-testid="properties-page"
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold">Properties</h1>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                data-testid="properties-grid"
            >
                {properties.map((property) => {
                    const propStats = stats[property.property_id] || {
                        bookings: 0,
                        expenses: 0,
                        net: 0,
                    };
                    return (
                        <div
                            key={property.property_id}
                            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    {property.name}
                                </h3>
                                <div className="flex items-start gap-1 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>
                                        {property.city}, {property.state},{" "}
                                        {property.country}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4 py-3 border-t border-b">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        This Month Bookings
                                    </span>
                                    <span className="font-medium text-green-600">
                                        ₹{propStats.bookings.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        This Month Expenses
                                    </span>
                                    <span className="font-medium text-red-600">
                                        ₹{propStats.expenses.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-t">
                                    \n{" "}
                                    <span className="font-medium">
                                        Net Amount
                                    </span>
                                    <span
                                        className={`font-bold ${propStats.net >= 0 ? "text-green-600" : "text-red-600"}`}
                                    >
                                        ₹{propStats.net.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <Button
                                data-testid={`view-details-${property.property_id}`}
                                onClick={() => navigate("/app/reports")}
                                variant="outline"
                                className="w-full"
                            >
                                View Details
                            </Button>
                        </div>
                    );
                })}

                {/* Add New Property Card */}
                <div
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center min-h-[280px]"
                    data-testid="add-property-card"
                >
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                        Add New Property
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                        Click to add another property
                    </p>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Property</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <Label htmlFor="prop_name">Property Name *</Label>
                            <Input
                                id="prop_name"
                                data-testid="property-name-field"
                                type="text"
                                required
                                placeholder="e.g., Beach Villa"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="country">Country *</Label>
                            <Select
                                value={formData.country}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        country: value,
                                        state: "",
                                    })
                                }
                            >
                                <SelectTrigger
                                    data-testid="country-select"
                                    className="mt-1"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {COUNTRIES.map((country) => (
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
                            <Label htmlFor="state">State / UT *</Label>
                            <Select
                                value={formData.state}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, state: value })
                                }
                                disabled={!formData.country}
                            >
                                <SelectTrigger
                                    data-testid="state-select"
                                    className="mt-1"
                                >
                                    <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent>
                                    {states.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="city">City / Town *</Label>
                            <Input
                                id="city"
                                data-testid="city-input"
                                type="text"
                                required
                                placeholder="e.g., Goa"
                                value={formData.city}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        city: e.target.value,
                                    })
                                }
                                className="mt-1"
                            />
                        </div>

                        <Button
                            type="submit"
                            data-testid="save-property-btn"
                            className="w-full bg-gray-900 hover:bg-gray-800"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Property"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
