/**
 * MovieController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async list(req, res) {
    try {
      const movies = await MovieService.getMovies();
      // sort movies in ascending order by date
      movies.sort((currentMovie, nextMovie) => new Date(currentMovie.release_date) - new Date(nextMovie.release_date));
      const movieData = await Promise.all(movies.map(async (each) => {
        const comments = await Comment.count({ movieId: each.episode_id });
        return { title: each.title, opening_crawl: each.opening_crawl, comments };
      }));
      return res.status(200).send({
        message: 'Movie successfully retrieved',
        data: movieData,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

};
