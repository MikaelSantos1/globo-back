import { prisma } from "@/infra/lib/prisma";

export async function makeGenre() {
  const genre = await prisma.genre.create({
    data: {
      name: "genre-test",
    },
  });
  return genre;
}
