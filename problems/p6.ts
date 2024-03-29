import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = (userId: number) => {
  return prisma.starRating
    .findMany({
      include: {
        movie: true,
      },
      where: {
        userId: userId,
      },
    })
    .then((starRatings) => starRatings.map((starRating) => starRating.movie));
};
