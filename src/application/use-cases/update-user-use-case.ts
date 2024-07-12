import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";

interface UpdateUserUseCaseRequest {
  userId: string;
  email?: string;
  name?: string;
  role?: "ADMIN" | "USER";
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    email,
    name,
    role,
  }: UpdateUserUseCaseRequest): Promise<void> {
    let usersWithSameEmail;
    if (email) {
      usersWithSameEmail = await this.usersRepository.findByEmail(email);
    }

    if (usersWithSameEmail) {
      throw new Error("user with same email already exists");
    }

    await this.usersRepository.update({ email, name, role }, userId);
  }
}
