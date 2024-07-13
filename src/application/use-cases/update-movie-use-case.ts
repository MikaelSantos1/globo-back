import { prisma } from "@/infra/lib/prisma";

import { UsersRepository } from "@/application/repositories/users-repository";
import { hash } from "bcryptjs";

import { Movie, User } from "@prisma/client";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
import {
  MoviesRepository,
  UpdateMovieDTO,
} from "../repositories/movie-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateMovieUseCaseParams {
  name?: string;
  description?: string;
  genreId?: string;
  movieId: string;
  cast?: string[];
}
interface UpdateMovieUseCaseResponse {}
export class UpdateMovieUseCase {
  constructor(private movieRepository: MoviesRepository) {}

  async execute({
    name,
    description,
    genreId,
    movieId,
    cast,
  }: UpdateMovieUseCaseParams): Promise<void> {
    const movie: UpdateMovieDTO | null = await this.movieRepository.findById(
      movieId
    );

    if (!movie) {
      throw new ResourceNotFoundError();
    }
    movie.name = name ?? movie.name;
    movie.description = description ?? movie.description;
    movie.genre_id = genreId ?? movie.genre_id;
    movie.cast = cast ?? movie.cast;
    await this.movieRepository.save(movie);
  }
}
