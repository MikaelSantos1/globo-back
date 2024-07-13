import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";

describe("Create user (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a user ", async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const response = await request(app.server)
      .post(`/users/create`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "user test",
        email: "test@test.com",
        password: "123456",
      });
    expect(response.statusCode).toEqual(201);
  });
});
