import { User } from "../../types/User";

export interface UserRepositroyPort {
    save(user: User): Promise<void>;
    findByUsername(username: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}