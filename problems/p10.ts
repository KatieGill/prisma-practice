import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const deleteRatings = prisma.starRating.deleteMany({
    where: {
      user: {
        age: { lt: n },
      },
    },
  });
  const deleteUsers = prisma.user.deleteMany({
    where: {
      age: {
        lt: n,
      },
    },
  });
  return await prisma.$transaction([deleteRatings, deleteUsers]);
};
