import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { CreateUserUseCase } from "../use-cases/create-users-use-case";
import { AuthenticateUseCase } from "../use-cases/authenticate";

export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const authenticaterUseCase = new AuthenticateUseCase(prismaUserRepository);
  return authenticaterUseCase;
}
