import { User } from "../../types/User";


export interface AuthServicePort {
    registerUser(username: string, password: string): Promise<User>;
    loginUser(username: string, password: string): Promise<User>;
    validateToken(token: string): Promise<User | null>;
}