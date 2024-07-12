import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";

import { expect, describe, it } from "vitest";

import { UpdateUserUseCase } from "./update-user-use-case";
import { DisableUserUseCase } from "./disable-user-use-case";

describe("Disable user Use Case", () => {
  it("should be able to disable user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const disableUserUseCase = new DisableUserUseCase(usersRepository);

    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "123456",
      role: "ADMIN",
    });

    await disableUserUseCase.execute({
      userId: user.id,
    });

    expect(user.is_active).toBeFalsy();
  });
});
