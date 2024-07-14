import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryMoviesRepository } from "@/test/repositories/in-memory-movies-repostory";
import { VoteMovieUseCase } from "./vote-movie-use-case";
import { VoteOutOfRangeError } from "./errors/vote-out-of-range-error";

let moviesRepository: InMemoryMoviesRepository;
let sut: VoteMovieUseCase;

describe("Vote  movie  Use Case", () => {
  beforeEach(async () => {
    moviesRepository = new InMemoryMoviesRepository();
    sut = new VoteMovieUseCase(moviesRepository);
  });
  it("should be able to vote a movie", async () => {
    await sut.execute({
      movieId: "movieId",
      rating: 3,
    });

    expect(moviesRepository.votes[0].movie_id).toEqual("movieId");
  });
  it("should not be able to vote a if vote rating is out of range", async () => {
    await expect(() =>
      sut.execute({
        movieId: "movieId",
        rating: 5,
      })
    ).rejects.toBeInstanceOf(VoteOutOfRangeError);
  });
});
