import { Genre, Movie } from "@prisma/client";
import { MoviesRepository } from "../repositories/movie-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { VoteOutOfRangeError } from "./errors/vote-out-of-range-error";

interface FetchGenresUseCaseParams {}
interface FetchGenresUseCaseResponse {
  genres: Genre[];
}
export class FetchGenresUseCase {
  constructor(private movieRepository: MoviesRepository) {}

  async execute(): Promise<FetchGenresUseCaseResponse> {
    const genres = await this.movieRepository.fetchGenres();
    return {
      genres,
    };
  }
}
