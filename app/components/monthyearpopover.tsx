import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Label } from "./ui/label";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
    { length: CURRENT_YEAR - 2020 },
    (_, i) => CURRENT_YEAR - i,
);

export default function MonthYearPopover({
    month,
    year,
    children,
    onMonthSelect,
    onYearSelect,
}: {
    month: number;
    year: number;
    children: React.ReactNode;
    onMonthSelect: (month: number) => void;
    onYearSelect: (year: number) => void;
}) {
    return (
        <Popover modal>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent align="start" className="w-fit h-100">
                <div className="w-full h-full grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 overflow-y-auto thin-scrollbar pr-6">
                        <Label className="px-2 py-0.5 mb-2">Month</Label>
                        {MONTHS.map((m, idx) => (
                            <div
                                key={m}
                                className={cn(
                                    "flex flex-row items-center justify-between text-sm hover:bg-gray-50 rounded-md px-2 py-1 cursor-pointer",
                                    idx + 1 === month
                                        ? "text-gray-800 font-medium"
                                        : "text-gray-600",
                                )}
                                onClick={() => onMonthSelect(idx + 1)}
                            >
                                <span className="flex-1">{m}</span>
                                <Check
                                    className={cn(
                                        "w-4 h-4 text-gray-900 shrink-0",
                                        {
                                            invisible: idx + 1 !== month,
                                        },
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-1.5 overflow-y-auto thin-scrollbar">
                        <Label className="px-2 py-0.5 mb-2">Year</Label>
                        {YEARS.map((y) => (
                            <div
                                key={y}
                                className={cn(
                                    "flex flex-row items-center justify-between text-sm hover:bg-gray-50 rounded-md px-2 py-1.5 cursor-pointer",
                                    y === year
                                        ? "text-gray-800 font-medium"
                                        : "text-gray-600",
                                )}
                                onClick={() => onYearSelect(y)}
                            >
                                <span className="flex-1">{y}</span>
                                <Check
                                    className={cn(
                                        "w-4 h-4 text-gray-900 shrink-0",
                                        {
                                            invisible: y !== year,
                                        },
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
