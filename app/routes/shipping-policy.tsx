import useMetaTags from "@/lib/meta";
import { ChevronLeft } from "lucide-react";
import { Link, type MetaArgs, type MetaFunction } from "react-router";

export const meta: MetaFunction<MetaArgs> = () => {
    return useMetaTags({ title: "Shipping Policy" });
};

const ShippingPolicy = () => {
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
            title: "Shipping & Delivery Policy",
            effectiveDate: "14th Feb 2026",
            lastUpdated: "14th Feb 2026",
        },
    };

    const sections = [
        {
            id: 1,
            title: "Nature of the Product",
            content: [
                `${config.company.shortName} provides a Software-as-a-Service (SaaS) platform accessible via the internet.`,
            ],
            subsections: [
                {
                    title: "The Service includes:",
                    items: [
                        "Web-based application access",
                        "Digital dashboards",
                        "AI-powered automation features",
                        "Online reporting tools",
                        "Cloud-based storage",
                    ],
                },
                {
                    title: "Important Notice",
                    items: [
                        `${config.company.shortName} does not manufacture, sell, or ship physical goods.`,
                    ],
                },
            ],
        },
        {
            id: 2,
            title: "Digital Delivery",
            content: [
                "Upon successful registration and payment (where applicable):",
            ],
            items: [
                "Account access is granted digitally",
                "Users receive login credentials via email",
                "Access to subscribed features becomes available through the web platform",
            ],
            note: "There is no physical shipment associated with subscription plans.",
        },
        {
            id: 3,
            title: "Delivery Timeline",
            content: [
                "Digital access is typically immediate upon successful payment, or activated within a reasonable time in case of technical verification.",
            ],
            subsections: [
                {
                    title: "In rare cases of delay:",
                    items: [
                        `Users may contact ${config.company.email}`,
                        "We will resolve activation issues within reasonable timeframes",
                    ],
                },
            ],
        },
        {
            id: 4,
            title: "Geographic Availability",
            content: ["Since the Service is digital:"],
            items: [
                "It is accessible globally, subject to internet connectivity",
                "No physical shipping restrictions apply",
            ],
            note: "Users are responsible for ensuring access to compatible devices and internet connectivity.",
        },
        {
            id: 5,
            title: "Physical Materials (If Ever Applicable)",
            content: [
                `At present, ${config.company.shortName} does not ship any physical products.`,
            ],
            subsections: [
                {
                    title: "If in the future we introduce:",
                    items: [
                        "Printed materials",
                        "Physical merchandise",
                        "Hardware components",
                    ],
                },
                {
                    title: "Subsequent Policy",
                    items: ["A separate shipping policy will apply"],
                },
            ],
        },
        {
            id: 6,
            title: "Non-Delivery Claims",
            content: ["Because no physical goods are shipped:"],
            items: [
                "Claims related to lost shipments are not applicable",
                "Access issues should be reported as technical support requests",
            ],
        },
        {
            id: 7,
            title: "Force Majeure",
            content: ["Delivery of digital services may be affected by:"],
            items: [
                "Cloud provider outages",
                "Internet disruptions",
                "Third-party infrastructure failures",
            ],
            note: `${config.company.shortName} is not liable for delays caused by events beyond reasonable control.`,
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
                    <p className="text-sm text-gray-500">
                        Effective Date: {config.document.effectiveDate} | Last
                        Updated: {config.document.lastUpdated}
                    </p>
                </div>
            </div>

            {/* Introduction */}
            <div className="border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-6 py-8">
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        This Shipping & Delivery Policy applies to services
                        provided by:
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
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
                    <p className="text-gray-700 text-sm leading-relaxed">
                        ("{config.company.shortName}", "Company", "we", "us", or
                        "our")
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
                                For activation or access concerns, contact:
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
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} {config.company.name}.
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
