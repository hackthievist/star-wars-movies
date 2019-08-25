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
      const redactedMovieData = UtilityService.pickFields(movieData);
      return res.status(200).send({
        message: 'Movies successfully retrieved',
        data: redactedMovieData,
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
      const characters = await MovieService.getCharacters(movie.characters);

      const sortedCharacters = sortBy ? UtilityService.sortData({ array: characters, objectKey: sortBy, sortDir }) : characters;

      const filteredCharacters = filterBy && filterValue ? UtilityService.filterCharacters({ array: sortedCharacters, key: filterBy, value: filterValue }) : sortedCharacters;

      const heightData = UtilityService.getHeightData(filteredCharacters);

      return res.status(200).send({
        message: 'Characters successfully retrieved',
        data: filteredCharacters,
        meta: {
          characterCount: filteredCharacters.length,
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
