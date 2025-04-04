import { useEffect, useState } from "react";

type Season = "none" | "winter" | "spring" | "summer" | "autumn";
type PageEffect = "none" | "sakura" | "leaves" | "autumn" | "snow";

export function useSeasonEffect(): PageEffect {
    const [season, setSeason] = useState<Season>("none");

    useEffect(() => {
        const determineCurrentSeason = () => {
            const now = new Date();
            const month = now.getMonth();

            if (month >= 2 && month <= 4) return "spring";
            if (month >= 5 && month <= 7) return "summer";
            if (month >= 8 && month <= 10) return "autumn";
            return "winter";
        };

        setSeason(determineCurrentSeason());
    }, []);

    const seasonToEffect = (): PageEffect => {
        switch (season) {
            case "spring":
                return "sakura";
            case "summer":
                return "leaves";
            case "autumn":
                return "autumn";
            case "winter":
                return "snow";
            default:
                return "none";
        }
    };

    return seasonToEffect();
}
