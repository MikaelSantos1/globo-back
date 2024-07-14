import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryMoviesRepository } from "@/test/repositories/in-memory-movies-repostory";
import { VoteMovieUseCase } from "./vote-movie-use-case";
import { VoteOutOfRangeError } from "./errors/vote-out-of-range-error";
import { FetchMoviesUseCase } from "./fetch-movies-use-case";
import { SearchMoviesUseCase } from "./search-movies-use-case";
import { GetMovieDetailsUseCase } from "./get-movie-details-use-case";

let moviesRepository: InMemoryMoviesRepository;
let sut: GetMovieDetailsUseCase;

describe("Get movie details  Use Case", () => {
  beforeEach(async () => {
    moviesRepository = new InMemoryMoviesRepository();
    sut = new GetMovieDetailsUseCase(moviesRepository);
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
      id: "1",
    });
  });
  it("should be to get  movie details ", async () => {
    const { movie } = await sut.execute({ movieId: "1" });

    expect(movie).toEqual(
      expect.objectContaining({
        name: "movie name",
      })
    );
  });
});
