const fetch = require('node-fetch');

const { baseUrl } = sails.config.settings.api;

module.exports = {
  async getMovie(id) {
    try {
      const response = await fetch(`${baseUrl}/films/${id}`);
      const movie = await response.json();
      if (movie.detail && movie.detail === 'Not found') return null;
      return movie.results;
    } catch (err) {
      return err;
    }
  },

  async getMovies() {
    try {
      const response = await fetch(`${baseUrl}/films`);
      const movies = await response.json();
      return movies.results;
    } catch (err) {
      return err;
    }
  },
};
