import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, beforeEach } from "vitest";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { prisma } from "@/infra/lib/prisma";
import { makeGenre } from "@/test/factories/make-genre";

describe("Register a  movie   (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be  to able register a movie", async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const genre = await makeGenre();
    const response = await request(app.server)
      .post(`/movie/register`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "movie name",
        description: "movie-description",
        genreId: genre.id,
        cast: [],
      });

    expect(response.statusCode).toEqual(201);
  });
});
