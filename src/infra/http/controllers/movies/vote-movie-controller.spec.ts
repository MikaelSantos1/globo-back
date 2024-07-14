import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, beforeEach } from "vitest";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { prisma } from "@/infra/lib/prisma";
import { makeGenre } from "@/test/factories/make-genre";
import { makeMovie } from "@/test/factories/make-movie-";

describe("Vote movie  (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search a movie  ", async () => {
    const { token } = await createAndAuthenticateUser(app, false);
    const movie = await makeMovie();
    const response = await request(app.server)
      .post(`/movie/vote/${movie.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rating: 3,
      });
    expect(response.statusCode).toEqual(201);
  });
});
