import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { UpdateUserUseCase } from "../use-cases/update-user-use-case";

export function makeUpdateUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUserRepository);
  return updateUserUseCase;
}
