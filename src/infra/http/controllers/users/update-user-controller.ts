import { makeCreateUserUseCase } from "@/application/factories/make-create-user-use-case";
import { makeUpdateUserUseCase } from "@/application/factories/make-update-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),

    role: z.enum(["ADMIN", "USER"]).default("USER"),
  });

  const { name, email, role } = updateUserBodySchema.parse(request.body);
  try {
    const registerUseCase = makeUpdateUserUseCase();
    await registerUseCase.execute({
      email,
      name,
      userId: request.user.sub,
      role,
    });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send();
}
