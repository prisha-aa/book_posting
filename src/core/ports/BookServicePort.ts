import { Book } from "../../types/Book";

export interface BookServicePort {
  createBook(data: Omit<Book, "id">): Book;
  updateBook(id: string, data: Partial<Book>): void;
  deleteBook(id: string): void;
  getBook(id: string): Book | undefined;
  listBooks(): Book[];
}
