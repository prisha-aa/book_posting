import express from "express";
import { BookServicePort } from "../../core/ports/BookServicePort";

export function createBookApi(service: BookServicePort){
    const router=express.Router();

    router.post("/", (req, res) => {
        const book = service.createBook(req.body);
        res.status(201).json(book);
    });

    router.put("/:id", (req, res) => {
        service.updateBook(req.params.id, req.body);
});

    router.delete("/:id", (req, res) => {
        service.deleteBook(req.params.id);
        res.sendStatus(204);});

    router.get("/:id", (req, res) => {
        const book = service.getBook(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).send("Book not found");
        }
    });

    router.get("/", (req, res) => {
        const books = service.listBooks();
        res.status(200).json(books);
    });

    return router;
}   
