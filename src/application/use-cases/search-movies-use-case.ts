import { Movie } from "@prisma/client";
import { MoviesRepository } from "../repositories/movie-repository";

interface SearchMoviesUseCaseParams {
  query: string;
}
interface SearchMoviesUseCaseResponse {
  movies: Movie[];
}
export class SearchMoviesUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    query,
  }: SearchMoviesUseCaseParams): Promise<SearchMoviesUseCaseResponse> {
    const movies = await this.moviesRepository.searchMany(query);

    return {
      movies,
    };
  }
}
