import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  return await prisma.starRating
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
