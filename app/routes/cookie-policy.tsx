import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

const CookiePolicy = () => {
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
            title: "Cookie Policy",
            effectiveDate: "14th Feb 2026",
            lastUpdated: "14th Feb 2026",
        },
    };

    const sections = [
        {
            id: 1,
            title: "What Are Cookies?",
            content: [
                "Cookies are small text files placed on your device when you visit a website. They help websites recognize your device, store preferences, analyze usage, improve performance, and deliver relevant content.",
            ],
            subsections: [
                {
                    title: "Cookies may be:",
                    items: [
                        "Session Cookies (deleted when you close your browser)",
                        "Persistent Cookies (stored until expiration or deletion)",
                    ],
                },
                {
                    title: "We may also use similar technologies such as:",
                    items: [
                        "Pixels",
                        "Web beacons",
                        "Local storage",
                        "SDK-based tracking",
                        "Device fingerprinting (limited use)",
                    ],
                },
            ],
        },
        {
            id: 2,
            title: "Why We Use Cookies",
            content: [
                "We use cookies to operate and secure the platform, enable authentication, remember user preferences, analyze performance, improve user experience, detect fraud or abuse, support marketing campaigns, and measure campaign effectiveness.",
            ],
            items: [
                "Cookies help us maintain platform integrity and improve service reliability",
            ],
        },
        {
            id: 3,
            title: "Types of Cookies We Use",
            subsections: [
                {
                    title: "3.1 Strictly Necessary Cookies",
                    content:
                        "These cookies are essential for the operation of the Service.",
                    items: [
                        "Login session cookies",
                        "Authentication tokens",
                        "Security cookies",
                        "Load balancing cookies",
                    ],
                    note: "Without these, the Service may not function properly.",
                },
                {
                    title: "3.2 Performance & Analytics Cookies",
                    content:
                        "These cookies collect information about how users interact with the platform.",
                    subsectionItems: [
                        {
                            label: "We may use:",
                            items: [
                                "Google Analytics",
                                "Microsoft Clarity",
                                "Meta Pixel",
                                "Similar analytics tools",
                            ],
                        },
                        {
                            label: "Data collected may include:",
                            items: [
                                "Pages visited",
                                "Time spent",
                                "Click patterns",
                                "Device type",
                                "Browser type",
                                "IP address (masked where applicable)",
                            ],
                        },
                    ],
                    note: "This data helps us improve performance and user experience.",
                },
                {
                    title: "3.3 Functional Cookies",
                    content: "These remember preferences such as:",
                    items: [
                        "Language settings",
                        "Interface preferences",
                        "Dashboard selections",
                    ],
                    note: "They improve usability but are not strictly necessary.",
                },
                {
                    title: "3.4 Marketing & Tracking Cookies",
                    content:
                        "These cookies help measure advertising effectiveness and may be used to:",
                    items: [
                        "Track conversions",
                        "Optimize campaigns",
                        "Deliver targeted advertising",
                    ],
                    note: "We do not directly sell personal data; however, advertising partners may process anonymized data through their systems.",
                },
            ],
        },
        {
            id: 4,
            title: "AI & Automation-Related Tracking",
            content: [
                "Some AI-powered features (such as smart scans and analytics) may temporarily process interaction data to improve automation accuracy, monitor feature usage, and detect misuse.",
                "These are not advertising trackers but functional monitoring tools.",
            ],
        },
        {
            id: 5,
            title: "Third-Party Cookies",
            content: [
                "Some cookies are placed by third-party service providers, including analytics providers, payment processors, cloud hosting providers, and communication service providers.",
            ],
            items: [
                "We do not control third-party cookies",
                "Their use is governed by their respective privacy policies",
                "Users are encouraged to review those policies separately",
            ],
        },
        {
            id: 6,
            title: "International Users",
            content: [
                "If you access the Service from outside India, your data may be processed internationally and cookies may result in cross-border data transfers.",
                "By using the Service, you consent to such transfers.",
                "We do not claim formal GDPR or CCPA certification but endeavor to respect global privacy standards.",
            ],
        },
        {
            id: 7,
            title: "Consent & Control",
            content: [
                "By using the platform, you consent to the use of cookies as described in this policy.",
                "You can control cookies by:",
            ],
            items: [
                "Adjusting browser settings",
                "Blocking cookies",
                "Deleting stored cookies",
                "Using browser privacy extensions",
            ],
            note: "Please note: Disabling certain cookies may affect platform functionality.",
        },
        {
            id: 8,
            title: "Do Not Track Signals",
            content: [
                'Some browsers transmit "Do Not Track" signals.',
                "Currently, the platform does not respond differently to such signals.",
            ],
        },
        {
            id: 9,
            title: "Data Retention for Cookie Data",
            content: [
                "Cookie-related data may be retained for session duration, for predefined expiration periods, and as required for security monitoring.",
                "Analytics data may be retained in aggregated form.",
            ],
        },
        {
            id: 10,
            title: "Security of Cookie Data",
            content: [
                "We implement security measures including encrypted connections (HTTPS), secure cookie flags (where applicable), and access controls.",
            ],
            items: ["However, no online transmission is entirely secure"],
        },
        {
            id: 11,
            title: "Updates to This Cookie Policy",
            content: [
                "We may update this Cookie Policy periodically.",
                'Changes will be posted with a revised "Last Updated" date.',
                "Continued use of the Service constitutes acceptance of updates.",
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
                        This Cookie Policy explains how{" "}
                        {config.company.shortName} Technologies Private Limited
                        ("{config.company.shortName}", "Company", "we", "us", or
                        "our") uses cookies and similar tracking technologies
                        when you visit or use our website, web application, and
                        related services (the "Service").
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed ">
                        This policy should be read together with our Privacy
                        Policy and Terms & Conditions.
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
                            <h2 className="text-lg  text-gray-900 tracking-tight">
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

                                        {subsection.subsectionItems && (
                                            <div className="space-y-3 mb-3">
                                                {subsection.subsectionItems.map(
                                                    (subItem, subIdx) => (
                                                        <div key={subIdx}>
                                                            <p className="text-gray-700 text-sm font-medium mb-2">
                                                                {subItem.label}
                                                            </p>
                                                            <ul className="space-y-2">
                                                                {subItem.items.map(
                                                                    (
                                                                        item,
                                                                        itemIdx,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                itemIdx
                                                                            }
                                                                            className="text-gray-700 text-sm leading-relaxed flex gap-3"
                                                                        >
                                                                            <span className="text-gray-400">
                                                                                •
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    item
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
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
                                Contact Information
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                For questions regarding this Cookie Policy,
                                contact:
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

export default CookiePolicy;
