import { makeGetMovieDetailsUseCase } from "@/application/factories/make-get-movie-details-use-case";

import { ResourceNotFoundError } from "@/application/use-cases/errors/resource-not-found-error";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getMovieDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const voteMovieParamsSchema = z.object({
    movieId: z.string(),
  });

  const { movieId } = voteMovieParamsSchema.parse(request.params);

  try {
    const getMovieDetailsUseCase = makeGetMovieDetailsUseCase();
    const movie = await getMovieDetailsUseCase.execute({
      movieId,
    });
    return reply.status(201).send(movie);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ err: err.message });
    }
  }
}
