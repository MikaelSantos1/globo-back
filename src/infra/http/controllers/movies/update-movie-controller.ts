import { makeCreateUserUseCase } from "@/application/factories/make-create-user-use-case";
import { makeUpdateMovieUseCase } from "@/application/factories/make-update-movie-use-case";
import { makeUpdateUserUseCase } from "@/application/factories/make-update-user-use-case";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateMovies(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    genreId: z.string().optional(),
    cast: z.string().array().optional(),
  });
  const updateMovieParamsSchema = z.object({
    movieId: z.string(),
  });

  const { name, description, genreId, cast } = updateBodySchema.parse(
    request.body
  );
  const { movieId } = updateMovieParamsSchema.parse(request.params);
  try {
    const updateMovieUseCase = makeUpdateMovieUseCase();
    await updateMovieUseCase.execute({
      name,
      description,
      genreId,
      movieId,
      cast,
    });
  } catch (err) {
    return reply.status(400).send({ err });
  }

  return reply.status(200).send();
}
