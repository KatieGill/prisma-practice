import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = (n: number) => {
  return prisma.starRating
    .groupBy({
      by: ["movieId"],
      having: {
        score: {
          _avg: {
            gt: n,
          },
        },
      },
    })
    .then((movieIdObjsArr) =>
      movieIdObjsArr.map((movieIdObjs) => movieIdObjs.movieId)
    )
    .then((moviesIdArr) =>
      prisma.movie.findMany({
        where: {
          id: { in: moviesIdArr },
        },
      })
    );
};
