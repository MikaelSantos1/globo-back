import { UsersRepository } from "@/application/repositories/users-repository";
import { prisma } from "@/infra/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
  async update(data: Prisma.UserUpdateInput, id: string): Promise<void> {
    const { email, name, role } = data;
    await prisma.user.update({
      data: {
        email,
        name,
        role,
      },
      where: {
        id,
      },
    });
  }
}
