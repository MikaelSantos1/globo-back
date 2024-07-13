import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, beforeEach } from "vitest";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { prisma } from "@/infra/lib/prisma";

describe("Update user (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should be able to update a user ", async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const response = await request(app.server)
      .put(`/users/update`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "user test",
        email: "test1@test.com",
      });

    expect(response.statusCode).toEqual(200);
  });
});
