import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";
import { RegisterMovieUseCase } from "../use-cases/register-movie-use-case";
import { ProfileUse } from "../use-cases/profile-use-case";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";

export function makeProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const profileUseCase = new ProfileUse(prismaUsersRepository);
  return profileUseCase;
}
