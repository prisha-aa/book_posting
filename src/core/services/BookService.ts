import { Book } from "../../types/Book";
import { BookServicePort } from "../ports/BookServicePort";
import { BookRepositoryPort } from "../ports/BookRepositoryPort";

export class BookService implements BookServicePort {
    constructor(private repo: BookRepositoryPort) {}

    createBook(data: Omit<Book, "id">): Book {
        const book = {id:uuidv4(), ...data};
        this.repo.save(book);
        return book;
    }

    updateBook(id: string, data: Partial<Book>): void {
        this.repo.update(id, data);
    }

    deleteBook(id:string){
        this.repo.delete(id);
    }

    getBook(id:string){
        return this.repo.get(id);   
    }

    listBooks(){
        return this.repo.list() 
    }
}