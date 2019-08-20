const fetch = require('node-fetch');

const { baseUrl } = sails.config.settings.api;

module.exports = {
  async getMovie(id) {
    try {
      const response = await fetch(`${baseUrl}/films/${id}`);
      const movie = await response.json();
      if (movie.detail && movie.detail === 'Not found') return null;
      return movie;
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

  async getCharacters(characterUrls) {
    try {
      const characters = await Promise.all(characterUrls.map(async (url) => {
        const character = await fetch(url);
        return character.json();
      }));
      return characters;
    } catch (err) {
      return err;
    }
  },
};
