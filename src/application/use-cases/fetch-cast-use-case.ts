import { Person } from "@prisma/client";
import { MoviesRepository } from "../repositories/movie-repository";

interface FetchCastUseCaseParams {}
interface FetchCastUseCaseResponse {
  persons: Person[];
}
export class FetchCastUseCase {
  constructor(private movieRepository: MoviesRepository) {}

  async execute(): Promise<FetchCastUseCaseResponse> {
    const persons = await this.movieRepository.fetchCast();
    return {
      persons,
    };
  }
}
