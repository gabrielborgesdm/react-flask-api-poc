export interface Author {
    id: number;
    name: string;
    email?: string;
    nationality: string;
    birthDate?: string;
    books: []
}