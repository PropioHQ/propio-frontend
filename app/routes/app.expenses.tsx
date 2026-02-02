import ExpenseFormDialog from "@/components/expenseformdialog";
import PropertySelector from "@/components/propertyselector";
import ScreenLoader from "@/components/screenloader";
import { Button } from "@/components/ui/button";
import { EXPENSES_KEY, PROPERTIES_KEY } from "@/querykeys";
import ExpenseService from "@/services/expense.service";
import PropertyService from "@/services/property.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { BanknoteArrowDown, Calendar, Edit, Plus, Store } from "lucide-react";
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

                <PropertySelector
                    properties={properties}
                    value={selectedProperty}
                    onSelect={setSelectedProperty}
                />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 mb-6">
                <Button
                    data-testid="add-expense-button"
                    onClick={handleAddNew}
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Expense
                </Button>
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
                                            Category
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Date
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
                                                {expense.category}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {dayjs(
                                                    expense.record_date,
                                                ).format("MMM D, YYYY")}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {expense.vendor_name || ""}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {expense.payment_mode || ""}
                                            </td>
                                            <td className="px-4 py-4 text-gray-700 font-semibold">
                                                ₹
                                                {expense.amount.toLocaleString()}
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
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: "easeOut",
                                        delay: index * 0.03,
                                    }}
                                    whileTap={{ scale: 0.985 }}
                                    className="rounded-lg bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                                >
                                    <div className="px-4 py-3">
                                        {/* Top Row */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 space-y-1">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {expense.category}
                                                </p>

                                                <span className="flex items-center gap-1.5 text-xs text-gray-600">
                                                    <Store className="h-3.5 w-3.5 text-gray-400" />
                                                    {expense.vendor_name || "-"}
                                                </span>
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                    {dayjs(
                                                        expense.record_date,
                                                    ).format("Do MMM")}
                                                </div>
                                                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-600">
                                                    <BanknoteArrowDown className="h-3.5 w-3.5 text-gray-400" />
                                                    {expense.payment_mode}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="my-2 h-px bg-gray-100/70" />

                                        {/* Bottom Row */}
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-sm font-semibold shrink-0">
                                                - ₹
                                                {expense.amount.toLocaleString()}
                                            </p>

                                            <motion.button
                                                onClick={() =>
                                                    handleExpenseClick(
                                                        expense._id,
                                                    )
                                                }
                                                whileTap={{ scale: 0.9 }}
                                                className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </motion.button>
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
