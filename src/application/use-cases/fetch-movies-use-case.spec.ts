import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryMoviesRepository } from "@/test/repositories/in-memory-movies-repostory";
import { VoteMovieUseCase } from "./vote-movie-use-case";
import { VoteOutOfRangeError } from "./errors/vote-out-of-range-error";
import { FetchMoviesUseCase } from "./fetch-movies-use-case";

let moviesRepository: InMemoryMoviesRepository;
let sut: FetchMoviesUseCase;

describe("Fetch  movies  Use Case", () => {
  beforeEach(async () => {
    moviesRepository = new InMemoryMoviesRepository();
    sut = new FetchMoviesUseCase(moviesRepository);
    moviesRepository.genres.push({
      id: "genreId",
      name: "fake-genre",
      created_at: new Date(),
      updated_at: new Date(),
    });
    moviesRepository.create({
      description: "description",
      cast: ["castId"],
      genre_id: "genreId",
      name: "movie name",
    });
    moviesRepository.create({
      description: "description",
      cast: ["castId"],
      genre_id: "genreId",
      name: "movie 2",
    });
    moviesRepository.create({
      description: "description",
      cast: ["castId"],
      genre_id: "genreId",
      name: "movie 3",
    });
  });
  it("should be fetch a movie list ", async () => {
    const { movies } = await sut.execute();

    expect(movies.length).toEqual(3);
  });
});
