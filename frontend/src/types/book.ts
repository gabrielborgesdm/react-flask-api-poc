import { Author, AuthorFormCreate } from "./author";

export interface Book {
  id: number;
  title: string;
  pages?: number;
  authors: Author[];
  authorsNames?: string;
}

export interface BookFormCreate {
  title: string;
  pages?: number;
  authors?: BookAuthorCreationPayload[];
}

export interface BookAuthorCreationPayload {
  existentAuthorId?: number;
  authorCreationPayload?: AuthorFormCreate;
}
