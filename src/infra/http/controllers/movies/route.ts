import { FastifyInstance } from "fastify";
import { registerMovies } from "./register-movie-controller";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-role";
import { updateMovies } from "./update-movie-controller";
import { VoteMovie } from "./vote-movie-controller";
import { FetchMoviesUseCase } from "@/application/use-cases/fetch-movies-use-case";
import { fetchMovies } from "./fetch-movies-controller";
import { searchMovies } from "./search-movies-controller";
import { getMovieDetails } from "./get-movie-details-controller";
import { fetchGenres } from "./fetch-genres-controller";
import { fetchCast } from "./fetch-cast-controller";

export async function movieRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post(
    "/movie/register",
    { onRequest: [verifyUserRole("ADMIN")] },
    registerMovies
  );
  app.put(
    "/movie/:movieId",
    { onRequest: [verifyUserRole("ADMIN")] },
    updateMovies
  );
  app.post(
    "/movie/vote/:movieId",
    { onRequest: [verifyUserRole("USER")] },
    VoteMovie
  );
  app.get("/movies", fetchMovies);
  app.get("/movie/:movieId", getMovieDetails);
  app.get("/movies/search", searchMovies);
  app.get("/genres", fetchGenres);
  app.get("/cast", fetchCast);
}
