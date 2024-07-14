import { Movie } from "@prisma/client";
import {
  MovieResponse,
  MoviesRepository,
} from "../repositories/movie-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetMovieDetailsUseCaseParams {
  movieId: string;
}
interface GetMovieDetailsUseCaseResponse {
  movie: MovieResponse;
}
export class GetMovieDetailsUseCase {
  constructor(private movieRepository: MoviesRepository) {}

  async execute({
    movieId,
  }: GetMovieDetailsUseCaseParams): Promise<GetMovieDetailsUseCaseResponse> {
    const movie = await this.movieRepository.getMovieDetails(movieId);
    if (!movie) {
      throw new ResourceNotFoundError();
    }
    return {
      movie,
    };
  }
}
