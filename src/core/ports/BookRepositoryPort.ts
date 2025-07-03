import { Book } from "../../types/Book";

export interface BookRepositoryPort {
    save(book: Book): void;
    update(id:string, data:Partial<Book>): void;
    delete(id:string): void;
    get(id:string): Book | undefined;
    list(): Book[];
}
