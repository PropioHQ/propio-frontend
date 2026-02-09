import API from "@/lib/api";
import { ExpenseCategory, ExpensePaymentMode } from "@/types";

const ExpenseService = {
    getExpense: async (expenseId: string, propertyId: string) => {
        return await API.get(
            `/api/v1/expense?eid=${expenseId}&pid=${propertyId}`,
        );
    },
    getExpenses: async (propertyId: string, month: number, year: number) => {
        const params = new URLSearchParams();

        params.append("m", month.toString());
        params.append("y", year.toString());
        params.append("pid", propertyId);

        const queryStr = params.toString();

        return await API.get(`/api/v1/expense/all?${queryStr}`);
    },
    addExpense: async (
        property_id: string,
        record_date: Date,
        category: ExpenseCategory,
        amount: number,
        payment_mode: ExpensePaymentMode,
        vendor_name: string,
        note: string,
        attachmentIds: string[],
    ) => {
        return await API.post("/api/v1/expense", {
            property_id,
            record_date,
            category,
            amount,
            payment_mode,
            vendor_name,
            note,
            attachmentIds,
        });
    },
    updateExpense: async (
        expense_id: string,
        property_id: string,
        record_date: Date,
        category: ExpenseCategory,
        amount: number,
        payment_mode: ExpensePaymentMode,
        vendor_name: string,
        note: string,
        attachmentIds: string[],
    ) => {
        return await API.put("/api/v1/expense", {
            expense_id,
            property_id,
            record_date,
            category,
            amount,
            payment_mode,
            vendor_name,
            note,
            attachmentIds,
        });
    },
    deleteExpense: async (expenseId: string, propertyId: string) => {
        return await API.delete(
            `/api/v1/expense?eid=${expenseId}&pid=${propertyId}`,
        );
    },
};

export default ExpenseService;
