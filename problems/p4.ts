import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = async () => {
  return await prisma.movie.findMany({
    where: {
      parentalRating: {
        equals: "PG-13",
      },
    },
    select: {
      releaseYear: true,
      parentalRating: true,
    },
    orderBy: {
      releaseYear: "desc",
    },
  });
};
