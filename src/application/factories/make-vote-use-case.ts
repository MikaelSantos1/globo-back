import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";
import { UpdateMovieUseCase } from "../use-cases/update-movie-use-case";
import { VoteMovieUseCase } from "../use-cases/vote-movie-use-case";

export function makeVoteUseCase() {
  const prismaMoviesRepository = new PrismaMoviesRepository();
  const voteUseCase = new VoteMovieUseCase(prismaMoviesRepository);
  return voteUseCase;
}
