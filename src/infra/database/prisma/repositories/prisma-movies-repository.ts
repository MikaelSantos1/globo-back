import {
  CreateMovieDTO,
  MovieResponse,
  MoviesRepository,
  UpdateMovieDTO,
} from "@/application/repositories/movie-repository";
import { prisma } from "@/infra/lib/prisma";
import { Genre } from "@prisma/client";

export class PrismaMoviesRepository implements MoviesRepository {
  async fetchGenres(): Promise<Genre[]> {
    const genres = await prisma.genre.findMany();
    return genres;
  }
  async searchMany(q: string) {
    const movies: MovieResponse[] = await prisma.movie.findMany({
      include: {
        genre: true,
        movieCast: {
          include: {
            person: true,
          },
        },
      },
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            genre: {
              name: {
                contains: q,
                mode: "insensitive",
              },
            },
          },
          {
            movieCast: {
              some: {
                person: {
                  name: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        ],
      },
    });

    return movies;
  }

  async fetchMovies() {
    const movies: MovieResponse[] = await prisma.movie.findMany({
      include: {
        genre: true,
        movieCast: {
          include: {
            person: true,
          },
        },
      },
    });

    return movies;
  }
  async vote(movieId: string, rating: number): Promise<void> {
    await prisma.movieRating.create({
      data: {
        movie_id: movieId,
        rating,
      },
    });
  }
  async create(data: CreateMovieDTO) {
    const { description, genre_id, name, created_at, cast } = data;

    const movie = await prisma.movie.create({
      data: {
        description,
        genre_id,
        name,
        created_at,
        movieCast: {
          create: cast?.map((castId) => ({
            person_id: castId,
          })),
        },
      },
    });
    return movie;
  }
  async save(data: UpdateMovieDTO) {
    const { description, genre_id, name, created_at, cast } = data;
    await prisma.movie.update({
      where: {
        id: data.id as string,
      },
      data: {
        description,
        genre_id,
        name,
        created_at,

        movieCast: {
          create: cast?.map((castId) => ({
            person_id: castId,
          })),
        },
      },
    });
  }
  async findById(id: string) {
    const movie: MovieResponse | null = await prisma.movie.findFirst({
      where: {
        id,
      },
    });

    return movie;
  }
  async getMovieDetails(id: string) {
    const movie: MovieResponse | null = await prisma.movie.findFirst({
      where: {
        id,
      },
      include: {
        genre: true,
        movieCast: {
          include: {
            person: true,
          },
        },
      },
    });
    if (movie) {
      const { _avg } = await prisma.movieRating.aggregate({
        _avg: {
          rating: true,
        },
        where: {
          movie_id: movie.id,
        },
      });
      movie.rating = _avg.rating ? Number(_avg.rating) : null;
    }

    return movie;
  }
}
