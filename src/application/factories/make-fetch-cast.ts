import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";
import { RegisterMovieUseCase } from "../use-cases/register-movie-use-case";
import { FetchMoviesUseCase } from "../use-cases/fetch-movies-use-case";
import { FetchCastUseCase } from "../use-cases/fetch-cast-use-case";

export function makeFetchCastUseCase() {
  const prismaMoviesRepository = new PrismaMoviesRepository();
  const fetchCastUseCase = new FetchCastUseCase(prismaMoviesRepository);
  return fetchCastUseCase;
}
