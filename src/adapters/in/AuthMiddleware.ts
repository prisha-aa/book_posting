import { Request, Response, NextFunction } from "express";
import { AuthServicePort } from "../../core/ports/AuthServicePort";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function authMiddleware(authService: AuthServicePort) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send("Token missing");
    }

    const user = await authService.validateToken(token);
    if (!user) {
      return res.status(403).send("Invalid token");
    }

    req.user = user; // Attach user information to the request
    next();
  };
}