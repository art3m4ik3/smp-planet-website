"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    DiscIcon as Discord,
    Download,
    ExternalLink,
    Loader2,
    Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { PageEffects } from "@/components/page-effects";
import { communityPosts } from "@/lib/community-data";
import { useSeasonEffect } from "@/hooks/use-season-effect";
import Link from "next/link";
import Footer from "@/components/footer";

interface LauncherInfo {
    version: string;
    url: string;
}

interface ModInfo {
    name: string;
    hash: string;
}

export default function Home() {
    const seasonEffect = useSeasonEffect();
    const [pageEffect, setPageEffect] = useState<
        "none" | "sakura" | "leaves" | "autumn" | "snow"
    >(seasonEffect);
    const [customTexture, setCustomTexture] = useState<string | undefined>(
        undefined
    );
    const [launcherInfo, setLauncherInfo] = useState<LauncherInfo | null>(null);
    const [modList, setModList] = useState<string[]>([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const formatModName = (name: string) => {
            let formattedName = name.replace(/-\d+\.\d+\.\d+.*$/, "");
            formattedName = formattedName.replace(/\([^)]*\)/g, "");
            return formattedName
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
                .trim();
        };

        fetch("/api/version-info")
            .then((response) => response.json())
            .then((data) => setLauncherInfo(data))
            .catch((error) =>
                console.error("Failed to fetch launcher info:", error)
            );

        fetch("/api/get_list_mods")
            .then((response) => response.json())
            .then((data: ModInfo[]) => {
                const formattedMods = data
                    .map((mod) => formatModName(mod.name))
                    .filter((name) => name)
                    .sort();
                setModList(formattedMods);
            })
            .catch((error) =>
                console.error("Failed to fetch mod list:", error)
            );
    }, []);

    useEffect(() => {
        setPageEffect(seasonEffect);
    }, [seasonEffect]);

    const handleDownload = () => {
        if (launcherInfo) {
            setIsDownloading(true);
            setTimeout(() => {
                window.location.href = launcherInfo.url;
                setTimeout(() => setIsDownloading(false), 1000);
            }, 1500);
        }
    };

    const toggleEffect = (
        effect: "none" | "sakura" | "leaves" | "autumn" | "snow"
    ) => {
        setPageEffect(effect);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCustomTexture(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
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

    return (
        <div
            className="flex flex-col min-h-screen bg-[#1e2030] text-gray-200"
            suppressHydrationWarning
        >
            {process.env.NODE_ENV === "development" && (
                <div className="fixed bottom-4 right-4 z-50 bg-[#27293b] p-3 rounded-lg shadow-lg border border-[#4a5173]">
                    <div className="text-xs font-bold mb-2">
                        Эффекты страницы (только для разработки)
                    </div>
                    <div className="flex gap-2 mb-2">
                        {(
                            [
                                "none",
                                "sakura",
                                "leaves",
                                "autumn",
                                "snow",
                            ] as const
                        ).map((effect) => (
                            <button
                                key={effect}
                                onClick={() => toggleEffect(effect)}
                                className={`px-2 py-1 text-xs rounded ${
                                    pageEffect === effect
                                        ? "bg-[#4a5173] text-white"
                                        : "bg-[#1e2030] text-gray-400"
                                }`}
                            >
                                {effect}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2 py-1 text-xs rounded bg-[#1e2030] text-gray-400 flex items-center gap-1"
                        >
                            <Upload size={12} /> Своя текстура
                        </button>
                        {customTexture && (
                            <button
                                onClick={() => setCustomTexture(undefined)}
                                className="px-2 py-1 text-xs rounded bg-[#4a5173] text-white"
                            >
                                Сбросить
                            </button>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>
            )}

            <PageEffects effect={pageEffect} customTexture={customTexture} />

            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e2030]"></div>
                    <div className="absolute inset-0 bg-[#1e2030]/70"></div>
                    <img
                        src="/images/main.png"
                        alt="Minecraft Главная"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="container relative z-10 px-4 md:px-6">
                    <motion.div
                        className="text-center space-y-6"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeIn}>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
                                SMP Planet
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                                Премиальный Minecraft SMP сервер с модами Fabric
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                            variants={fadeIn}
                        >
                            <Button
                                size="lg"
                                className="bg-[#4a5173] hover:bg-[#5a6183] text-white"
                                onClick={() =>
                                    document
                                        .getElementById("join")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                Присоединиться
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-[#4a5173] text-gray-300 hover:bg-[#2a2d40]"
                                onClick={() =>
                                    document
                                        .getElementById("mods")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                Наши моды
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ArrowRight className="h-6 w-6 rotate-90 text-gray-400" />
                </div>
            </section>

            <section id="mods" className="py-20 bg-[#1e2030] relative">
                <div
                    className="absolute top-0 left-0 w-full h-16 bg-[#1e2030]"
                    style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                ></div>
                <div
                    className="absolute bottom-0 left-0 w-full h-16 bg-[#1e2030]"
                    style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
                ></div>
                <div className="container px-4 md:px-6 relative z-10">
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Наши моды Fabric
                        </h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Мы тщательно отобрали моды, которые улучшают
                            геймплей, не меняя основной опыт Minecraft. Все моды
                            автоматически устанавливаются с нашим лаунчером.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {[
                            {
                                title: "Sodium",
                                description:
                                    "Оптимизация производительности сервера",
                                icon: "⚡",
                            },
                            {
                                title: "Fabric API",
                                description: "Основное API для модов Fabric",
                                icon: "🧩",
                            },
                            {
                                title: "Voice Chat",
                                description:
                                    "Голосовой чат для погружения в игру",
                                icon: "🎤",
                            },
                            {
                                title: "Terrablender",
                                description:
                                    "Улучшенная генерация мира с новыми биомами",
                                icon: "🏔️",
                            },
                            {
                                title: "Effective Minecraft Inventory",
                                description: "Удобное управление инвентарем",
                                icon: "📦",
                            },
                            {
                                title: "Create",
                                description: "Один из наших техно-модов",
                                icon: "🗺️",
                            },
                        ].map((mod, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#27293b] border-2 border-[#3a3d52] rounded-xl p-6 hover:border-[#4a5173] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(30,32,48,0.5)] group"
                                variants={fadeIn}
                            >
                                <div className="text-4xl mb-4">{mod.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#8a91b3] transition-colors duration-300">
                                    {mod.title}
                                </h3>
                                <p className="text-gray-400">
                                    {mod.description}
                                </p>
                                <div className="h-1 w-0 bg-[#4a5173] mt-4 group-hover:w-full transition-all duration-500"></div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-12 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <Accordion
                            type="single"
                            collapsible
                            className="max-w-3xl mx-auto"
                        >
                            <AccordionItem
                                value="item-1"
                                className="border-[#3a3d52]"
                            >
                                <AccordionTrigger className="text-white hover:text-[#8a91b3]">
                                    Посмотреть полный список модов
                                </AccordionTrigger>
                                <AccordionContent className="text-left grid md:grid-cols-2 gap-2 text-gray-300">
                                    {modList.map((mod, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-[#4a5173]"></div>
                                            <span>{mod}</span>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-[#27293b] relative">
                <div
                    className="absolute bottom-0 left-0 w-full h-16 bg-[#27293b]"
                    style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
                ></div>
                <div className="container px-4 md:px-6">
                    <motion.div
                        className="grid md:grid-cols-2 gap-12 items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeIn}>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                О нашем сервере
                            </h2>
                            <p className="text-gray-300 mb-4">
                                SMP Planet — это премиальный Minecraft сервер
                                для выживания, построенный на модификациях
                                Fabric. Наш сервер предлагает уникальное
                                сочетание ванильного геймплея с тщательно
                                подобранными модами, которые улучшают качество
                                игры, не меняя основной опыт Minecraft.
                            </p>
                            <p className="text-gray-300 mb-4">
                                Наше сообщество ориентировано на сотрудничество,
                                творчество и уважительный геймплей. Независимо
                                от того, являетесь ли вы строителем, инженером
                                редстоуна, исследователем или просто
                                наслаждаетесь социальными аспектами Minecraft,
                                вы найдете свое место на SMP Planet.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <div className="bg-[#1e2030] p-4 rounded-lg flex items-center gap-3">
                                    <div className="bg-[#4a5173] p-2 rounded-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-white"
                                        >
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">
                                            Защита от гриферства
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            Ваши постройки в безопасности
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#1e2030] p-4 rounded-lg flex items-center gap-3">
                                    <div className="bg-[#4a5173] p-2 rounded-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-white"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                            <circle
                                                cx="9"
                                                cy="7"
                                                r="4"
                                            ></circle>
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">
                                            Активное сообщество
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            Заведи новых друзей
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#1e2030] p-4 rounded-lg flex items-center gap-3">
                                    <div className="bg-[#4a5173] p-2 rounded-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-white"
                                        >
                                            <path d="M12 3v19"></path>
                                            <path d="M5 8h14"></path>
                                            <path d="M5 16h14"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">
                                            Регулярные события
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            Никогда не будет скучно
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative h-[400px] rounded-xl overflow-hidden transform rotate-3 shadow-[0_0_25px_rgba(74,81,115,0.5)]"
                            variants={fadeIn}
                        >
                            <img
                                src="/images/builds.png"
                                alt="Скриншот сервера"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2030]/80 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white font-medium">
                                    Наша красивая стартовая зона
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Построена нашим талантливым сообществом
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section
                id="join"
                className="py-20 bg-[#27293b] relative overflow-hidden"
            >
                <div
                    className="absolute top-0 left-0 w-full h-16 bg-[#27293b]"
                    style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                ></div>
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#27293b] via-[#27293b]/95 to-[#27293b]"></div>

                <div className="container relative z-10 px-4 md:px-6">
                    <motion.div
                        className="max-w-3xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeIn}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                Присоединяйтесь к нам
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Готовы начать свое приключение на SMP Planet?
                                Следуйте этим простым шагам, чтобы
                                присоединиться к нашему сообществу:
                            </p>
                        </motion.div>

                        <div className="space-y-10">
                            <motion.div
                                variants={fadeIn}
                                className="flex gap-6 items-start"
                            >
                                <div className="bg-[#4a5173] text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xl font-bold">
                                    1
                                </div>
                                <div className="bg-[#1e2030] p-6 rounded-xl flex-1 transform hover:-rotate-1 transition-transform duration-300">
                                    <h3 className="text-xl font-medium text-white mb-3">
                                        Присоединяйтесь к нашему Discord
                                    </h3>
                                    <p className="text-gray-400 mb-4">
                                        Общайтесь с нашим сообществом и будьте в
                                        курсе обновлений
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
                                            <Discord className="mr-2 h-4 w-4" />
                                            Присоединиться к Discord
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeIn}
                                className="flex gap-6 items-start"
                            >
                                <div className="bg-[#4a5173] text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xl font-bold">
                                    2
                                </div>
                                <div className="bg-[#1e2030] p-6 rounded-xl flex-1 transform hover:rotate-1 transition-transform duration-300">
                                    <h3 className="text-xl font-medium text-white mb-3">
                                        Подайте заявку на вайтлист
                                    </h3>
                                    <p className="text-gray-400 mb-4">
                                        Посетите наш сайт для подачи заявки на
                                        вайтлист
                                    </p>
                                    <Button
                                        className="bg-[#4a5173] hover:bg-[#5a6183] text-white"
                                        asChild
                                    >
                                        <a
                                            href="https://wl.smp-planet.fun"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Подать заявку
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeIn}
                                className="flex gap-6 items-start"
                            >
                                <div className="bg-[#4a5173] text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xl font-bold">
                                    3
                                </div>
                                <div className="bg-[#1e2030] p-6 rounded-xl flex-1 transform hover:-rotate-1 transition-transform duration-300">
                                    <h3 className="text-xl font-medium text-white mb-3">
                                        Скачайте наш лаунчер
                                    </h3>
                                    <p className="text-gray-400 mb-4">
                                        Наш лаунчер автоматически установит все
                                        необходимые моды
                                        {launcherInfo && (
                                            <span className="block mt-1 text-xs">
                                                Текущая версия:{" "}
                                                {launcherInfo.version}
                                            </span>
                                        )}
                                    </p>
                                    <Button
                                        className="bg-[#4a5173] hover:bg-[#5a6183] text-white relative overflow-hidden group"
                                        onClick={handleDownload}
                                        disabled={
                                            isDownloading || !launcherInfo
                                        }
                                    >
                                        {isDownloading ? (
                                            <>
                                                <span className="absolute inset-0 w-1/3 h-full bg-white/20 skew-x-12 animate-[shimmer_1s_infinite]"></span>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                                Загрузка...
                                            </>
                                        ) : (
                                            <>
                                                <Download className="mr-2 h-4 w-4" />{" "}
                                                Скачать лаунчер
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={fadeIn}
                            className="mt-12 text-center"
                        >
                            <Button
                                variant="outline"
                                className="border-[#4a5173] text-gray-300 hover:bg-[#2a2d40]"
                                asChild
                            >
                                <a
                                    href="https://wiki.smp-planet.fun"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />{" "}
                                    Посетить наше Wiki
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-[#1e2030] relative">
                <div
                    className="absolute top-0 left-0 w-full h-16 bg-[#1e2030]"
                    style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                ></div>
                <div className="container px-4 md:px-6 relative z-10">
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Наше сообщество
                        </h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Присоединяйтесь к дружелюбному и творческому
                            сообществу любителей Minecraft. Посмотрите некоторые
                            из построек наших игроков и общественных
                            мероприятий.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {communityPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                className="relative rounded-xl overflow-hidden group"
                                variants={fadeIn}
                            >
                                <img
                                    loading="lazy"
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2030] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-medium">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm mb-1">
                                        {post.description}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        Автор: {post.author}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-12 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <Button
                            variant="outline"
                            className="border-[#4a5173] text-gray-300 hover:bg-[#2a2d40]"
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
            </section>

            <section className="py-20 bg-[#27293b] relative">
                <div
                    className="absolute top-0 left-0 w-full h-16 bg-[#27293b]"
                    style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                ></div>
                <div className="container px-4 md:px-6">
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Часто задаваемые вопросы
                        </h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Есть вопросы о нашем сервере? Найдите ответы на
                            распространенные вопросы ниже.
                        </p>
                    </motion.div>

                    <motion.div
                        className="max-w-3xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <Accordion type="single" collapsible className="w-full">
                            {[
                                {
                                    question:
                                        "На какой версии Minecraft работает сервер?",
                                    answer: "Наш сервер работает на стабильной версии Minecraft с модификациями Fabric. В настоящее время мы используем Minecraft 1.20.1.",
                                },
                                {
                                    question:
                                        "Нужно ли устанавливать моды вручную?",
                                    answer: "Нет, наш лаунчер автоматически установит все необходимые моды. Просто скачайте лаунчер, войдите в свой аккаунт, и вы готовы к игре!",
                                },
                                {
                                    question:
                                        "Есть ли возрастные ограничения для присоединения?",
                                    answer: "Да, мы хотим, чтобы игрокам было не менее 12 лет, чтобы поддерживать зрелую атмосферу сообщества. Однако мы не запрещаем игрокам младше 12 лет присоединяться, если они могут следовать нашим правилам.",
                                },
                                {
                                    question:
                                        "Сколько времени занимает процесс рассмотрения заявки?",
                                    answer: "Обычно мы рассматриваем заявки в течение 48 часов. Вы получите уведомление в Discord, как только ваша заявка будет обработана.",
                                },
                                {
                                    question: "Есть ли правила на сервере?",
                                    answer: "Да, у нас есть правила. Полные правила доступны на странице правил или на нашем сервере Discord. Ознакомиться с правилами можно ",
                                    link: {
                                        text: "здесь",
                                        href: "/rules",
                                    },
                                },
                            ].map((faq, index) => (
                                <motion.div key={index} variants={fadeIn}>
                                    <AccordionItem
                                        value={`item-${index}`}
                                        className="border-[#3a3d52]"
                                    >
                                        <AccordionTrigger className="text-white hover:text-[#8a91b3]">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-300">
                                            {faq.answer}
                                            {faq.link && (
                                                <Link
                                                    href={faq.link.href}
                                                    className="text-[#4a5173] hover:text-[#5a6183] underline"
                                                >
                                                    {faq.link.text}
                                                </Link>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
