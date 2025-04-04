"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type EffectType = "none" | "sakura" | "leaves" | "autumn" | "snow";

interface PageEffectsProps {
    effect: EffectType;
    customTexture?: string;
}

export function PageEffects({ effect, customTexture }: PageEffectsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const gsapLoadedRef = useRef(false);
    const timelineRef = useRef<any>(null);
    const effectRef = useRef<EffectType>("none");

    useEffect(() => {
        effectRef.current = effect;
    }, [effect]);

    useEffect(() => {
        if (
            effect === "none" ||
            !gsapLoadedRef.current ||
            !containerRef.current
        ) {
            return;
        }

        if (timelineRef.current) {
            timelineRef.current.kill();
            timelineRef.current = null;
        }

        const container =
            containerRef.current.querySelector("#particleContainer");
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        initParticles(effect, customTexture);

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }
        };
    }, [effect, customTexture, gsapLoadedRef.current]);

    const initParticles = (effect: EffectType, customTexture?: string) => {
        if (!window.gsap || !containerRef.current) return;

        const gsap = window.gsap;
        const select = (s: string) => containerRef.current?.querySelector(s);
        const mainSVG = select("#particleSVG");
        const container = select("#particleContainer");
        const particleTemplate = select(".particle") as SVGPathElement;

        if (!mainSVG || !container || !particleTemplate) return;

        const mainTl = gsap.timeline();
        timelineRef.current = mainTl;

        gsap.set(mainSVG, {
            visibility: "visible",
        });

        const getColors = () => {
            switch (effect) {
                case "snow":
                    return [
                        "rgba(255, 255, 255, 0.8)",
                        "rgba(255, 255, 255, 0.6)",
                        "rgba(255, 255, 255, 0.4)",
                        "rgba(255, 255, 255, 0.3)",
                    ];
                case "sakura":
                    return [
                        "rgba(255, 183, 197, 0.7)",
                        "rgba(255, 192, 203, 0.5)",
                        "rgba(248, 200, 220, 0.4)",
                        "rgba(250, 221, 225, 0.3)",
                    ];
                case "leaves":
                    return [
                        "rgba(76, 175, 80, 0.7)",
                        "rgba(139, 195, 74, 0.5)",
                        "rgba(124, 179, 66, 0.4)",
                        "rgba(102, 187, 106, 0.3)",
                    ];
                case "autumn":
                    return [
                        "rgba(230, 92, 0, 0.7)",
                        "rgba(242, 161, 84, 0.5)",
                        "rgba(217, 83, 79, 0.4)",
                        "rgba(255, 204, 128, 0.3)",
                    ];
                default:
                    return [
                        "rgba(104, 77, 205, 0.7)",
                        "rgba(117, 95, 207, 0.5)",
                        "rgba(137, 116, 214, 0.3)",
                        "rgba(104, 88, 159, 0.3)",
                    ];
            }
        };

        const getParticlePath = () => {
            switch (effect) {
                case "snow":
                    return "M7.5,0C3.36,0,0,3.36,0,7.5S3.36,15,7.5,15S15,11.64,15,7.5S11.64,0,7.5,0z";
                case "sakura":
                    return "M12 2C12 2 14 5 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 5 12 2 12 2ZM12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14ZM12 22C12 22 10 19 10 16C10 14.9 10.9 14 12 14C13.1 14 14 14.9 14 16C14 19 12 22 12 22ZM22 12C22 12 19 14 16 14C14.9 14 14 13.1 14 12C14 10.9 14.9 10 16 10C19 10 22 12 22 12ZM2 12C2 12 5 10 8 10C9.1 10 10 10.9 10 12C10 13.1 9.1 14 8 14C5 14 2 12 2 12Z";
                case "leaves":
                    return "M17.9 17.39C17.64 16.59 16.89 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.77 20 8.64 20 12C20 14.08 19.2 15.97 17.9 17.39M11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.78 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 2 12 2Z";
                case "autumn":
                    return "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z";
                default:
                    return "M14.75,7.69c0,4.14-3.85,8.56-7.5,7.5C3.28,14,0,10.84,0,6.7S3.3,1.42,7.25.19,14.75,3.55,14.75,7.69Z";
            }
        };

        particleTemplate.setAttribute("d", getParticlePath());

        const getParticleAnim = () => {
            const clone = particleTemplate.cloneNode(true) as SVGPathElement;
            container?.appendChild(clone);

            const viewBox = mainSVG
                ?.getAttribute("viewBox")
                ?.split(" ")
                .map(Number) || [0, 0, 800, 600];
            const viewWidth = viewBox[2];
            const viewHeight = viewBox[3];

            const pos = {
                x: Math.random() * viewWidth * 1.5,
                y: Math.random() * viewHeight - viewHeight * 0.5,
            };

            const colors = getColors();

            gsap.set(clone, {
                transformOrigin: "50% 50%",
                scale: 0,
                x: pos.x,
                y: pos.y,
                fill: gsap.utils.random(colors),
                opacity: 0,
            });

            const duration = gsap.utils.random(15, 30);

            const endX = pos.x - viewWidth * 1.5;
            const endY = pos.y + viewHeight * 1.5;

            const tl = gsap.timeline({
                repeat: -1,
                repeatDelay: gsap.utils.random(0, 2),
                defaults: {
                    ease: "linear",
                },
            });

            tl.to(clone, {
                scale: gsap.utils.random(0.1, effect === "snow" ? 0.2 : 0.4),
                opacity: gsap.utils.random(0.4, 0.8),
                ease: "sine.in",
                duration: 1,
            })

                .to(
                    clone,
                    {
                        x: endX,
                        y: endY,
                        duration: duration,
                        ease: "none",
                    },
                    0
                )

                .to(
                    clone,
                    {
                        rotation: gsap.utils.random(-360, 360),
                        duration: duration,
                        ease: "none",
                    },
                    0
                )

                .to(
                    clone,
                    {
                        opacity: 0,
                        scale: 0,
                        duration: 2,
                        ease: "sine.out",
                    },
                    duration - 2
                );

            return tl;
        };

        const init = () => {
            const num = effect === "snow" ? 300 : 200;

            for (let i = 0; i < num; i++) {
                const delay = gsap.utils.random(0, 15);
                const particleAnim = getParticleAnim();
                mainTl.add(particleAnim, delay);
            }

            mainTl.seek(gsap.utils.random(10, 20));
        };

        init();
    };

    const handleGsapLoad = () => {
        gsapLoadedRef.current = true;

        if (effectRef.current !== "none") {
            initParticles(effectRef.current, customTexture);
        }
    };

    if (effect === "none") {
        return null;
    }

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"
                onLoad={handleGsapLoad}
                strategy="afterInteractive"
            />

            <div
                ref={containerRef}
                className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
            >
                <svg
                    id="particleSVG"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 800 600"
                    style={{
                        visibility: "hidden",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <defs>
                        <path
                            className="particle"
                            d="M14.75,7.69c0,4.14-3.85,8.56-7.5,7.5C3.28,14,0,10.84,0,6.7S3.3,1.42,7.25.19,14.75,3.55,14.75,7.69Z"
                        />
                    </defs>
                    <g id="particleContainer" fill="#FFF"></g>
                </svg>
            </div>
        </>
    );
}

declare global {
    interface Window {
        gsap: any;
    }
}
