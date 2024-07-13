import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";
import { RegisterMovieUseCase } from "../use-cases/register-movie-use-case";
import { FetchMoviesUseCase } from "../use-cases/fetch-movies-use-case";

export function makeFetchMoviesUseCase() {
  const prismaMoviesRepository = new PrismaMoviesRepository();
  const fetchMoviesUseCase = new FetchMoviesUseCase(prismaMoviesRepository);
  return fetchMoviesUseCase;
}
