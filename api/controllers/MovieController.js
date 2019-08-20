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
      // sort string values (name, gender)
      if (sortBy && typeof characters[0][sortBy] !== 'number') {
        characters = _.sortBy(characters, [function (each) {
          return each[sortBy];
        }]);
      }
      // sort number values (height)
      if (sortBy && sortBy === 'height') {
        characters = characters.sort((a, b) => a[sortBy] - b[sortBy]);
      }

      // filter values by passed query parameters (e.g gender)
      if (filterBy && filterValue) {
        characters = characters.filter((character) => character[filterBy] === filterValue);
      }
      if (sortDir && sortDir === 'desc') _.reverse(characters);

      const totalHeightInCm = characters.reduce((totalHeight, currentCharacter) => {
        // eslint-disable-next-line no-param-reassign
        totalHeight += currentCharacter.height === 'unknown' ? 0 : parseInt(currentCharacter.height, 10);
        return totalHeight;
      }, 0);

      const feetAndInchesConversionValue = totalHeightInCm / 30.48;
      const feet = Math.floor(feetAndInchesConversionValue);
      const inches = (feetAndInchesConversionValue % 1) * 12;
      const totalHeightInFeetAndInches = `${feet}ft and ${inches.toFixed(2)} inches`;

      return res.status(200).send({
        message: 'Characters retrieved successfully',
        data: characters,
        meta: {
          characterCount: characters.length,
          totalHeightInCm,
          totalHeightInFeetAndInches,
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
