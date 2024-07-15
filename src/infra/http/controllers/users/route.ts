import { FastifyInstance } from "fastify";
import { register } from "./create-user-controller";
import { authenticate } from "./authenticate-controller";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-role";
import { updateUser } from "./update-user-controller";
import { disableUser } from "./disable-user-controller";
import { profile } from "./profile-controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/sessions", authenticate);

  app.post(
    "/users/create",
    { onRequest: [verifyJwt, verifyUserRole("ADMIN")] },
    register
  );
  app.put("/users/update", { onRequest: [verifyJwt] }, updateUser);
  app.patch("/users/disable", { onRequest: [verifyJwt] }, disableUser);
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
