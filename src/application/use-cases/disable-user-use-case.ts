import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";

interface UserUseCaseRequest {
  userId: string;
}

export class DisableUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: UserUseCaseRequest): Promise<void> {
    await this.usersRepository.disable(userId);
  }
}
