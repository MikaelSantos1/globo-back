import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, beforeEach } from "vitest";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { prisma } from "@/infra/lib/prisma";
import { makeGenre } from "@/test/factories/make-genre";

describe("Get movie detail  (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be  to able get a movie detail ", async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const genre = await makeGenre();
    const movie = await request(app.server)
      .post(`/movie/register`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "movie name",
        description: "movie-description",
        genreId: genre.id,
        cast: [],
      });
    const movieId = movie.body.id;
    const response = await request(app.server)
      .get(`/movie/${movieId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(200);
  });
});
