import PropertySelector from "@/components/propertyselector";
import ScreenLoader from "@/components/screenloader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    BOOKING_MONTHLY_STATS_KEY,
    EARNING_MONTHLY_STATS_KEY,
    EXPENSE_MONTHLY_STATS_KEY,
    PROPERTIES_KEY,
} from "@/querykeys";
import BookingService from "@/services/booking.service";
import EarningService from "@/services/earning.service";
import ExpenseService from "@/services/expense.service";
import PropertyService from "@/services/property.service";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
    BarChart3,
    Building2,
    ChevronRight,
    DollarSign,
    Home,
    PieChart,
    Receipt,
    TrendingDown,
    TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
    const navigate = useNavigate();

    const [selectedProperty, setSelectedProperty] = useState<"ALL" | string>(
        "ALL",
    );
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [showExpenseForm, setShowExpenseForm] = useState(false);

    const { data: properties = [], isLoading: propertiesLoading } = useQuery({
        queryKey: [PROPERTIES_KEY],
        queryFn: PropertyService.getProperties,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const currentYear: number = useMemo(() => dayjs().get("year"), []);
    const currentMonth: number = useMemo(() => dayjs().get("month") + 1, []);

    const propertyIds: string[] = useMemo(() => {
        if (selectedProperty === "ALL") {
            return properties.map((p) => p._id);
        }

        return [selectedProperty];
    }, [selectedProperty, properties]);

    const { data: bookingStats, isLoading: bookingStatsLoading } = useQuery({
        queryKey: [
            BOOKING_MONTHLY_STATS_KEY,
            currentYear,
            currentMonth,
            propertyIds,
        ],
        queryFn: () =>
            BookingService.getMonthlyStats(
                propertyIds,
                currentMonth,
                currentYear,
            ),
        enabled: !!selectedProperty && !propertiesLoading,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const { data: expenseStats, isLoading: expenseStatsLoading } = useQuery({
        queryKey: [
            EXPENSE_MONTHLY_STATS_KEY,
            currentYear,
            currentMonth,
            propertyIds,
        ],
        queryFn: () =>
            ExpenseService.getMonthlyStats(
                propertyIds,
                currentMonth,
                currentYear,
            ),
        enabled: !!selectedProperty && !propertiesLoading,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const { data: earningStats, isLoading: earningStatsLoading } = useQuery({
        queryKey: [
            EARNING_MONTHLY_STATS_KEY,
            currentYear,
            currentMonth,
            propertyIds,
        ],
        queryFn: () =>
            EarningService.getMonthlyStats(
                propertyIds,
                currentMonth,
                currentYear,
            ),
        enabled: !!selectedProperty && !propertiesLoading,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const netProfit = useMemo(() => {
        if (!expenseStats?.totalAmount || !earningStats?.totalAmount) {
            return 0;
        }
        return earningStats.totalAmount - expenseStats.totalAmount;
    }, [expenseStats, earningStats]);

    // Property performance (when viewing all)
    const propertyPerformance = useMemo(() => {
        const bookingsPropertyWise = bookingStats?.propertyWise;
        const expensesPropertyWise = expenseStats?.propertyWise;
        const earningsPropertyWise = earningStats?.propertyWise;

        if (
            !bookingsPropertyWise ||
            !expensesPropertyWise ||
            !earningsPropertyWise
        ) {
            return [];
        }

        return properties.map((p) => ({
            _id: p._id,
            name: p.name,
            bookings: bookingsPropertyWise[p._id],
            expenses: expensesPropertyWise[p._id],
            earnings: earningsPropertyWise[p._id],
            netProfit:
                earningsPropertyWise[p._id] - expensesPropertyWise[p._id],
        }));
    }, [expenseStats, earningStats]);

    if (
        propertiesLoading ||
        bookingStatsLoading ||
        earningStatsLoading ||
        expenseStatsLoading
    ) {
        return <ScreenLoader />;
    }

    return (
        <div
            className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
            data-testid="dashboard-page"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {dayjs()
                            .set("month", currentMonth - 1)
                            .set("year", currentYear)
                            .format("MMMM YYYY")}{" "}
                        Overview
                    </p>
                </div>

                <PropertySelector
                    properties={[
                        { _id: "ALL", name: "All Properties" },
                        ...properties,
                    ]}
                    value={selectedProperty}
                    onSelect={setSelectedProperty}
                />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 mb-6">
                <Button
                    data-testid="add-booking-dashboard-btn"
                    onClick={() => setShowBookingForm(true)}
                    className="flex-1 sm:flex-none bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                >
                    <Receipt className="w-4 h-4 mr-2" />
                    Add Booking
                </Button>
                <Button
                    data-testid="add-expense-dashboard-btn"
                    onClick={() => setShowExpenseForm(true)}
                    className="flex-1 sm:flex-none bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
                >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Add Expense
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    data-testid="bookings-card"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-600">
                                Total Bookings
                            </p>
                        </div>
                        {/* {bookingsChange != 0 && (
                            <div
                                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                                    bookingsChange > 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {bookingsChange > 0 ? (
                                    <ArrowUpRight className="w-3 h-3" />
                                ) : (
                                    <ArrowDownRight className="w-3 h-3" />
                                )}
                                {Math.abs(bookingsChange)}%
                            </div>
                        )} */}
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                        ₹{bookingStats?.totalAmount?.toLocaleString() || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {bookingStats?.totalCount || 0} booking(s) this month
                    </p>
                </div>

                <div
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    data-testid="expenses-card"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                <TrendingDown className="w-5 h-5 text-red-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-600">
                                Total Expenses
                            </p>
                        </div>
                        {/* {expensesChange != 0 && (
                            <div
                                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                                    expensesChange < 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {expensesChange < 0 ? (
                                    <ArrowDownRight className="w-3 h-3" />
                                ) : (
                                    <ArrowUpRight className="w-3 h-3" />
                                )}
                                {Math.abs(expensesChange)}%
                            </div>
                        )} */}
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                        ₹{expenseStats?.totalAmount?.toLocaleString() || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {expenseStats?.totalCount || 0} expense(s) this month
                    </p>
                </div>

                <div
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    data-testid="net-amount-card"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100">
                                <BarChart3 className="w-5 h-5 text-purple-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-600">
                                Net Earnings
                            </p>
                        </div>
                        {/* {netChange != 0 && (
                            <div
                                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                                    netChange > 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {netChange > 0 ? (
                                    <ArrowUpRight className="w-3 h-3" />
                                ) : (
                                    <ArrowDownRight className="w-3 h-3" />
                                )}
                                {Math.abs(netChange)}%
                            </div>
                        )} */}
                    </div>
                    <p
                        className={cn(
                            "text-3xl font-bold",
                            earningStats?.totalAmount >= 0
                                ? "text-green-600"
                                : "text-red-600",
                        )}
                    >
                        {earningStats?.totalAmount >= 0 ? "+" : ""}₹
                        {earningStats?.totalAmount?.toLocaleString() || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        ₹{netProfit.toLocaleString()} net profit this month
                    </p>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Expense Breakdown */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-gray-500" />
                            Expense Category
                        </h2>
                    </div>
                    {expenseStats?.byCategory?.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No expenses this month
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {expenseStats.byCategory.map(
                                ({ category, amount, percentage }) => {
                                    return (
                                        <div
                                            key={category}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                                <PieChart className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm font-medium capitalize">
                                                        {category}
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        ₹
                                                        {amount.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500 w-10 text-right">
                                                {percentage}%
                                            </span>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    )}
                </div>

                {/* Earning Sources */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-gray-500" />
                            Earning Sources
                        </h2>
                    </div>
                    {earningStats?.bySource?.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No earnings this month
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {earningStats.bySource.map(
                                ({ source, amount, percentage }) => {
                                    return (
                                        <div
                                            key={source}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                                <PieChart className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm font-medium">
                                                        {source}
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        ₹
                                                        {amount.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500 w-10 text-right">
                                                {percentage}%
                                            </span>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Property Performance (only when "All Properties" is selected) */}
            {selectedProperty === "ALL" && properties.length > 1 && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-gray-500" />
                            Property Performance
                        </h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/app/properties")}
                            className="text-gray-600"
                        >
                            View All <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                                        Property
                                    </th>
                                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">
                                        Bookings
                                    </th>
                                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">
                                        Expenses
                                    </th>
                                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">
                                        Net Earnings
                                    </th>
                                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">
                                        Net Profit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {propertyPerformance.map((prop, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-gray-50 hover:bg-gray-50"
                                    >
                                        <td className="py-3 px-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                    <Home className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <span className="font-medium">
                                                    {prop.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-right py-3 px-2 font-medium">
                                            ₹{prop.bookings.toLocaleString()}
                                        </td>
                                        <td className="text-right py-3 px-2 font-medium">
                                            ₹{prop.expenses.toLocaleString()}
                                        </td>
                                        <td className="text-right py-3 px-2 font-medium">
                                            ₹{prop.earnings.toLocaleString()}
                                        </td>
                                        <td
                                            className={cn(
                                                "text-right py-3 px-2 font-bold",
                                                prop.netProfit >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600",
                                            )}
                                        >
                                            {prop.netProfit >= 0 ? "+" : ""}₹
                                            {prop.netProfit.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* <BookingFormDialog
                open={showBookingForm}
                onOpenChange={setShowBookingForm}
                booking={null}
                propertyId={
                    selectedProperty === "all"
                        ? properties[0]?.property_id || ""
                        : selectedProperty
                }
                onSuccess={() => {
                    if (selectedProperty === "all") {
                        loadAllPropertiesData();
                    } else {
                        loadPropertyData();
                    }
                }}
            /> */}

            {/* <ExpenseFormDialog
                open={showExpenseForm}
                onOpenChange={setShowExpenseForm}
                expense={null}
                propertyId={
                    selectedProperty === "all"
                        ? properties[0]?.property_id || ""
                        : selectedProperty
                }
                onSuccess={() => {
                    if (selectedProperty === "all") {
                        loadAllPropertiesData();
                    } else {
                        loadPropertyData();
                    }
                }}
            /> */}
        </div>
    );
}
