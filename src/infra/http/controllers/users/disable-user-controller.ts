import { makeCreateUserUseCase } from "@/application/factories/make-create-user-use-case";
import { makeDisableUserUseCase } from "@/application/factories/make-disable-user-use-case";
import { makeUpdateUserUseCase } from "@/application/factories/make-update-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function disableUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerUseCase = makeDisableUserUseCase();
    await registerUseCase.execute({
      userId: request.user.sub,
    });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send();
}
