import type { ClassValue } from "class-variance-authority/types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
