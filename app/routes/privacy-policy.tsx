import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

const PrivacyPolicy = () => {
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
            title: "Privacy Policy",
            effectiveDate: "14th Feb 2026",
            lastUpdated: "14th Feb 2026",
        },
    };

    const sections = [
        {
            id: 1,
            title: "Scope of This Policy",
            content: [
                "This Privacy Policy applies to website visitors, registered users, customers and subscribers, individuals interacting through integrations (including WhatsApp), and individuals whose data is uploaded by users into the system.",
                "This policy applies globally. However, the governing law remains Indian Law.",
            ],
        },
        {
            id: 2,
            title: "Types of Data Collected",
            subsections: [
                {
                    title: "Personal Information",
                    items: [
                        "Full name",
                        "Email address",
                        "Phone number (including WhatsApp number)",
                        "Location (city, state, country)",
                        "Account credentials",
                        "Company or property information",
                    ],
                },
                {
                    title: "Financial & Operational Data",
                    items: [
                        "Booking details",
                        "Expense records",
                        "Vendor information",
                        "Uploaded documents (e.g., receipts, compliance documents)",
                        "Invoice data",
                        "Transaction metadata",
                    ],
                },
                {
                    title: "Device & Technical Information",
                    items: [
                        "IP address",
                        "Browser type",
                        "Operating system",
                        "Device identifiers",
                        "Log files",
                        "Session timestamps",
                    ],
                },
                {
                    title: "Behavioral & Analytics Data",
                    items: [
                        "Pages visited",
                        "Click behavior",
                        "Time spent",
                        "Feature usage",
                        "Heatmaps (via analytics tools)",
                    ],
                },
                {
                    title: "Cookies & Tracking Data",
                    items: [
                        "Google Analytics",
                        "Meta Pixel",
                        "Microsoft Clarity",
                        "Other performance tracking tools",
                    ],
                },
                {
                    title: "AI-Processed Data",
                    items: [
                        "Smart scanning",
                        "Natural language processing",
                        "Automation workflows",
                        "Document extraction",
                    ],
                },
            ],
        },
        {
            id: 3,
            title: "Method of Collection",
            content: [
                "We collect information through user registration forms, profile updates, manual data entry, document uploads, WhatsApp bot interaction, automated tracking technologies (cookies, pixels, analytics), cloud infrastructure logging, and payment gateway integrations.",
                "We do not knowingly collect data without user interaction or lawful basis.",
            ],
        },
        {
            id: 4,
            title: "Purpose of Data Collection",
            items: [
                "Account creation and authentication",
                "Service delivery and feature functionality",
                "AI-powered automation (smart scans, analysis, insights)",
                "Compliance reminders",
                "Customer support",
                "Payment processing",
                "Service performance improvement",
                "Security monitoring and fraud prevention",
                "Marketing communication (where permitted)",
                "Legal compliance and dispute resolution",
            ],
            note: "We do not sell personal data.",
        },
        {
            id: 5,
            title: "Data Sharing & Disclosure",
            subsections: [
                {
                    title: "Service Providers",
                    items: [
                        "Cloud hosting providers",
                        "Payment gateway aggregators",
                        "Analytics providers",
                        "AI processing providers",
                        "Communication service providers (including WhatsApp APIs)",
                    ],
                },
                {
                    title: "Legal Authorities",
                    items: [
                        "When required by law, court order, or regulatory authority",
                    ],
                },
                {
                    title: "Business Transfers",
                    items: [
                        "In case of merger, acquisition, restructuring, or sale",
                    ],
                },
                {
                    title: "Aggregated Data",
                    items: [
                        "We may share anonymized and aggregated data for benchmarking and analytics",
                    ],
                },
            ],
        },
        {
            id: 6,
            title: "International Data Transfers",
            content: [
                "Data may be stored or processed outside your country of residence.",
                "By using the Service, you consent to cross-border transfer of data, storage on global cloud infrastructure, and processing by third-party vendors.",
                "We rely on contractual safeguards where applicable but do not claim specific certifications such as GDPR certification.",
            ],
        },
        {
            id: 7,
            title: "Data Security Measures",
            items: [
                "Encryption (in transit and at rest where applicable)",
                "Secure access controls",
                "Role-based permissions",
                "Firewall protections",
                "Cloud infrastructure safeguards",
                "Periodic monitoring",
            ],
            note: "However, no system is completely secure. Users acknowledge inherent internet risks. Cloud providers maintain independent compliance certifications. Propio does not independently certify or guarantee cloud infrastructure compliance.",
        },
        {
            id: 8,
            title: "Data Retention",
            content: [
                "We retain personal data for as long as the account remains active, as required for legal or contractual obligations, and for dispute resolution and enforcement.",
                "Users may request deletion subject to legal and operational constraints. Backups may persist for a limited period.",
            ],
        },
        {
            id: 9,
            title: "User Rights",
            content: [
                "Depending on jurisdiction, users may have rights to access personal data, rectify inaccurate data, request deletion, restrict processing, withdraw consent (where applicable), and data portability (where technically feasible).",
                `Requests may be submitted to ${config.company.email}. We may require identity verification before fulfilling requests.`,
            ],
        },
        {
            id: 10,
            title: "WhatsApp & Communication",
            items: [
                "Storage of phone numbers",
                "Communication through messaging APIs",
                "Processing of messages necessary for service delivery",
            ],
            note: "Users may opt out of marketing communications at any time.",
        },
        {
            id: 11,
            title: "Compliance Documents & Government IDs",
            content: [
                "We do not require users to upload government identification documents.",
                "If users voluntarily upload sensitive documents, they remain responsible for lawful upload. We disclaim liability for content uploaded without legal basis.",
            ],
        },
        {
            id: 12,
            title: "Children's Privacy",
            content: [
                "The Service is not intended for individuals under 18 years of age.",
                "We do not knowingly collect data from minors.",
            ],
        },
        {
            id: 13,
            title: "AI & Automated Decision-Making",
            items: [
                "Smart scanning",
                "Insight generation",
                "Document parsing",
                "Data summarization",
            ],
            note: "AI outputs are informational only. We do not guarantee accuracy or legal validity of AI-generated content.",
        },
        {
            id: 14,
            title: "Limitation of Liability",
            items: [
                "Propio is not liable for third-party infrastructure failures",
                "Propio is not responsible for user-uploaded unlawful content",
                "Propio does not guarantee uninterrupted service",
                "Users acknowledge inherent risks of digital platforms",
            ],
        },
        {
            id: 15,
            title: "Updates to This Policy",
            content: [
                "We may update this Privacy Policy periodically.",
                'Material changes will be posted on the website and updated with a new "Last Updated" date. Continued use constitutes acceptance.',
            ],
        },
        {
            id: 16,
            title: "Governing Law & Jurisdiction",
            content: [
                `This Privacy Policy is governed by ${config.company.governingLaw}.`,
                `Disputes shall fall under the jurisdiction of courts located in ${config.company.jurisdiction}.`,
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
                        {config.company.shortName}
                        ("Company", "we", "us", or "our") operates a
                        Software-as-a-Service (SaaS) platform that enables
                        property owners and managers to track financial,
                        booking, and operational information.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        This Privacy Policy describes how we collect, use,
                        disclose, store, and protect your personal data when you
                        access or use our website, web application, mobile
                        interfaces, integrations (including WhatsApp
                        integrations), and related services.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed ">
                        By accessing or using our Service, you acknowledge that
                        you have read, understood, and agree to this Privacy
                        Policy.
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
                            <span className="text-gray-400 text-sm w-8 font-bold">
                                {index + 1}
                            </span>
                            <h2 className="text-lg text-gray-900 font-bold tracking-tight">
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
                            © {new Date().getFullYear()} {config.company.name}.
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
