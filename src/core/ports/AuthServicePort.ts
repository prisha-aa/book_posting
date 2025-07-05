export interface AuthServicePort {
    registerUser(username: string, password: string): Promise<User>;