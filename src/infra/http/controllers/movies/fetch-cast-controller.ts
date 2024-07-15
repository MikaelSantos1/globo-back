import { makeFetchCastUseCase } from "@/application/factories/make-fetch-cast";
import { makeFetchMoviesUseCase } from "@/application/factories/make-fetch-movies-use-case";
import { FetchCastUseCase } from "@/application/use-cases/fetch-cast-use-case";
import { FetchGenresUseCase } from "@/application/use-cases/fetch-genres-use-case";
import { PrismaMoviesRepository } from "@/infra/database/prisma/repositories/prisma-movies-repository";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchCast(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchCastUseCase = makeFetchCastUseCase();

    const { persons } = await fetchCastUseCase.execute();

    return reply.status(200).send(persons);
  } catch (err) {
    return reply.status(400).send({ err });
  }
}
