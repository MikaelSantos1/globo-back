import { makeCreateUserUseCase } from "@/application/factories/make-create-user-use-case";
import { makeRegisterMovieUseCase } from "@/application/factories/make-register-movie-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerMovies(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    genreId: z.string(),
    cast: z.string().array().optional(),
  });

  const { name, description, genreId, cast } = registerBodySchema.parse(
    request.body
  );
  try {
    const registerMovieUseCase = makeRegisterMovieUseCase();
    const { movie } = await registerMovieUseCase.execute({
      name,
      description,
      genreId,
      cast,
    });

    return reply.status(201).send(movie);
  } catch (err) {
    console.log(err);
    return reply.status(400).send({ err });
  }
}
