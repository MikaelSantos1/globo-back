import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";

import { GetMovieDetailsUseCase } from "../use-cases/get-movie-details-use-case";

export function makeGetMovieDetailsUseCase() {
  const prismaMoviesRepository = new PrismaMoviesRepository();
  const getMovieDetailsUseCase = new GetMovieDetailsUseCase(
    prismaMoviesRepository
  );
  return getMovieDetailsUseCase;
}
