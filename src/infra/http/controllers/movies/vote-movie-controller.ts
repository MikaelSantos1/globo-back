import { makeVoteUseCase } from "@/application/factories/make-vote-use-case";
import { ResourceNotFoundError } from "@/application/use-cases/errors/resource-not-found-error";
import { VoteOutOfRangeError } from "@/application/use-cases/errors/vote-out-of-range-error";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function VoteMovie(request: FastifyRequest, reply: FastifyReply) {
  const voteMovieParamsSchema = z.object({
    movieId: z.string(),
  });
  const voteBodySchema = z.object({
    rating: z.coerce.number(),
  });
  const { movieId } = voteMovieParamsSchema.parse(request.params);
  const { rating } = voteBodySchema.parse(request.body);
  try {
    const VoteMovieUseCase = makeVoteUseCase();
    await VoteMovieUseCase.execute({
      movieId,
      rating,
    });
  } catch (err) {
    if (err instanceof VoteOutOfRangeError) {
      return reply.status(400).send({ err: err.message });
    }
  }

  return reply.status(201).send();
}
