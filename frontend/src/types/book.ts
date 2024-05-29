import { Author } from "./author";

export interface Book {
    id: number;
    title: string;
    pages?: number;
    authors: Author[],
    authorsNames?: string;
}

export interface BookCreate {
    title: string;
    pages?: number;
    authors?: Author[],
}