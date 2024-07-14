import { prisma } from "@/infra/lib/prisma";
import { makeGenre } from "./make-genre";

export async function makeMovie() {
  const genre = await makeGenre();
  const movie = await prisma.movie.create({
    data: {
      name: "genre-test",
      genre_id: genre.id,
      description: "description",
    },
  });
  return movie;
}
