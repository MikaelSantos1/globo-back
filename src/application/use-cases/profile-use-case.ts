import { Movie, User } from "@prisma/client";
import { MoviesRepository } from "../repositories/movie-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { VoteOutOfRangeError } from "./errors/vote-out-of-range-error";
import { UsersRepository } from "../repositories/users-repository";

interface ProfileUseCaseParams {
  userId: string;
}
interface ProfileUseCaseResponse {
  user: User;
}
export class ProfileUse {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: ProfileUseCaseParams): Promise<ProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user,
    };
  }
}
