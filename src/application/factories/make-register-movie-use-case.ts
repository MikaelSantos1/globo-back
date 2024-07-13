import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";
import { RegisterMovieUseCase } from "../use-cases/register-movie-use-case";

export function makeRegisterMovieUseCase() {
  const prismaMoviesRepository = new PrismaMoviesRepository();
  const registerMovieUseCase = new RegisterMovieUseCase(prismaMoviesRepository);
  return registerMovieUseCase;
}
