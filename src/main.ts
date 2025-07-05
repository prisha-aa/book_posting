import express from "express";
import { BookService } from "./core/services/BookService";
import { InMemoryBookRepository } from "./adapters/out/InMemoryBookRepository";
import { createBookApi } from "./adapters/in/BookApiController";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


const repo = new InMemoryBookRepository();
const service = new BookService(repo);
const bookApi = createBookApi(service);

app.use("/books", bookApi);

app.listen(3000, () => {
  console.log("Book app running at http://localhost:3000");
});
