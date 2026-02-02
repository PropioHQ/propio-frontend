import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { propertyApi, reportApi } from "@/lib/api";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Reports() {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(
        dayjs().format("YYYY-MM"),
    );
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProperties();
    }, []);

    useEffect(() => {
        if (selectedProperty && selectedMonth) {
            loadReport();
        }
    }, [selectedProperty, selectedMonth]);

    const loadProperties = async () => {
        try {
            const response = await propertyApi.getAll();
            const props = response.data;
            setProperties(props);
            if (props.length > 0) {
                setSelectedProperty(props[0].property_id);
            }
        } catch (error) {
            toast.error("Failed to load properties");
        }
    };

    const loadReport = async () => {
        setLoading(true);
        try {
            const response = await reportApi.getMonthly(
                selectedProperty,
                selectedMonth,
            );
            setReport(response.data);
        } catch (error) {
            toast.error("Failed to load report");
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (!report) return;

        const rows = [
            ["Monthly Report", report.month],
            [
                "Property",
                properties.find((p) => p.property_id === selectedProperty)
                    ?.name || "",
            ],
            [""],
            ["Summary"],
            ["Total Bookings", report.total_bookings],
            ["Total Expenses", report.total_expenses],
            ["Net Amount", report.net_amount],
            [""],
            ["Bookings"],
            ["Date", "Guest", "Source", "Amount"],
            ...report.bookings.map((b) => [
                b.check_in,
                b.guest_name || "N/A",
                b.booking_source,
                b.amount,
            ]),
            [""],
            ["Expenses"],
            ["Date", "Category", "Vendor", "Amount"],
            ...report.expenses.map((e) => [
                e.date,
                e.category,
                e.vendor_name || "N/A",
                e.amount,
            ]),
        ];

        const csvContent = rows.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `report-${report.month}.csv`;
        a.click();
        toast.success("Report exported!");
    };

    const months = [];
    for (let i = 0; i < 12; i++) {
        months.push(dayjs().subtract(i, "month").format("YYYY-MM"));
    }

    return (
        <div
            className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto"
            data-testid="reports-page"
        >
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">Reports</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <Select
                        value={selectedProperty}
                        onValueChange={setSelectedProperty}
                    >
                        <SelectTrigger
                            data-testid="report-property-select"
                            className="bg-white"
                        >
                            <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                        <SelectContent>
                            {properties.map((prop) => (
                                <SelectItem
                                    key={prop.property_id}
                                    value={prop.property_id}
                                >
                                    {prop.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Select
                        value={selectedMonth}
                        onValueChange={setSelectedMonth}
                    >
                        <SelectTrigger
                            data-testid="report-month-select"
                            className="bg-white"
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {dayjs(month).format("MMMM YYYY")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : report ? (
                <div>
                    <div
                        className="bg-white p-6 rounded-lg border border-gray-200 mb-6"
                        data-testid="report-summary"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Summary</h2>
                            <Button
                                data-testid="export-csv-button"
                                onClick={exportToCSV}
                                variant="outline"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">
                                    Total Bookings
                                </p>
                                <p className="text-2xl font-bold">
                                    ₹{report.total_bookings.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {report.bookings_count} bookings
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">
                                    Total Expenses
                                </p>
                                <p className="text-2xl font-bold">
                                    ₹{report.total_expenses.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {report.expenses_count} expenses
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">
                                    Net Amount
                                </p>
                                <p
                                    className={`text-2xl font-bold ${
                                        report.net_amount >= 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    ₹{report.net_amount.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">
                                Bookings
                            </h3>
                            {report.bookings.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    No bookings this month
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {report.bookings.map((booking) => (
                                        <div
                                            key={booking.booking_id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-gray-600">
                                                {dayjs(booking.check_in).format(
                                                    "MMM D",
                                                )}{" "}
                                                -{" "}
                                                {booking.guest_name || "Guest"}
                                            </span>
                                            <span className="font-medium">
                                                ₹
                                                {booking.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">
                                Expenses
                            </h3>
                            {report.expenses.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    No expenses this month
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {report.expenses.map((expense) => (
                                        <div
                                            key={expense.expense_id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-gray-600 capitalize">
                                                {dayjs(expense.date).format(
                                                    "MMM D",
                                                )}{" "}
                                                - {expense.category}
                                            </span>
                                            <span className="font-medium">
                                                ₹
                                                {expense.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
