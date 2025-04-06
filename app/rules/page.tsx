"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, DiscIcon as Discord } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/footer";
import { Category } from "@/lib/rules-data";

export default function RulesPage() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [rules, setRules] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/rules")
            .then((response) => response.json())
            .then((data) => {
                if (!Array.isArray(data) || data.length === 0) {
                    setError(
                        "Не удалось загрузить правила. Пожалуйста, попробуйте позже."
                    );
                    return;
                }
                setRules(data);
                setActiveCategory(data[0].id);
            })
            .catch((error) => {
                console.error("Failed to fetch rules:", error);
                setError("Произошла ошибка при загрузке правил.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Suspense
            fallback={
                <div className="flex flex-col min-h-screen bg-[#1e2030] text-gray-200">
                    <header className="py-6 bg-[#27293b] border-b border-[#3a3d52]">
                        <div className="container px-4 md:px-6">
                            <Link href="/" className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                                <span className="text-xl font-bold text-white">
                                    SMP Planet
                                </span>
                            </Link>
                        </div>
                    </header>
                    <main className="flex-1 py-20">
                        <div className="container px-4 md:px-6">
                            <p className="text-center text-gray-300">
                                Loading...
                            </p>
                        </div>
                    </main>
                    <Footer />
                </div>
            }
        >
            <RulesContent
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                rules={rules}
                loading={loading}
                error={error}
            />
        </Suspense>
    );
}

function RulesContent({
    activeCategory,
    setActiveCategory,
    rules,
    loading,
    error,
}: {
    activeCategory: string | null;
    setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
    rules: Category[];
    loading: boolean;
    error: string | null;
}) {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!searchParams) return;
        const category = searchParams.get("category");
        if (category) {
            setActiveCategory(category);
        }
    }, [searchParams]);

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6 },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-[#1e2030] text-gray-200">
                <header className="py-6 bg-[#27293b] border-b border-[#3a3d52]">
                    <div className="container px-4 md:px-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <span className="text-xl font-bold text-white">
                                SMP Planet
                            </span>
                        </Link>
                    </div>
                </header>
                <main className="flex-1 py-20">
                    <div className="container px-4 md:px-6">
                        <p className="text-center text-gray-300">Loading...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-[#1e2030] text-gray-200">
                <header className="py-6 bg-[#27293b] border-b border-[#3a3d52]">
                    <div className="container px-4 md:px-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <span className="text-xl font-bold text-white">
                                SMP Planet
                            </span>
                        </Link>
                    </div>
                </header>
                <main className="flex-1 py-20">
                    <div className="container px-4 md:px-6">
                        <p className="text-center text-red-400">{error}</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#1e2030] text-gray-200">
            <header className="py-6 bg-[#27293b] border-b border-[#3a3d52]">
                <div className="container px-4 md:px-6">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <span className="text-xl font-bold text-white">
                                SMP Planet
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 py-20">
                <div className="container px-4 md:px-6">
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            Правила сервера
                        </h1>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Наши правила созданы для обеспечения справедливой и
                            приятной игровой среды для всех участников.
                            Пожалуйста, ознакомьтесь с ними внимательно.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mb-12 overflow-x-auto"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="flex space-x-2 min-w-max pb-2">
                            {rules.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() =>
                                        setActiveCategory(category.id)
                                    }
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        activeCategory === category.id
                                            ? "bg-[#4a5173] text-white"
                                            : "bg-[#27293b] text-gray-400 hover:bg-[#323548] hover:text-gray-300"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        {activeCategory &&
                            rules
                                .find((c) => c.id === activeCategory)
                                ?.rules.map((rule) => (
                                    <motion.div
                                        key={rule.id}
                                        className="bg-[#27293b] border border-[#3a3d52] rounded-xl p-6 hover:border-[#4a5173] transition-all duration-300"
                                        variants={fadeIn}
                                    >
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            <span className="text-gray-400 mr-2">
                                                {rule.index}
                                            </span>
                                            {rule.title}
                                        </h3>
                                        <p className="text-gray-300 whitespace-pre-line">
                                            {rule.description}
                                        </p>
                                    </motion.div>
                                ))}
                    </motion.div>

                    <motion.div
                        className="mt-12 bg-[#27293b] border border-[#3a3d52] rounded-xl p-6"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Важная информация
                        </h2>
                        <p className="text-gray-300 mb-4">
                            Правила могут обновляться со временем.
                            Ответственность за ознакомление с текущей версией
                            правил лежит на игроках. Незнание правил не
                            освобождает от ответственности за их нарушение.
                        </p>
                        <p className="text-gray-300 mb-6">
                            Если у вас есть вопросы относительно правил или вы
                            хотите сообщить о нарушении, пожалуйста, свяжитесь с
                            администрацией в Discord.
                        </p>
                        <Button
                            className="bg-[#5865F2] hover:bg-[#4752c4] text-white"
                            asChild
                        >
                            <a
                                href="https://discord.gg/K232dB3RKC"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Discord className="mr-2 h-4 w-4" />{" "}
                                Присоединиться к Discord
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
