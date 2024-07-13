import {
  CreateMovieDTO,
  MovieResponse,
  MoviesRepository,
  UpdateMovieDTO,
} from "@/application/repositories/movie-repository";
import { Movie, MovieRating, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryMoviesRepository implements MoviesRepository {
  private movies: Movie[] = [];
  private votes: MovieRating[] = [];
  async searchMany(q: string) {
    const filteredMovies = this.movies.filter((movie) =>
      movie.name.toLowerCase().includes(q.toLowerCase())
    );
    return filteredMovies;
  }

  async fetchMovies() {
    return this.movies;
  }

  async vote(movieId: string, rating: number): Promise<void> {
    const vote: MovieRating = {
      movie_id: movieId,
      rating: rating as unknown as Prisma.Decimal,
      created_at: new Date(),
      id: randomUUID(),
    };
    await this.votes.push(vote);
  }

  async create(data: CreateMovieDTO) {
    const newMovie: Movie = {
      id: randomUUID(),
      description: data.description,
      genre_id: data.genre_id,
      name: data.name,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  async save(data: Movie) {
    const checkInIndex = this.movies.findIndex((item) => item.id === data.id);
    if (checkInIndex >= 0) {
      this.movies[checkInIndex] = data;
    }
  }

  async findById(id: string) {
    const movie = this.movies.find((movie) => movie.id === id);
    return movie || null;
  }
}
