import {
  CreateMovieDTO,
  MovieResponse,
  MoviesRepository,
  UpdateMovieDTO,
} from "@/application/repositories/movie-repository";
import {
  Genre,
  Movie,
  MovieCast,
  MovieRating,
  Person,
  Prisma,
} from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryMoviesRepository implements MoviesRepository {
  private movies: Movie[] = [];
  public votes: MovieRating[] = [];
  private movieCast: MovieCast[] = [];
  private persons: Person[] = [];
  public genres: Genre[] = [];

  async searchMany(q: string) {
    const query = q.toLowerCase();

    const filteredMovies = this.movies.filter((movie) => {
      const genre = this.genres.find((genre) => genre.id === movie.genre_id);
      const cast = this.movieCast
        .filter((mc) => mc.movie_id === movie.id)
        .map((mc) => {
          const person = this.persons.find(
            (person) => person.id === mc.person_id
          );
          return person ? person.name.toLowerCase().includes(query) : false;
        });

      return (
        movie.name.toLowerCase().includes(query) ||
        (genre && genre.name.toLowerCase().includes(query)) ||
        cast.some(Boolean)
      );
    });

    const movies: MovieResponse[] = filteredMovies.map((movie) => {
      const genre =
        this.genres.find((genre) => genre.id === movie.genre_id) || null;
      const cast = this.movieCast
        .filter((mc) => mc.movie_id === movie.id)
        .map((mc) => {
          const person =
            this.persons.find((person) => person.id === mc.person_id) || null;
          return { ...mc, person };
        });

      return {
        ...movie,
        genre,
        movieCast: cast,
      };
    });

    return movies;
  }

  async fetchMovies() {
    const movies: MovieResponse[] = this.movies.map((movie) => {
      const genre =
        this.genres.find((genre) => genre.id === movie.genre_id) || null;
      const cast = this.movieCast
        .filter((mc) => mc.movie_id === movie.id)
        .map((mc) => {
          const person =
            this.persons.find((person) => person.id === mc.person_id) || null;
          return { ...mc, person };
        });

      return {
        ...movie,
        genre,
        movieCast: cast,
      };
    });

    return movies;
  }
  async getMovieDetails(id: string): Promise<MovieResponse | null> {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) return null;

    const genre =
      this.genres.find((genre) => genre.id === movie.genre_id) || null;
    const cast = this.movieCast
      .filter((mc) => mc.movie_id === movie.id)
      .map((mc) => {
        const person =
          this.persons.find((person) => person.id === mc.person_id) || null;
        return { ...mc, person };
      });

    const movieDetails = {
      ...movie,
      genre,
      movieCast: cast,
    };

    return movieDetails;
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
      id: data.id || randomUUID(),
      description: data.description,
      genre_id: data.genre_id,
      name: data.name,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.movies.push(newMovie);
    const movieCast = data?.cast?.map((item) => ({
      id: randomUUID(),
      movie_id: newMovie.id,
      person_id: item,
    }));
    if (movieCast && movieCast.length > 0) {
      this.movieCast.push(...movieCast);
    }
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
