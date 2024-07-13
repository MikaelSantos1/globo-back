import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";

describe("authenticate (e2e) ", () => {
  beforeAll(async () => {
    app.ready();
  });
  afterAll(() => {
    app.close();
  });
  it("Should be able to authenticate", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const teste = await request(app.server)
      .post(`/users/create`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "user test",
        email: "test1@test.com",
        password: "123456",
      });

    const response = await request(app.server).post("/sessions").send({
      email: "test1@test.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
