import { UsersRepository } from "@/application/repositories/users-repository";
import { Prisma, $Enums, User } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public itens: User[] = [];
  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      is_active: true,
      role: "USER",
    };
    this.itens.push(user);
    return user;
  }
  async findByEmail(email: string) {
    const user = this.itens.find((item) => item.email === email);
    if (!user) {
      return null;
    }
    return user;
  }
  async update(data: Omit<Prisma.UserUpdateInput, "password">, id: string) {
    const index = this.itens.findIndex((item) => item.id === id);

    const user = this.itens[index];

    if (data.name) {
      user.name = data.name as string;
    }
    if (data.email) {
      user.email = data.email as string;
    }

    if (data.role) {
      user.role = data.role as "ADMIN" | "USER";
    }

    this.itens[index] = user;
  }
  async disable(userId: string) {
    const index = this.itens.findIndex((item) => item.id === userId);

    const user = this.itens[index];

    user.is_active = false;

    this.itens[index] = user;
  }
}
