import type React from "react";
import "@/styles/globals.css";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
    title: "SMP Planet - Minecraft сервер",
    description: "Minecraft SMP Planet сервер с модами Fabric",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <Head>
                <link rel="icon" href="/icon.ico" sizes="any"></link>
                <link rel="favicon" href="/icon.ico" sizes="any"></link>
            </Head>
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
