import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = (userId: number) => {
  return prisma.starRating
    .aggregate({
      _avg: {
        score: true,
      },
      where: {
        userId: userId,
      },
    })
    .then((result) => result._avg.score);
};
