export interface Author {
  id: number;
  name: string;
  email?: string;
  nationality: string;
  birthDate?: string;
}

export interface AuthorFormCreate {
  id?: number;
  name?: string;
  email?: string;
  nationality?: string;
  birthDate?: string;
}
