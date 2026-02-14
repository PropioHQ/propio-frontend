import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

const PaymentRefundPolicy = () => {
    // Configuration object for easy editing
    const config = {
        company: {
            name: "Furbago Travel Technologies Private Limited",
            shortName: "Propio",
            email: "support@propiohq.com",
            address:
                "55 2nd Floor, Lane 2, Westend Marg, South West Delhi, Delhi, India - 110030",
            jurisdiction: "New Delhi, India",
            governingLaw: "Indian Law",
        },
        document: {
            title: "Payment & Refund Policy",
            effectiveDate: "14th Feb 2026",
            lastUpdated: "14th Feb 2026",
        },
    };

    const sections = [
        {
            id: 1,
            title: "Subscription Plans",
            content: [
                `${config.company.shortName} offers subscription-based SaaS plans. Features, pricing, and limits vary by tier.`,
            ],
            items: [
                "Free tier",
                "Monthly subscription plans",
                "Annual subscription plans",
                "AI-enhanced tiers",
                "Add-on services",
            ],
            note: "Pricing is displayed on our website or platform and may be updated periodically.",
        },
        {
            id: 2,
            title: "Billing Cycle",
            subsections: [
                {
                    title: "2.1 Monthly Plans",
                    items: [
                        "Billed in advance every 30 days (or equivalent monthly cycle).",
                    ],
                },
                {
                    title: "2.2 Annual Plans",
                    items: ["Billed in advance for a 12-month period."],
                },
                {
                    title: "2.3 Auto-Renewal",
                    items: [
                        "All paid subscriptions automatically renew unless cancelled before the renewal date.",
                        "By subscribing, you authorize recurring charges.",
                    ],
                },
            ],
        },
        {
            id: 3,
            title: "Payment Processing",
            content: [
                "Payments are processed via third-party payment gateways and aggregators.",
            ],
            subsections: [
                {
                    title: "We do not:",
                    items: [
                        "Store full card details",
                        "Control payment processor operations",
                    ],
                },
                {
                    title: "Payment processors may apply:",
                    items: [
                        "Transaction fees",
                        "Currency conversion charges",
                        "International processing fees",
                    ],
                },
            ],
            note: "These are outside Propio's control.",
        },
        {
            id: 4,
            title: "Pricing & Taxes",
            content: [
                "All fees are listed exclusive or inclusive of applicable taxes as specified and subject to local taxes (GST or international VAT, if applicable).",
            ],
            subsections: [
                {
                    title: "Users are responsible for:",
                    items: [
                        "Any applicable taxes in their jurisdiction",
                        "Compliance with local tax laws",
                    ],
                },
                {
                    title: "Important Notice",
                    items: [
                        "Propio is not responsible for tax misclassification by users.",
                    ],
                },
            ],
        },
        {
            id: 5,
            title: "Upgrades & Downgrades",
            subsections: [
                {
                    title: "5.1 Upgrades",
                    items: [
                        "If you upgrade mid-cycle, you may be charged a prorated difference",
                        "Upgrade benefits apply immediately",
                    ],
                },
                {
                    title: "5.2 Downgrades",
                    items: [
                        "If you downgrade, changes take effect next billing cycle",
                        "No partial refund for unused period",
                    ],
                },
            ],
        },
        {
            id: 6,
            title: "AI Usage, Credits & Metered Features",
            content: [
                "Certain plans include AI-powered features (e.g., smart scans, automation, analytics).",
            ],
            subsections: [
                {
                    title: "Where applicable:",
                    items: [
                        "AI features may be metered",
                        "Usage limits may apply",
                        "Fair-use policies may be enforced",
                        "Unused AI credits do not roll over unless explicitly stated",
                    ],
                },
                {
                    title: "Propio reserves the right to:",
                    items: [
                        "Temporarily suspend AI usage in case of abuse",
                        "Modify AI limits for platform stability",
                    ],
                },
            ],
        },
        {
            id: 7,
            title: "Refund Policy",
            subsections: [
                {
                    title: "7.1 General Policy",
                    content:
                        "All subscription payments are non-refundable, except where required by law.",
                    items: [
                        "Partial month usage",
                        "Inactivity",
                        "Failure to cancel before renewal",
                        "Feature misunderstandings",
                        "Downgrades",
                        "Dissatisfaction without service failure",
                    ],
                    note: "We do not provide refunds for:",
                },
                {
                    title: "7.2 Annual Plan Refunds",
                    items: [
                        "Annual subscriptions are non-refundable once activated.",
                    ],
                },
                {
                    title: "7.3 Exceptional Refund Consideration",
                    content: "Refunds may be considered in rare cases where:",
                    items: [
                        "Duplicate payment occurred",
                        "Unauthorized billing verified",
                        "Proven technical malfunction preventing access",
                    ],
                    note: "Refunds, if approved, are processed at our discretion.",
                },
            ],
        },
        {
            id: 8,
            title: "Cancellation Policy",
            content: [
                "Users may cancel subscription anytime through account settings.",
            ],
            items: [
                "Cancellation stops future billing",
                "Does not trigger refund for current cycle",
                "Does not automatically delete data (see retention policy)",
                "Access continues until end of billing cycle",
            ],
        },
        {
            id: 9,
            title: "Chargebacks & Payment Disputes",
            content: [
                "If you initiate a chargeback without first contacting support:",
            ],
            items: [
                "Your account may be suspended",
                "Access may be terminated",
                "Legal recovery options may be pursued",
                "Fraudulent chargebacks may result in permanent ban",
            ],
        },
        {
            id: 10,
            title: "Failed Payments",
            content: ["If payment fails:"],
            items: [
                "You may receive a notification",
                "A retry attempt may occur",
                "Account access may be restricted",
                "Persistent failed payments may lead to suspension",
            ],
        },
        {
            id: 11,
            title: "Add-On Services & Custom Work",
            content: [
                `If ${config.company.shortName} offers custom integrations, compliance assistance, one-time services, or enterprise customization:`,
            ],
            items: [
                "May require upfront payment",
                "Are non-refundable once initiated",
                "May be governed by separate agreements",
            ],
        },
        {
            id: 12,
            title: "Free Trial (If Applicable)",
            content: ["If a free trial is offered:"],
            items: [
                "No charge during trial period",
                "Subscription begins automatically unless cancelled",
                "No refund after trial converts to paid plan",
            ],
        },
        {
            id: 13,
            title: "Data Access After Cancellation",
            content: ["Upon subscription cancellation:"],
            items: [
                "Account may revert to limited access",
                "Certain features may be disabled",
                "Data export may remain available for limited time",
                "Propio is not obligated to retain data indefinitely",
            ],
        },
        {
            id: 14,
            title: "International Users",
            content: ["If you subscribe from outside India:"],
            items: [
                "Currency conversion is handled by payment processors",
                "Exchange rate differences are not refundable",
                "Local regulatory protections may vary",
            ],
        },
        {
            id: 15,
            title: "Service Availability Disclaimer",
            content: [
                "Refunds are not provided for scheduled maintenance, force majeure events, third-party infrastructure outages, or temporary downtime.",
            ],
            items: [
                "We strive for high uptime but do not guarantee uninterrupted service",
            ],
        },
        {
            id: 16,
            title: "Modifications to Pricing",
            content: [
                `${config.company.shortName} reserves the right to modify pricing, introduce new plans, and adjust feature allocations.`,
            ],
            items: [
                "Price changes will apply on next renewal cycle",
                "With reasonable prior notice",
            ],
        },
        {
            id: 17,
            title: "Limitation of Financial Liability",
            content: [
                "Total financial liability related to billing disputes shall not exceed the subscription amount paid by you in the preceding 3 months.",
            ],
        },
        {
            id: 18,
            title: "Contact for Billing Issues",
            subsections: [
                {
                    title: "For billing concerns, please reach out:",
                    items: [
                        `Email: ${config.company.email}`,
                        `Company: ${config.company.name}`,
                        `Address: ${config.company.address}`,
                    ],
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-6 py-16">
                    <Link
                        to="/"
                        className="flex flex-row items-center gap-1 text-sm underline text-black"
                    >
                        <ChevronLeft className="w-4 h-4 text-black" /> Back to
                        home
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mt-6 mb-2">
                        {config.document.title}
                    </h1>
                    <p className="text-sm text-gray-500 ">
                        Effective Date: {config.document.effectiveDate} | Last
                        Updated: {config.document.lastUpdated}
                    </p>
                </div>
            </div>

            {/* Introduction */}
            <div className="border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-6 py-8">
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        This Payment & Refund Policy ("Policy") governs
                        payments, billing, subscriptions, refunds, and related
                        financial transactions for services provided by:
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 ">
                        {config.company.name}
                        <br />
                        {config.company.address}
                        <br />
                        Email:{" "}
                        <a
                            href={`mailto:${config.company.email}`}
                            className="text-gray-900 hover:text-gray-600 transition-colors underline"
                        >
                            {config.company.email}
                        </a>
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        ("{config.company.shortName}", "Company", "we", "us", or
                        "our")
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        By subscribing to or purchasing any paid plan or
                        service, you agree to this Policy.
                    </p>
                </div>
            </div>

            {/* Sections */}
            <div className="max-w-3xl mx-auto">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        className="px-6 py-8 border-b border-gray-200 last:border-b-0"
                    >
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-gray-400 text-sm font-bold w-8">
                                {index + 1}
                            </span>
                            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                                {section.title}
                            </h2>
                        </div>
                        <div className="ml-12 space-y-4">
                            {section.content &&
                                section.content.map((paragraph, idx) => (
                                    <p
                                        key={idx}
                                        className="text-gray-700 text-sm leading-relaxed"
                                    >
                                        {paragraph}
                                    </p>
                                ))}

                            {section.subsections &&
                                section.subsections.map((subsection, idx) => (
                                    <div key={idx} className="mt-4">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                            {subsection.title}
                                        </h3>

                                        {subsection.content && (
                                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                                {subsection.content}
                                            </p>
                                        )}

                                        {subsection.items && (
                                            <ul className="space-y-2 mb-3">
                                                {subsection.items.map(
                                                    (item, itemIdx) => (
                                                        <li
                                                            key={itemIdx}
                                                            className="text-gray-700 text-sm leading-relaxed flex gap-3"
                                                        >
                                                            <span className="text-gray-400">
                                                                •
                                                            </span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        )}

                                        {subsection.note && (
                                            <p className="text-gray-600 text-sm pt-3 border-t border-gray-200 italic">
                                                {subsection.note}
                                            </p>
                                        )}
                                    </div>
                                ))}

                            {section.items && (
                                <ul className="space-y-2">
                                    {section.items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="text-gray-700 text-sm leading-relaxed flex gap-3"
                                        >
                                            <span className="text-gray-400">
                                                •
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.note && (
                                <p className="text-gray-600 text-sm mt-4 pt-4 border-t border-gray-200 italic">
                                    {section.note}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 py-12">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                Need Help?
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                For any billing questions or concerns, please
                                contact our support team.
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed mt-3">
                                {config.company.name}
                                <br />
                                {config.company.address}
                                <br />
                                Email:{" "}
                                <a
                                    href={`mailto:${config.company.email}`}
                                    className="text-gray-900 hover:text-gray-600 transition-colors underline"
                                >
                                    {config.company.email}
                                </a>
                            </p>
                        </div>
                        <p className="text-xs text-gray-500 ">
                            © {new Date().getFullYear()} {config.company.name}.
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentRefundPolicy;
