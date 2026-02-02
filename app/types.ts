export enum UserRoles {
    OWNER = "Owner",
    HOST = "Host",
    MANAGER = "Manager",
}

// enums.ts

// Booking Sources
export enum BookingSource {
    DIRECT = "Direct",
    AIRBNB = "Airbnb",
    OTA = "OTA",
    AGENT = "Agent",
    OTHER = "Other",
}

// Booking Payment Modes
export enum BookingPaymentMode {
    UPI = "UPI",
    CARD = "Debit/Credit Card",
    BANK_TRANSFER = "Bank Transfer",
    PAYMENT_GATEWAY = "Payment Gateway",
    CASH = "Cash",
}

// Expense Payment Modes
export enum ExpensePaymentMode {
    CASH = "Cash",
    UPI = "UPI",
    CARD = "Debit/Credit Card",
    BANK_TRANSFER = "Bank Transfer",
}

// Expense Categories (const + union, not enum)
export const EXPENSE_CATEGORIES = [
    "Electricity",
    "Water",
    "Toiletries",
    "Laundry",
    "Food & Drinks",
    "Cook Gas",
    "Platform Fee",
    "Salary",
    "Property Rent",
    "Property Tax",
    "Property Maintenance",
    "Society Maintenance",
    "Legal & Compliance",
    "Others",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
