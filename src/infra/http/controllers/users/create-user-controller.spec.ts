import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, beforeEach } from "vitest";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { prisma } from "@/infra/lib/prisma";

describe("Create user (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  beforeEach(async () => {
    await prisma.user.deleteMany();
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

  it("should not be able to create a if im not a admin ", async () => {
    const { token } = await createAndAuthenticateUser(app, false);
    const response = await request(app.server)
      .post(`/users/create`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "user test",
        email: "test1@test.com",
        password: "123456",
      });
    expect(response.statusCode).toEqual(401);
  });
});
