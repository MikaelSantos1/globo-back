import { FastifyInstance } from "fastify";
import { register } from "./create-user-controller";
import { authenticate } from "./authenticate-controller";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users/create", register);
  app.post("/sessions", authenticate);
}
