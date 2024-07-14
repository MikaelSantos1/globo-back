import { prisma } from "@/infra/lib/prisma";

import { UsersRepository } from "@/application/repositories/users-repository";
import { hash } from "bcryptjs";

import { User } from "@prisma/client";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
interface CreateUserUseCaseParams {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}
interface CreateUserUseCaseResponse {
  user: User;
}
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
    role,
  }: CreateUserUseCaseParams): Promise<CreateUserUseCaseResponse> {
    const password_hash = await hash(password, 6);
    const usersWithSameEmail = await this.usersRepository.findByEmail(email);

    if (usersWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role,
    });

    return {
      user,
    };
  }
}
