import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { compare } from "bcryptjs";
import { expect, describe, it } from "vitest";
import { CreateUserUseCase } from "./create-users-use-case";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";

describe("Create user Use Case", () => {
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const { user } = await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      role: "ADMIN",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const { user } = await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      role: "ADMIN",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const email = "johndoe@example.com";

    await createUserUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
      role: "ADMIN",
    });

    await expect(() =>
      createUserUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
        role: "ADMIN",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
