import AmountLabel from "@/components/amountlabel";
import ExpenseFormDialog from "@/components/expenseformdialog";
import PropertySelector from "@/components/propertyselector";
import ScreenLoader from "@/components/screenloader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXPENSES_KEY, PROPERTIES_KEY } from "@/querykeys";
import ExpenseService from "@/services/expense.service";
import PropertyService from "@/services/property.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Calendar, Edit, EllipsisVertical, Plus, Store } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Expenses() {
    const queryClient = useQueryClient();

    const [selectedProperty, setSelectedProperty] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState("");

    const currentYear: number = useMemo(() => dayjs().get("year"), []);
    const currentMonth: number = useMemo(() => dayjs().get("month") + 1, []);

    const { data: properties = [], isLoading: propertiesLoading } = useQuery({
        queryKey: [PROPERTIES_KEY],
        queryFn: PropertyService.getProperties,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const { data: expenses = [], isLoading: expensesLoading } = useQuery({
        queryKey: [EXPENSES_KEY, currentMonth, currentYear, selectedProperty],
        queryFn: () =>
            ExpenseService.getExpenses(
                selectedProperty,
                currentMonth,
                currentYear,
            ),
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!selectedProperty && !propertiesLoading,
    });

    const refreshExpenses = () => {
        queryClient.invalidateQueries({
            queryKey: [
                EXPENSES_KEY,
                currentMonth,
                currentYear,
                selectedProperty,
            ],
        });
    };

    const handleExpenseClick = (expenseId: string) => {
        setSelectedExpense(expenseId);
        setShowDialog(true);
    };

    const handleAddNew = () => {
        setSelectedExpense("");
        setShowDialog(true);
    };

    useEffect(() => {
        if (!properties.length) {
            setSelectedProperty("");
            return;
        }

        const selectedPropertyExists = properties.some(
            (p) => p._id === selectedProperty,
        );

        // if selected property is not in the list, reset
        if (!selectedPropertyExists) {
            setSelectedProperty(properties[0]._id);
        }
    }, [properties]);

    if (propertiesLoading || expensesLoading) {
        return <ScreenLoader />;
    }

    return (
        <div
            className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
            data-testid="expenses-page"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold">Expenses</h1>
                    <p className="text-gray-600 mt-1">
                        {dayjs()
                            .set("month", currentMonth - 1)
                            .set("year", currentYear)
                            .format("MMMM YYYY")}{" "}
                        Overview
                    </p>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <Button
                        data-testid="add-expense-button"
                        onClick={handleAddNew}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Expense
                    </Button>
                    <PropertySelector
                        properties={properties}
                        value={selectedProperty}
                        onSelect={setSelectedProperty}
                    />
                </div>
            </div>

            <div className="bg-white" data-testid="expenses-list">
                {expenses.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 rounded-lg border border-gray-200">
                        No expenses recorded yet.
                    </div>
                ) : (
                    <div>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Category
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Vendor
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Payment Mode
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Amount
                                        </th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {expenses.map((expense, index) => (
                                        <motion.tr
                                            key={expense._id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.25,
                                                ease: "easeOut",
                                                delay: index * 0.03,
                                            }}
                                            whileTap={{ scale: 0.985 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {dayjs(
                                                    expense.record_date,
                                                ).format("Do MMM")}
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <Badge
                                                    variant={expense.category}
                                                >
                                                    {expense.category}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {expense.vendor_name ||
                                                    "Unknown"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {expense.payment_mode || ""}
                                            </td>
                                            <td className="px-4 py-4 text-rose-700 text-sm font-semibold">
                                                -
                                                <AmountLabel
                                                    value={expense.amount}
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        handleExpenseClick(
                                                            expense._id,
                                                        )
                                                    }
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Edit />
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Table View */}
                        <div className="md:hidden space-y-3">
                            {expenses.map((expense, index) => (
                                <motion.div
                                    key={expense._id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: "easeOut",
                                        delay: index * 0.03,
                                    }}
                                    whileTap={{ scale: 0.985 }}
                                    className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm active:shadow-md transition-shadow"
                                >
                                    {/* Amount Accent Strip */}
                                    <div className="absolute left-0 top-0 h-full w-1 bg-gray-900/80" />

                                    <div className="p-4">
                                        {/* Header Row */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 space-y-1.5">
                                                <Badge
                                                    variant={expense.category}
                                                    className="truncate text-xs"
                                                >
                                                    {expense.category}
                                                </Badge>

                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {dayjs(
                                                        expense.record_date,
                                                    ).format("Do MMM")}
                                                </div>
                                            </div>

                                            <div className="text-right space-y-1">
                                                <p className="text-base font-semibold tracking-tight">
                                                    <AmountLabel
                                                        value={expense.amount}
                                                    />
                                                </p>
                                                <p className="text-[11px] text-gray-400">
                                                    Spent
                                                </p>
                                            </div>
                                        </div>

                                        {/* Breakdown Grid */}
                                        <div className="mt-4 grid grid-cols-10 gap-2 text-xs">
                                            <div className="col-span-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-center">
                                                <p className="text-[11px] text-gray-400">
                                                    Vendor
                                                </p>
                                                <p className="text-gray-900">
                                                    {expense.vendor_name ||
                                                        "Unknown"}
                                                </p>
                                            </div>

                                            <div className="col-span-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-center">
                                                <p className="text-[11px] text-gray-400">
                                                    Payment
                                                </p>
                                                <p className=" text-gray-900">
                                                    {expense.payment_mode}
                                                </p>
                                            </div>
                                            <div className="col-span-3" />
                                            <Button
                                                onClick={() =>
                                                    handleExpenseClick(
                                                        expense._id,
                                                    )
                                                }
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Edit expense"
                                            >
                                                <EllipsisVertical className="h-4 w-4 text-gray-700" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showDialog ? (
                <ExpenseFormDialog
                    open={showDialog}
                    onOpenChange={setShowDialog}
                    expenseId={selectedExpense}
                    propertyId={selectedProperty}
                    onSuccess={() => {
                        refreshExpenses();
                        setSelectedExpense(null);
                    }}
                />
            ) : null}
        </div>
    );
}
