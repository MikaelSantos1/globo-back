import { MoviesRepository } from "../repositories/movie-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { VoteOutOfRangeError } from "./errors/vote-out-of-range-error";

interface VoteMovieUseCaseParams {
  movieId: string;
  rating: number;
}
interface VoteMovieUseCaseResponse {}
export class VoteMovieUseCase {
  constructor(private movieRepository: MoviesRepository) {}

  async execute({ movieId, rating }: VoteMovieUseCaseParams): Promise<void> {
    if (rating < 0 || rating > 4) {
      throw new VoteOutOfRangeError();
    }
    await this.movieRepository.vote(movieId, rating);
  }
}
