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
      // sort movies by release date from earliest to newest
      const sortedMovies = await UtilityService.sortData({ array: movies, objectKey: 'release_date' });
      const movieData = await CommentService.addCommentsToMovies(sortedMovies);
      return res.status(200).send({
        message: 'Movies successfully retrieved',
        data: movieData,
      });
    } catch (err) {
      return res.status(500).send({
        message: 'An error occurred',
        error: err.details,
      });
    }
  },

  async listCharacters(req, res) {
    try {
      const { id } = req.params;
      const {
        sortBy, sortDir, filterBy, filterValue,
      } = req.query;
      const movie = await MovieService.getMovie(id);
      if (!movie) {
        return res.status(404).send({
          error: 'Movie not found',
        });
      }
      let characters = await MovieService.getCharacters(movie.characters);

      if (sortBy) {
        characters = UtilityService.sortData({ array: characters, objectKey: sortBy, sortDir });
      }

      if (filterBy && filterValue) {
        characters = UtilityService.filterCharacters({ array: characters, key: filterBy, value: filterValue });
      }

      const heightData = UtilityService.getHeightData(characters);

      return res.status(200).send({
        message: 'Characters retrieved successfully',
        data: characters,
        meta: {
          characterCount: characters.length,
          ...heightData,
        },
      });
    } catch (err) {
      return res.status(500).send({
        message: 'An error occurred',
        error: err.details,
      });
    }
  },

};
