import { Book } from "../../types/Book";
import { BookRepositoryPort } from "../../core/ports/BookRepositoryPort";
import mongoose, { Schema, model } from "mongoose";

const BookSchema = new Schema<Book>({
    id: {type:String, required:true, unique:true},
    title: String,
    autor: String,
    publishedYear: Number
});

const BookModel = model<Book>("Book", BookSchema);

export class MongoBookRepository implements BookRepositoryPort {
     async save(book: Book)               { await new BookModel(book).save(); }
  async update(id: string, d: Partial<Book>) { await BookModel.updateOne({ id }, { $set: d }); }
  async delete(id: string)             { await BookModel.deleteOne({ id }); }
  async get(id: string)                { return await BookModel.findOne({ id }).lean() ?? undefined; }
  async list()                         { return await BookModel.find().lean(); }
}