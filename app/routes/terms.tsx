import useMetaTags from "@/lib/meta";
import { ChevronLeft } from "lucide-react";
import { Link, type MetaArgs, type MetaFunction } from "react-router";

export const meta: MetaFunction<MetaArgs> = () => {
    return useMetaTags({ title: "Terms & Conditions" });
};

const TermsAndConditions = () => {
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
            title: "Terms and Conditions",
            effectiveDate: "14th Feb 2026",
            lastUpdated: "14th Feb 2026",
        },
    };

    const sections = [
        {
            id: 1,
            title: "Nature of the Service",
            content: [
                `${config.company.shortName} provides a Software-as-a-Service (SaaS) platform designed to assist property owners and managers in tracking bookings, expenses, compliance information, and related operational data.`,
            ],
            subsections: [
                {
                    title: "Propio:",
                    items: [
                        "Is NOT an accounting firm",
                        "Is NOT a tax advisor",
                        "Is NOT a legal advisor",
                        "Is NOT a licensed financial institution",
                        "Is NOT a Property Management System (PMS)",
                    ],
                },
                {
                    title: "Important Notice",
                    items: [
                        "All outputs, reports, and AI-generated responses are informational only.",
                    ],
                },
            ],
        },
        {
            id: 2,
            title: "Eligibility",
            subsections: [
                {
                    title: "You must:",
                    items: [
                        "Be at least 18 years old",
                        "Have legal capacity to enter contracts",
                        "Use the Service for lawful purposes",
                    ],
                },
                {
                    title: "Acknowledgment",
                    items: [
                        "By registering, you confirm you meet these conditions.",
                    ],
                },
            ],
        },
        {
            id: 3,
            title: "Account Registration",
            content: ["To access features, you must create an account."],
            subsections: [
                {
                    title: "You agree to:",
                    items: [
                        "Provide accurate information",
                        "Maintain confidentiality of login credentials",
                        "Notify us immediately of unauthorized access",
                    ],
                },
                {
                    title: "Responsibility",
                    items: [
                        "You are fully responsible for activity under your account.",
                    ],
                },
            ],
        },
        {
            id: 4,
            title: "Subscription & Payment Terms",
            subsections: [
                {
                    title: "4.1 Pricing",
                    items: [
                        "Subscriptions are billed monthly or annually based on selected plan.",
                    ],
                },
                {
                    title: "4.2 Payment Processing",
                    items: [
                        "Payments are processed through third-party payment gateways and aggregators.",
                        "Propio does not store full card details",
                        "Propio is not responsible for payment gateway failures",
                    ],
                },
                {
                    title: "4.3 Renewals",
                    items: [
                        "Subscriptions automatically renew unless cancelled prior to renewal date.",
                    ],
                },
                {
                    title: "4.4 Refund Policy",
                    items: [
                        "Unless otherwise stated, fees are non-refundable",
                        "Partial month usage is not refunded",
                        "Downgrades take effect next billing cycle",
                    ],
                },
            ],
        },
        {
            id: 5,
            title: "Acceptable Use",
            content: ["You agree NOT to:"],
            items: [
                "Upload unlawful or fraudulent data",
                "Upload government IDs or sensitive documents without legal authority",
                "Reverse engineer the platform",
                "Abuse AI features",
                "Attempt system intrusion",
                "Use automated scraping tools",
            ],
            note: "Violation may result in suspension or termination.",
        },
        {
            id: 6,
            title: "User-Generated Content",
            content: [
                "You retain ownership of your uploaded data.",
                "However, you grant Propio a limited license to store, process, analyze, and transmit such data strictly for providing services.",
            ],
            subsections: [
                {
                    title: "You are solely responsible for ensuring:",
                    items: [
                        "Lawful upload",
                        "Proper consent for third-party data",
                        "No infringement of rights",
                    ],
                },
                {
                    title: "Liability Disclaimer",
                    items: ["Propio is not liable for user-uploaded content."],
                },
            ],
        },
        {
            id: 7,
            title: "AI & Automation Disclaimer",
            content: [
                `${config.company.shortName} may use third-party AI systems for smart document scanning, data extraction, natural language insights, compliance parsing, and demand signals.`,
            ],
            subsections: [
                {
                    title: "You acknowledge:",
                    items: [
                        "AI outputs may contain inaccuracies",
                        "AI insights are informational only",
                        "No legal or financial advice is provided",
                        "Propio disclaims liability for decisions based on AI output",
                    ],
                },
            ],
        },
        {
            id: 8,
            title: "WhatsApp & Communication Integrations",
            content: ["If you enable WhatsApp or messaging integrations:"],
            items: [
                "You consent to processing of your phone number",
                "You authorize message transmission via third-party APIs",
                "You accept risks inherent in messaging platforms",
                "Propio is not liable for outages or data exposure caused by messaging providers",
            ],
        },
        {
            id: 9,
            title: "Third-Party Services",
            content: [
                "The platform integrates with cloud hosting providers, analytics services, payment gateways, AI providers, and communication APIs.",
                `${config.company.shortName} does not control third-party infrastructure and is not liable for their failures.`,
            ],
        },
        {
            id: 10,
            title: "Data Storage & International Transfers",
            content: [
                "Data may be stored on global cloud infrastructure and outside your country of residence.",
                "By using the Service, you consent to cross-border data transfers.",
            ],
        },
        {
            id: 11,
            title: "Intellectual Property",
            content: [
                "All platform content, including software, UI/UX design, branding, code, and documentation, is the intellectual property of Propio.",
            ],
            items: [
                "You may not copy, resell, modify, or redistribute",
                "Written consent is required for any use beyond the Service",
            ],
        },
        {
            id: 12,
            title: "Service Availability",
            content: [
                "We strive for high uptime but do not guarantee uninterrupted service, error-free performance, or continuous availability.",
            ],
            items: ["Scheduled maintenance may occur"],
        },
        {
            id: 13,
            title: "Limitation of Liability",
            content: [
                "To the maximum extent permitted by law, Propio shall NOT be liable for:",
            ],
            items: [
                "Indirect or consequential damages",
                "Loss of profits",
                "Business interruption",
                "Data loss beyond reasonable control",
                "Third-party infrastructure failures",
            ],
            note: "Total liability shall not exceed the amount paid by you in the preceding 3 months.",
        },
        {
            id: 14,
            title: "Indemnification",
            content: [
                "You agree to indemnify and hold harmless Propio from claims arising from:",
            ],
            items: [
                "Your misuse of the Service",
                "Your violation of laws",
                "Your uploaded content",
                "Breach of these Terms",
            ],
        },
        {
            id: 15,
            title: "Termination",
            subsections: [
                {
                    title: "We may suspend or terminate accounts if:",
                    items: [
                        "Terms are violated",
                        "Fraud is detected",
                        "Legal obligations require",
                    ],
                },
                {
                    title: "Your Rights",
                    items: [
                        "You may terminate at any time via account cancellation.",
                    ],
                },
            ],
        },
        {
            id: 16,
            title: "Compliance Responsibility",
            content: [
                "Users are solely responsible for tax filings, legal compliance, government renewals, and regulatory adherence.",
            ],
            items: [
                "Propio provides reminders only and does not guarantee compliance",
            ],
        },
        {
            id: 17,
            title: "Benchmarking & Aggregated Insights",
            content: [
                "We may generate anonymized, aggregated data for benchmarking and analytics.",
                "No personally identifiable information will be disclosed.",
            ],
        },
        {
            id: 18,
            title: "Changes to Terms",
            content: [
                "We may update these Terms periodically.",
                'Updated Terms will be published with a revised "Last Updated" date.',
                "Continued use constitutes acceptance.",
            ],
        },
        {
            id: 19,
            title: "Governing Law & Jurisdiction",
            content: [
                `These Terms are governed by ${config.company.governingLaw}.`,
                `Disputes shall be subject to the exclusive jurisdiction of courts in ${config.company.jurisdiction}.`,
            ],
        },
        {
            id: 20,
            title: "Force Majeure",
            content: [
                `${config.company.shortName} is not liable for failure caused by:`,
            ],
            items: [
                "Natural disasters",
                "War",
                "Government restrictions",
                "Internet outages",
                "Third-party service disruptions",
            ],
        },
        {
            id: 21,
            title: "Severability",
            content: [
                "If any clause is held invalid, remaining clauses remain enforceable.",
            ],
        },
        {
            id: 22,
            title: "Entire Agreement",
            content: [
                `These Terms, along with the Privacy Policy, constitute the entire agreement between you and ${config.company.shortName}.`,
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
                        These Terms and Conditions ("Terms") govern access to
                        and use of the services provided by:
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
                        ("{config.company.shortName}", "Company", "we", "us",
                        "our")
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        By accessing or using the {config.company.shortName}{" "}
                        platform ("Service"), you agree to be legally bound by
                        these Terms.
                    </p>
                    <p className="text-sm leading-relaxed  text-gray-700">
                        If you do not agree, you must discontinue use
                        immediately.
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
                                        <ul className="space-y-2">
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
                                Contact Information
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
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
                            © {new Date().getFullYear()} {config.company.name}{" "}
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
