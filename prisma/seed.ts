import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const genres = [
  { name: "Action" },
  { name: "Adventure" },
  { name: "Animation" },
  { name: "Comedy" },
  { name: "Crime" },
  { name: "Documentary" },
  { name: "Drama" },
  { name: "Family" },
  { name: "Fantasy" },
  { name: "History" },
  { name: "Horror" },
  { name: "Music" },
  { name: "Mystery" },
  { name: "Romance" },
  { name: "Science Fiction" },
  { name: "TV Movie" },
  { name: "Thriller" },
  { name: "War" },
  { name: "Western" },
];
type person = {
  name: string;
  type: "ACTOR" | "DIRECTOR";
};
const persons: person[] = [
  { name: "Leonardo DiCaprio", type: "ACTOR" },
  { name: "Kate Winslet", type: "ACTOR" },
  { name: "Steven Spielberg", type: "DIRECTOR" },
  { name: "Christopher Nolan", type: "DIRECTOR" },
];

async function seed() {
  for (const genre of genres) {
    await prisma.genre.create({
      data: genre,
    });
  }

  for (const person of persons) {
    await prisma.person.create({
      data: person,
    });
  }
}

seed()
  .then(() => {
    console.log("Database seeded!");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
