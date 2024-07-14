import { Movie, Prisma, User } from "@prisma/client";

export interface CreateMovieDTO extends Prisma.MovieUncheckedCreateInput {
  cast?: string[];
}

export interface UpdateMovieDTO extends Movie {
  cast?: string[];
}
export interface MovieResponse extends Movie {
  rating?: number | null;
}
export interface MoviesRepository {
  create(data: CreateMovieDTO): Promise<Movie>;
  save(data: UpdateMovieDTO): Promise<void>;
  findById(id: string): Promise<MovieResponse | null>;
  vote(movieId: string, rating: number): Promise<void>;
  fetchMovies(): Promise<Movie[]>;
  searchMany(q: string): Promise<Movie[]>;
  getMovieDetails(id: string): Promise<MovieResponse | null>;
}