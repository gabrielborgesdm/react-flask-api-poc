import { Author } from "./author";

export interface Book {
    id: number;
    title: string;
    pages?: number;
    authors: Author[],
    authorsNames?: string;
}