import { prisma } from "@/infra/lib/prisma";

import { UsersRepository } from "@/application/repositories/users-repository";
import { hash } from "bcryptjs";

import { Movie, User } from "@prisma/client";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
import { MoviesRepository } from "../repositories/movie-repository";

interface RegisterMovieUseCaseParams {
  name: string;
  description: string;
  genreId: string;
  cast?: string[];
}
interface RegisterMovieUseCaseResponse {
  movie: Movie;
}
export class RegisterMovieUseCase {
  constructor(private movieRepository: MoviesRepository) {}

  async execute({
    name,
    description,
    genreId,
    cast,
  }: RegisterMovieUseCaseParams): Promise<RegisterMovieUseCaseResponse> {
    const movie = await this.movieRepository.create({
      name,
      description,
      genre_id: genreId,
      cast: cast,
    });
    return {
      movie,
    };
  }
}
