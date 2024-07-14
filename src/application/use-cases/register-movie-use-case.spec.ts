import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { compare } from "bcryptjs";
import { expect, describe, it } from "vitest";
import { CreateUserUseCase } from "./create-users-use-case";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
import { InMemoryMoviesRepository } from "@/test/repositories/in-memory-movies-repostory";
import { RegisterMovieUseCase } from "./register-movie-use-case";

describe("Register a movie  Use Case", () => {
  it("should be able to register a movie", async () => {
    const moviesRepository = new InMemoryMoviesRepository();
    const registerMovieUseCase = new RegisterMovieUseCase(moviesRepository);

    const { movie } = await registerMovieUseCase.execute({
      description: "description",
      cast: ["castId"],
      genreId: "genreId",
      name: "movie name",
    });

    expect(movie.id).toEqual(expect.any(String));
  });
});
