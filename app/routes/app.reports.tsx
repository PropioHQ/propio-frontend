import AmountLabel from "@/components/amountlabel";
import ProgressRow from "@/components/progressrow";
import PropertySelector from "@/components/propertyselector";
import ReportSectionCard from "@/components/reportsectioncard";
import ScreenLoader from "@/components/screenloader";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn, convertToCSV, generateAndDownloadExcel } from "@/lib/utils";
import { fadeRow } from "@/motionstyles";
import { PROPERTIES_KEY, PROPERTIES_REPORTS } from "@/querykeys";
import PropertyService from "@/services/property.service";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import {
    ArrowDownToLine,
    ArrowRight,
    DollarSign,
    Receipt,
    Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";

export default function Reports() {
    const location = useLocation();

    const [selectedProperty, setSelectedProperty] = useState(() => {
        return location.state?.propertyId || "ALL";
    });
    const [selectedMonth, setSelectedMonth] = useState(
        dayjs().format("YYYY-MM"),
    );

    const { data: properties = [], isLoading: propertiesLoading } = useQuery({
        queryKey: [PROPERTIES_KEY],
        queryFn: PropertyService.getProperties,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const propertyIds: string[] = useMemo(() => {
        if (selectedProperty === "ALL") {
            return properties.map((p) => p._id);
        }

        return [selectedProperty];
    }, [selectedProperty, properties]);

    const { currentYear, currentMonth } = useMemo(() => {
        const d = dayjs(selectedMonth);

        return { currentYear: d.get("year"), currentMonth: d.get("month") + 1 };
    }, [selectedMonth]);

    const { data: monthlyReport, isLoading: reportsLoading } = useQuery({
        queryKey: [
            PROPERTIES_REPORTS,
            currentYear,
            currentMonth,
            propertyIds,
            "full",
        ],
        queryFn: () =>
            PropertyService.getMonthlyReport(
                propertyIds,
                currentMonth,
                currentYear,
                true,
            ),
        enabled: !!selectedProperty && !propertiesLoading,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });

    const { reports, property_summaries } = useMemo(
        () => monthlyReport || {},
        [monthlyReport],
    );

    const downloadExcel = (p) => {
        // ---------- Property Summary ----------
        const summarySheetData = [
            {
                Property: p.property_name,
                Period: selectedMonth,
                "Number of bookings": p.total_bookings_count,
                "Bookings value": p.total_bookings_value,
                "Total expenses": p.total_expenses,
                "Total earnings": p.total_earnings,
                "Net earnings (After taxes)": p.net_earnings,
                "Net profit": p.net_profit,
            },
        ];

        // ---------- Bookings By Source ----------
        const bookingsRows = Object.entries(p.bookings_count_by_source).map(
            ([source, count]) => ({
                Source: source,
                "Number of bookings": count,
                "Bookings value": p.bookings_value_by_source[source] || 0,
            }),
        );

        // ---------- Earnings By Source ----------
        const earningsRows = Object.entries(p.earnings_by_source).map(
            ([source, amount]) => ({
                Source: source,
                "Total earnings": amount,
            }),
        );

        // ---------- Expenses By Category ----------
        const expenseRows = Object.entries(p.expenses_by_category || {}).map(
            ([category, amount]) => ({
                Category: category,
                "Total expenses": amount,
            }),
        );

        // ---------- Download ----------
        const fileName = `Report/${p.property_name}/${selectedMonth}.xlsx`;

        // GENERATE EXCEL
        generateAndDownloadExcel(
            [
                { name: "Summary", rows: summarySheetData },
                { name: "Booking Sources", rows: bookingsRows },
                { name: "Expense Category", rows: expenseRows },
                { name: "Earning Source", rows: earningsRows },
            ],
            fileName,
        );
    };

    const downloadReports = (propertyId) => {
        const summary = property_summaries.find(
            (s) => s.property_id === propertyId,
        );
        if (!summary) {
            toast.error("Report summary not found!");
            return;
        }

        downloadExcel(summary);
    };

    const months = [];
    for (let i = 0; i < 12; i++) {
        months.push(dayjs().subtract(i, "month").format("YYYY-MM"));
    }

    const loading = propertiesLoading || reportsLoading;

    return (
        <div
            className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
            data-testid="reports-page"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold">Reports</h1>
                </div>
                <div className="max-sm:w-full flex flex-row items-center gap-3">
                    <PropertySelector
                        properties={[
                            { _id: "ALL", name: "All Properties" },
                            ...properties,
                        ]}
                        value={selectedProperty}
                        onSelect={setSelectedProperty}
                    />

                    <div className="w-full sm:w-56">
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
            </div>

            {loading ? (
                <ScreenLoader />
            ) : reports ? (
                <div className="space-y-6">
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b text-gray-600">
                                    <th className="px-5 py-4 text-left font-semibold">
                                        Property
                                    </th>
                                    <th className="px-5 py-4 text-left font-semibold">
                                        Bookings
                                    </th>
                                    <th className="px-5 py-4 text-left font-semibold">
                                        Expenses
                                    </th>
                                    <th className="px-5 py-4 text-left font-semibold">
                                        Earnings
                                    </th>
                                    <th className="px-5 py-4 text-left font-semibold">
                                        Taxes
                                    </th>
                                    <th className="px-5 py-4 text-left font-semibold">
                                        Net Profit
                                    </th>
                                    <th className="px-5 py-4 text-center font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {property_summaries?.map((s, index) => (
                                    <motion.tr
                                        key={s._id}
                                        {...fadeRow(index)}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-5 py-4 font-medium text-gray-800">
                                            {s.property_name}
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">
                                            <AmountLabel
                                                value={s.total_bookings_value}
                                            />
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">
                                            <AmountLabel
                                                value={s.total_expenses}
                                            />
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">
                                            <AmountLabel
                                                value={s.total_earnings}
                                            />
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">
                                            <AmountLabel value={s.taxes} />
                                        </td>
                                        <td
                                            className={cn(
                                                "px-5 py-4 font-semibold",
                                                s.net_profit >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600",
                                            )}
                                        >
                                            <AmountLabel value={s.net_profit} />
                                        </td>
                                        <td className="px-5 py-4 text-gray-700 text-center">
                                            {s.property_id ===
                                            selectedProperty ? (
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="items-center text-brand"
                                                    onClick={() =>
                                                        downloadReports(
                                                            s.property_id,
                                                        )
                                                    }
                                                >
                                                    Export
                                                    <ArrowDownToLine className="w-2 h-2 text-brand" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="items-center text-brand"
                                                    onClick={() =>
                                                        setSelectedProperty(
                                                            s.property_id,
                                                        )
                                                    }
                                                >
                                                    Report
                                                    <ArrowRight className="w-2 h-2 text-brand" />
                                                </Button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card List */}
                    <div className="md:hidden space-y-4">
                        {property_summaries?.map((s, index) => (
                            <motion.div
                                key={s._id}
                                {...fadeRow(index)}
                                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm active:shadow-md transition-shadow"
                            >
                                {/* Amount Accent Strip */}
                                <div className="absolute left-0 top-0 h-full w-1 bg-gray-900/80" />

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-semibold text-gray-800 text-sm">
                                            {s.property_name}
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p
                                                className={cn(
                                                    "text-sm font-semibold",
                                                    s.net_profit >= 0
                                                        ? "text-green-600"
                                                        : "text-red-600",
                                                )}
                                            >
                                                <AmountLabel
                                                    value={s.net_profit}
                                                />
                                            </p>
                                            <p className="text-[11px] text-gray-400">
                                                Net Profit
                                            </p>
                                        </div>
                                    </div>

                                    {/* Breakdown Grid */}
                                    <div className="mt-4 grid grid-cols-12 gap-2 text-xs">
                                        <div className="col-span-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-center">
                                            <p className="text-[11px] text-gray-400">
                                                Bookings
                                            </p>
                                            <p className=" text-gray-900">
                                                <AmountLabel
                                                    value={
                                                        s.total_bookings_value
                                                    }
                                                />
                                            </p>
                                        </div>
                                        <div className="col-span-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-center">
                                            <p className="text-[11px] text-gray-400">
                                                Expenses
                                            </p>
                                            <p className=" text-gray-900">
                                                <AmountLabel
                                                    value={s.total_expenses}
                                                />
                                            </p>
                                        </div>
                                        <div className="col-span-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-center">
                                            <p className="text-[11px] text-gray-400">
                                                Earnings
                                            </p>
                                            <p className=" text-gray-900">
                                                <AmountLabel
                                                    value={s.total_earnings}
                                                />
                                            </p>
                                        </div>
                                        <div className="col-span-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-center">
                                            <p className="text-[11px] text-gray-400">
                                                Report
                                            </p>
                                            {s.property_id ===
                                            selectedProperty ? (
                                                <p
                                                    className="text-brand font-medium"
                                                    onClick={() =>
                                                        downloadReports(
                                                            s.property_id,
                                                        )
                                                    }
                                                >
                                                    Export
                                                </p>
                                            ) : (
                                                <p
                                                    className="text-brand font-medium"
                                                    onClick={() =>
                                                        setSelectedProperty(
                                                            s.property_id,
                                                        )
                                                    }
                                                >
                                                    View
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Detail Sections */}
                    {selectedProperty && selectedProperty !== "ALL" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Booking Sources */}
                            <ReportSectionCard
                                title="Booking Sources"
                                icon={Receipt}
                                right={
                                    <div className="text-xs text-gray-500">
                                        Total:{" "}
                                        {reports?.total_bookings_count || 0}
                                    </div>
                                }
                            >
                                {!reports?.bookings_by_source?.length ? (
                                    <div className="text-center text-gray-500 py-10 text-sm">
                                        No bookings for selected month
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {reports.bookings_by_source.map(
                                            (item, index) => (
                                                <motion.div
                                                    key={item.source}
                                                    {...fadeRow(index)}
                                                >
                                                    <ProgressRow
                                                        label={item.source}
                                                        badgeVariant={
                                                            item.source
                                                        }
                                                        percentage={
                                                            item.percentage
                                                        }
                                                        amount={item.amount}
                                                    />
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </ReportSectionCard>

                            {/* Expenses */}
                            <ReportSectionCard
                                title="Expense Category"
                                icon={DollarSign}
                            >
                                {!reports?.expenses_by_category?.length ? (
                                    <div className="text-center text-gray-500 py-10 text-sm">
                                        No expenses for selected month
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {reports.expenses_by_category.map(
                                            (item, index) => (
                                                <motion.div
                                                    key={item.category}
                                                    {...fadeRow(index)}
                                                >
                                                    <ProgressRow
                                                        label={item.category}
                                                        badgeVariant={
                                                            item.category
                                                        }
                                                        percentage={
                                                            item.percentage
                                                        }
                                                        amount={item.amount}
                                                    />
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </ReportSectionCard>

                            {/* Earnings */}
                            <ReportSectionCard
                                title="Earning Sources"
                                icon={Wallet}
                            >
                                {!reports?.earnings_by_source?.length ? (
                                    <div className="text-center text-gray-500 py-10 text-sm">
                                        No earnings for selected month
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {reports.earnings_by_source.map(
                                            (item, index) => (
                                                <motion.div
                                                    key={item.source}
                                                    {...fadeRow(index)}
                                                >
                                                    <ProgressRow
                                                        label={item.source}
                                                        badgeVariant={
                                                            item.source
                                                        }
                                                        percentage={
                                                            item.percentage
                                                        }
                                                        amount={item.amount}
                                                    />
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </ReportSectionCard>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}
