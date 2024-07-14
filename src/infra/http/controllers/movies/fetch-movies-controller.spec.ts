import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, beforeEach } from "vitest";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { prisma } from "@/infra/lib/prisma";
import { makeGenre } from "@/test/factories/make-genre";

describe("Fetch movies  (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch a movie list ", async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const genre = await makeGenre();
    await request(app.server)
      .post(`/movie/register`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "movie name",
        description: "movie-description",
        genreId: genre.id,
        cast: [],
      });

    const response = await request(app.server)
      .get(`/movies`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(200);
  });
});
