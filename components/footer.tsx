import { DiscIcon as Discord } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-8 bg-[#1e2030] border-t border-[#3a3d52]">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            src="/icon.webp"
                            alt="SMP Planet Logo"
                            className="h-8 w-8"
                        />
                        <span className="text-white font-bold">SMP Planet</span>
                    </div>

                    <div className="flex gap-6">
                        <a
                            href="https://discord.gg/K232dB3RKC"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Discord className="h-5 w-5" />
                            <span className="sr-only">Discord</span>
                        </a>
                        <a
                            href="https://wiki.smp-planet.fun"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                                <path d="M9.1 9a3 3 0 0 1 5.8 0"></path>
                                <path d="M6.2 12a6 6 0 0 1 11.6 0"></path>
                            </svg>
                            <span className="sr-only">Wiki</span>
                        </a>
                        <a
                            href="https://wl.smp-planet.fun"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span className="sr-only">Вайтлист</span>
                        </a>
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-500 text-sm">
                    <p>
                        SMP Planet © {new Date().getFullYear()}. Все права
                        защищены.
                    </p>
                </div>
            </div>
        </footer>
    );
}
