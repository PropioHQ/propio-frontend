import { Link } from "react-router";
import { motion } from "motion/react";
import dayjs from "dayjs";

export function Footer() {
    const currentYear = dayjs().get("year");
    return (
        <motion.footer
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-slate-950 text-white py-20 px-6 relative overflow-hidden"
        >
            <div className="max-w-6xl mx-auto relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
                    {/* Brand */}
                    <div className="sm:col-span-2">
                        <Link to="/">
                            <img
                                src="/assets/logo-dark.png"
                                className="h-7 w-auto"
                            />
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-sm mb-4 sm:mb-6 text-sm sm:text-base">
                            Replace Excel with clarity. Simple property finance
                            tracking for homestay owners managing 3-25
                            properties.
                        </p>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>All systems operational</span>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold mb-4 sm:mb-6 text-white text-sm sm:text-base">
                            Product
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                            <a
                                href="#features"
                                className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Features
                            </a>
                            <a
                                href="#pricing"
                                className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Pricing
                            </a>
                            <a
                                href="#how-it-works"
                                className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                                How It Works
                            </a>
                            <Link
                                to="/signin"
                                className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4 sm:mb-6 text-white text-sm sm:text-base">
                            Legal
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                            <a
                                href="#"
                                className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left">
                        © {currentYear} Propio. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-right">
                        Made with clarity in mind
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}
