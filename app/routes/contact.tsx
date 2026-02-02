import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ArrowLeft,
    Clock,
    Mail,
    MapPin,
    MessageSquare,
    Send,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ContactPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            detail: "hello@propio.in",
            subtext: "We reply within 24 hours",
            color: "#3b82f6",
        },
        {
            icon: MapPin,
            title: "Location",
            detail: "Bangalore, India",
            subtext: "Remote-first team",
            color: "#10b981",
        },
        {
            icon: Clock,
            title: "Business Hours",
            detail: "Mon - Sat, 9AM - 6PM IST",
            subtext: "Excluding public holidays",
            color: "#8b5cf6",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-linear-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">
                                S
                            </span>
                        </div>
                        <span
                            className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Propio
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate("/")}
                            className="hidden sm:block text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate("/about")}
                            className="hidden sm:block text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            About
                        </button>
                        <Button
                            onClick={() => navigate("/signin")}
                            className="bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                            size="sm"
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")}
                        className="mb-8 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>

                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                        Have questions about Propio? We'd love to hear from you.
                        Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-8 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        {contactInfo.map((info, idx) => {
                            const Icon = info.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-xl"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                                        style={{
                                            background: `linear-gradient(135deg, ${info.color}, ${info.color}dd)`,
                                        }}
                                    >
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-1">
                                        {info.title}
                                    </h3>
                                    <p className="text-gray-900 font-medium mb-1">
                                        {info.detail}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {info.subtext}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold">
                                Send us a Message
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="name"
                                        className="text-gray-700 font-medium"
                                    >
                                        Your Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="h-12 border-2 border-gray-200 focus:border-gray-900 transition-colors"
                                        data-testid="contact-name-input"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-gray-700 font-medium"
                                    >
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="h-12 border-2 border-gray-200 focus:border-gray-900 transition-colors"
                                        data-testid="contact-email-input"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="subject"
                                    className="text-gray-700 font-medium"
                                >
                                    Subject
                                </Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    required
                                    className="h-12 border-2 border-gray-200 focus:border-gray-900 transition-colors"
                                    data-testid="contact-subject-input"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="message"
                                    className="text-gray-700 font-medium"
                                >
                                    Message
                                </Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us more about your inquiry..."
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors resize-none"
                                    data-testid="contact-message-input"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto bg-linear-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
                                data-testid="contact-submit-btn"
                            >
                                {isSubmitting ? (
                                    <>Sending...</>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="ml-2 w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 bg-linear-to-b from-gray-50/50 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Is Propio free to use?",
                                a: "Yes! Propio is free for 1 property. For multiple properties, we have affordable plans starting at ₹99/month.",
                            },
                            {
                                q: "Do I need accounting knowledge to use Propio?",
                                a: "Not at all. Propio is designed for property owners, not accountants. If you can use Excel, you can use Propio.",
                            },
                            {
                                q: "Can I export my data?",
                                a: "Absolutely. You can export your property data to Excel or PDF anytime, perfect for sharing with your accountant.",
                            },
                            {
                                q: "Is my data secure?",
                                a: "Yes. We use industry-standard encryption and security practices to keep your financial data safe.",
                            },
                        ].map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all"
                            >
                                <h3 className="text-lg font-semibold mb-2">
                                    {faq.q}
                                </h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 border-t border-gray-700">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-linear-to-br from-white to-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-900 font-bold">S</span>
                        </div>
                        <span className="font-bold">Propio</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                        © 2025 Propio. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
