import { UserRepositoryPort } from "../../core/ports/UserRepositoryPort";
import { User } from "../../core/types/User";

export class InMemoryUserRepository implements UserRepositoryPort {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }
}