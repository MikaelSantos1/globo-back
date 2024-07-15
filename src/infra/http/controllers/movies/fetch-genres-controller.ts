import { makeFetchMoviesUseCase } from "@/application/factories/make-fetch-movies-use-case";
import { FetchGenresUseCase } from "@/application/use-cases/fetch-genres-use-case";
import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchGenres(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const prismaUserRepository = new PrismaMoviesRepository();
    const fetchGenresUseCase = new FetchGenresUseCase(prismaUserRepository);
    const { genres } = await fetchGenresUseCase.execute();

    return reply.status(200).send(genres);
  } catch (err) {
    return reply.status(400).send({ err });
  }
}
