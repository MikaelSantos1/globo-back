import { compare } from "bcryptjs";

import { User } from "@prisma/client";
import { UsersRepository } from "@/application/repositories/users-repository";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AutheticateUseCaseRequest {
  email: string;
  password: string;
}

interface AutheticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AutheticateUseCaseRequest): Promise<AutheticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new WrongCredentialsError();
    }
    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new WrongCredentialsError();
    }
    return { user };
  }
}
