
export interface User {
  id: string;
  username: string;
  hashedPassword?: string; // Optional for cases where you don't need to expose it
}
