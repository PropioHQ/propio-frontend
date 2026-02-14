import { cn } from "@/lib/utils";
import { BookingSource, ExpenseCategory } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
    "inline-flex items-center rounded-lg border px-1.5 sm:px-2.5 py-0.5 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-red-50 text-red-700 hover:bg-red-200",
                outline: "text-foreground border-gray-300 hover:bg-gray-50",

                // Status variants
                success:
                    "border-transparent bg-green-50 text-green-700 hover:bg-green-100",
                warning:
                    "border-transparent bg-amber-50 text-amber-700 hover:bg-amber-200",
                info: "border-transparent bg-blue-50 text-blue-700 hover:bg-blue-200",

                // Booking source variants
                [BookingSource.DIRECT]:
                    "border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-200",
                [BookingSource.AIRBNB]:
                    "border-transparent bg-pink-50 text-pink-700 hover:bg-pink-200",
                [BookingSource.OTA]:
                    "border-transparent bg-indigo-50 text-indigo-700 hover:bg-indigo-200",
                [BookingSource.AGENT]:
                    "border-transparent bg-purple-50 text-purple-700 hover:bg-purple-200",
                [BookingSource.OTHER]:
                    "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-200",

                // Expense category variants
                [ExpenseCategory.ELECTRICITY]:
                    "border-transparent bg-yellow-50 text-yellow-700 hover:bg-yellow-200",
                [ExpenseCategory.WATER]:
                    "border-transparent bg-blue-50 text-blue-700 hover:bg-blue-200",
                [ExpenseCategory.TOILETRIES]:
                    "border-transparent bg-teal-50 text-teal-700 hover:bg-teal-200",
                [ExpenseCategory.LAUNDRY]:
                    "border-transparent bg-cyan-50 text-cyan-700 hover:bg-cyan-200",
                [ExpenseCategory.FOOD_DRINKS]:
                    "border-transparent bg-orange-50 text-orange-700 hover:bg-orange-200",
                [ExpenseCategory.COOK_GAS]:
                    "border-transparent bg-red-50 text-red-700 hover:bg-red-200",
                [ExpenseCategory.PLATFORM_FEE]:
                    "border-transparent bg-purple-50 text-purple-700 hover:bg-purple-200",
                [ExpenseCategory.SALARY]:
                    "border-transparent bg-green-50 text-green-700 hover:bg-green-200",
                [ExpenseCategory.PROPERTY_RENT]:
                    "border-transparent bg-indigo-50 text-indigo-700 hover:bg-indigo-200",
                [ExpenseCategory.PROPERTY_TAX]:
                    "border-transparent bg-rose-50 text-rose-700 hover:bg-rose-200",
                [ExpenseCategory.PROPERTY_MAINTENANCE]:
                    "border-transparent bg-amber-50 text-amber-700 hover:bg-amber-200",
                [ExpenseCategory.SOCIETY_MAINTENANCE]:
                    "border-transparent bg-lime-50 text-lime-700 hover:bg-lime-200",
                [ExpenseCategory.LEGAL_COMPLIANCE]:
                    "border-transparent bg-violet-50 text-violet-700 hover:bg-violet-200",
                [ExpenseCategory.PROMOTION_MARKETING]:
                    "border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-200",
                [ExpenseCategory.OTHERS]:
                    "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-200",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface BadgeProps
    extends
        React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {
    icon?: React.ReactNode;
}

function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props}>
            {icon && <span className="mr-1">{icon}</span>}
            {children}
        </div>
    );
}

export { Badge, badgeVariants };
