import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { usersRoutes } from "./infra/http/controllers/users/route";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,

  sign: {
    expiresIn: "8h",
  },
});
app.register(fastifyCookie);
app.register(usersRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
  }

  return reply.status(500).send({ message: "Internal server error." });
});
