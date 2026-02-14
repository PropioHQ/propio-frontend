import type { ClassValue } from "class-variance-authority/types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function setAuthToken(token: string) {
    window.localStorage.setItem("x-a-token", token);
}

export function getAuthToken() {
    return window.localStorage.getItem("x-a-token") || "";
}

export function removeAuthToken() {
    window.localStorage.removeItem("x-a-token");
}

export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (typeof email !== "string") return false;

    return emailRegex.test(email.trim());
}

export function convertToCSV(rows = []) {
    if (!rows || !rows.length) return "";

    const headers = Object.keys(rows[0]);

    const csv = [
        headers.join(","), // header row
        ...rows.map((row) =>
            headers
                .map((field) => {
                    let val = row[field];

                    if (val === null || val === undefined) return "";

                    // escape quotes
                    if (typeof val === "string") {
                        val = val.replace(/"/g, '""');
                        return `"${val}"`;
                    }

                    return val;
                })
                .join(","),
        ),
    ].join("\n");

    return csv;
}

export function generateAndDownloadExcel(jsonSheets = [], filename) {
    const workbook = XLSX.utils.book_new();

    jsonSheets.forEach((js) => {
        XLSX.utils.book_append_sheet(
            workbook,
            XLSX.utils.json_to_sheet(js.rows),
            js.name,
        );
    });

    XLSX.writeFile(workbook, filename);
}
