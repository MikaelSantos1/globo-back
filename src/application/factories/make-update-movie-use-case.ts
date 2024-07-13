import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";
import { UpdateMovieUseCase } from "../use-cases/update-movie-use-case";

export function makeUpdateMovieUseCase() {
  const prismaMoviesRepository = new PrismaMoviesRepository();
  const updateMovieUseCase = new UpdateMovieUseCase(prismaMoviesRepository);
  return updateMovieUseCase;
}
