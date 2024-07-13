import { makeFetchMoviesUseCase } from "@/application/factories/make-fetch-movies-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchMovies(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchMoviesUseCase = makeFetchMoviesUseCase();
    const { movies } = await fetchMoviesUseCase.execute();

    return reply.status(200).send(movies);
  } catch (err) {
    console.log(err);
    return reply.status(400).send({ err });
  }

  return reply.status(201).send();
}
