import { Movie } from "@prisma/client";
import { MoviesRepository } from "../repositories/movie-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { VoteOutOfRangeError } from "./errors/vote-out-of-range-error";

interface VoteMovieUseCaseParams {}
interface VoteMovieUseCaseResponse {
  movies: Movie[];
}
export class FetchMoviesUseCase {
  constructor(private movieRepository: MoviesRepository) {}

  async execute(): Promise<VoteMovieUseCaseResponse> {
    const movies = await this.movieRepository.fetchMovies();
    return {
      movies,
    };
  }
}
