
import express from "express";
import { AuthServicePort } from "../../core/ports/AuthServicePort";

export function createAuthApi(service: AuthServicePort) {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await service.registerUser(username, password);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await service.loginUser(username, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).send(error.message);
    }
  });

  return router;
}