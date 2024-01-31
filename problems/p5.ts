import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const starRatingObj = await prisma.starRating.findMany({
    include: {
      movie: true,
    },
  });
  return starRatingObj
    .filter((item) => {
      const ratingsFilteredByMovie = starRatingObj.filter(
        (entry) => entry.movieId === item.movieId
      );
      const movieAvgScore =
        ratingsFilteredByMovie.reduce(
          (sum, starRatingEntry) => (sum += starRatingEntry.score),
          0
        ) / ratingsFilteredByMovie.length;
      return movieAvgScore > n;
    })
    .filter((rating, index, ratings) => {
      const movieTitles = ratings.map((rating) => rating.movie.title);
      return !movieTitles.includes(rating.movie.title, index + 1);
    })
    .map((result) => result.movie);
};
