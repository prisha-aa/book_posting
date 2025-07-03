import { Book } from "../../types/Book";
import { BookRepositoryPort } from "../../core/ports/BookRepositoryPort";

export class InMemoryBookRepository implements BookRepositoryPort {
    private books: Book[] = [];

    save(book: Book) {
        this.books.push(book);
    }

    update(id: string, data: Partial<Book>) {
        const book = this.books.find((book) => book.id === id);
        if (book) {
            Object.assign(book, data);
        }
    }

    delete(id: string) {
        this.books = this.books.filter((book) => book.id !== id);
    }

    get(id: string) {
        return this.books.find((book) => book.id === id);
    }

    list(){
        return this.books;
    }
}
