import { Book, BookFormCreate } from "types/book";
import axios from "services/requestClientService";
import { Author, AuthorFormCreate } from "types/author";

export default class ManagementService {
  baseUrl = process.env.REACT_APP_API_URL;

  getBooks = async (): Promise<Book[]> => {
    let books = [];
    try {
      const url = `${this.baseUrl}/books/`;
      const response = await axios.get(url);

      if (response.data?.length) {
        books = response.data;
      }
    } catch (error) {
      console.log(error);
    }

    return books;
  };

  getAuthors = async (): Promise<Author[]> => {
    let authors = [];
    try {
      const url = `${this.baseUrl}/authors/`;
      const response = await axios.get(url);

      if (response.data?.length) {
        authors = response.data;
      }
    } catch (error) {
      console.log(error);
    }

    return authors;
  };

  createAuthor = async (data: AuthorFormCreate): Promise<Author | undefined> => {
    try {
      const url = `${this.baseUrl}/authors/`;
      const response = await axios.post(url, data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  createBook = async (data: BookFormCreate): Promise<Book | undefined> => {
    try {
      const url = `${this.baseUrl}/books/`;
      const response = await axios.post(url, data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}
