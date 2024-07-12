import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";

import { expect, describe, it } from "vitest";

import { UpdateUserUseCase } from "./update-user-use-case";

describe("Update user Use Case", () => {
  it("should be able to update user data", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(usersRepository);

    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "123456",
      role: "ADMIN",
    });

    await updateUserUseCase.execute({
      email: "johndoe@example2.com",
      userId: user.id,
    });

    expect(user.email).toEqual("johndoe@example2.com");
  });
});
