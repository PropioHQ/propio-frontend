import {
    type RouteConfig,
    index,
    layout,
    route,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/about", "routes/about.tsx"),
    route("/signin", "routes/login.tsx", { id: "signin" }),
    route("/signup", "routes/login.tsx", { id: "signup" }),
    route("/privacy-policy", "routes/privacy-policy.tsx"),
    route("/terms-and-conditions", "routes/terms.tsx"),
    route("/cookie-policy", "routes/cookie-policy.tsx"),
    route("/payment-refund-policy", "routes/payment-refund-policy.tsx"),
    route("/shipping-policy", "routes/shipping-policy.tsx"),

    // All protected routes under layout
    layout("routes/app.layout.tsx", [
        route("/app/onboarding", "routes/app.onboarding.tsx"),
        route("/app/dashboard", "routes/app.dashboard.tsx"),
        route("/app/bookings", "routes/app.bookings.tsx"),
        route("/app/earnings", "routes/app.earnings.tsx"),
        route("/app/expenses", "routes/app.expenses.tsx"),
        route("/app/properties", "routes/app.properties.tsx"),
        route("/app/reports", "routes/app.reports.tsx"),
        route("/app/vault", "routes/app.vault.tsx"),
    ]),
] satisfies RouteConfig;
