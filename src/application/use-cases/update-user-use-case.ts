import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";

interface UpdateUserUseCaseRequest {
  userId: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    email,
    name,
    role,
  }: UpdateUserUseCaseRequest): Promise<void> {
    await this.usersRepository.update({ email, name, role }, userId);
  }
}
