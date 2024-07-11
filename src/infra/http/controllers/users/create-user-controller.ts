import { makeCreateUserUseCase } from "@/application/factories/make-create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "USER"]).default("USER"),
  });

  const { name, email, password, role } = registerBodySchema.parse(
    request.body
  );
  try {
    const registerUseCase = makeCreateUserUseCase();
    await registerUseCase.execute({
      email,
      name,
      password,
      role,
    });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
