import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";
import { UpdateMovieUseCase } from "../use-cases/update-movie-use-case";
import { SearchMoviesUseCase } from "../use-cases/search-movies-use-case";

export function makeSearchMoviesUseCase() {
  const prismaMoviesRepository = new PrismaMoviesRepository();
  const searchMoviesUseCase = new SearchMoviesUseCase(prismaMoviesRepository);
  return searchMoviesUseCase;
}
