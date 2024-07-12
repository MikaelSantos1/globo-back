import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { UpdateUserUseCase } from "../use-cases/update-user-use-case";
import { DisableUserUseCase } from "../use-cases/disable-user-use-case";

export function makeDisableUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const disableUserUseCase = new DisableUserUseCase(prismaUserRepository);
  return disableUserUseCase;
}
