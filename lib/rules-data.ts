export interface Rule {
    id: string;
    index: string;
    title: string;
    description: string;
}

export interface Category {
    id: string;
    name: string;
    rules: Rule[];
}
