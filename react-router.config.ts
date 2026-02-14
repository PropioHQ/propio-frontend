import type { Config } from "@react-router/dev/config";

export default {
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    ssr: false,
    prerender: [
        "/",
        "/about",
        "/contact",
        "/signin",
        "/signup",
        "/privacy-policy",
        "/terms-and-conditions",
        "/cookie-policy",
        "/payment-refund-policy",
        "/shipping-policy",
    ],
} satisfies Config;
