import { makeSearchMoviesUseCase } from "@/application/factories/make-search-movies-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchMovies(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const SearchMoviesQuerySchema = z.object({
    q: z.string(),
  });

  const { q } = SearchMoviesQuerySchema.parse(request.query);

  const searchMovies = makeSearchMoviesUseCase();
  const { movies } = await searchMovies.execute({
    query: q,
  });

  return reply.status(200).send({ movies });
}
