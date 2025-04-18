export interface CommunityPost {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
}

export const communityPosts: CommunityPost[] = [
    {
        id: 1,
        title: "Необычный ландшафт",
        description: "Природные красоты нашего мира",
        image: "/images/worldgen-3.webp",
        author: "yxod",
    },
    {
        id: 2,
        title: "Мост через реку",
        description: "Потрясающий мост, соединяющий два берега",
        image: "/images/bridge.webp",
        author: "gavnazhor",
    },
    {
        id: 3,
        title: "Сгенерированная структура",
        description: "Необычная библиотека рядом с эндер порталом",
        image: "/images/structure.webp",
        author: "ffi88",
    },
    {
        id: 4,
        title: "Сгенерированная структура",
        description: "Необычная структура рядом с эндер порталом",
        image: "/images/structure-2.webp",
        author: "ffi88",
    },
    {
        id: 5,
        title: "Необычный ландшафт",
        description: "Сочетание высоких гор и глубоких вод",
        image: "/images/worldgen-2.webp",
        author: "yxod",
    },
    {
        id: 6,
        title: "Амонгус",
        description: "Уникальная модель, сделанная нашим игроком",
        image: "/images/amongus.webp",
        author: "amongysikar",
    },
];
