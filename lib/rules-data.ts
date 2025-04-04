interface Rule {
    id: string;
    title: string;
    description: string;
}

interface Category {
    id: string;
    name: string;
    rules: Rule[];
}

export const rulesData: Category[] = [
    {
        id: "minecraft",
        name: "Майнкрафт",
        rules: [
            {
                id: "respect",
                title: "Админ всегда прав",
                description: "Админ всегда прав, даже если не прав",
            },
        ],
    },
    {
        id: "discord",
        name: "Дискорд",
        rules: [
            {
                id: "griefing",
                title: "Запрещен спам",
                description: "Запрещено спамить",
            },
        ],
    },
];
