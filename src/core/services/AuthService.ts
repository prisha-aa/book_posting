import { AuthServicePort } from "../ports/AuthServicePort";
import { User } from "../../types/User";
import { UserRepositroyPort } from "../ports/UserRepositroyPort";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 

export class AuthService implements AuthServicePort {
    constructor(private userRepo: UserRepositroyPort) {}

    async registerUser(username: string, password: string): Promise<User> {
        const hashedPassword=await.bcrypt.hash(password, 10);
        const user: User={id:uuidv4(), username,hashedPassword};
        await this.userRepo.save(user);
        return user;
    }

    async loginUser(username: string, password: string): Promise<User> {
        const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, "your_jwt_secret", { expiresIn: "1h" });
    return token;
    }

async validateToken(token: string): Promise<User | null> {
    try {
      const decoded: any = jwt.verify(token, "your_jwt_secret");
      const user = await this.userRepo.findById(decoded.userId);
      return user;
    } catch (error) {
      return null;
    }
  }
}