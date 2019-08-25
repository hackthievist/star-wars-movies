const fetch = require('node-fetch');

const { baseUrl } = sails.config.settings.api;

module.exports = {
  async getMovie(id) {
    try {
      const url = `${baseUrl}/films/${id}`;
      const redisKey = url;
      const keyExists = await redisClient.exists(redisKey);
      if (keyExists === 1) {
        const cachedMovieData = await UtilityService.getRedisValue(redisKey);
        return cachedMovieData;
      }
      const response = await fetch(url);
      const movie = await response.json();
      if (movie.detail && movie.detail === 'Not found') return null;
      await redisClient.set(redisKey, JSON.stringify(movie));
      return movie;
    } catch (err) {
      return err;
    }
  },

  async getMovies() {
    try {
      const url = `${baseUrl}/films`;
      const redisKey = url;
      const keyExists = await redisClient.exists(redisKey);
      if (keyExists === 1) {
        const cachedMovies = await UtilityService.getRedisValue(redisKey);
        return cachedMovies;
      }
      const response = await fetch(url);
      const jsonResponse = await response.json();
      const { results: movies } = jsonResponse;
      await redisClient.set(redisKey, JSON.stringify(movies));
      return movies;
    } catch (err) {
      return err;
    }
  },

  async getCharacter(url) {
    try {
      const redisKey = url;
      const keyExists = await redisClient.exists(redisKey);
      if (keyExists === 1) {
        const character = await UtilityService.getRedisValue(redisKey);
        return character;
      }
      const character = await fetch(url);
      const results = await character.json();
      await redisClient.set(redisKey, JSON.stringify(results));
      return results;
    } catch (err) {
      return err;
    }
  },

  async getCharacters(characterUrls) {
    try {
      const characters = await Promise.all(characterUrls.map(async (url) => {
        const character = await MovieService.getCharacter(url);
        return character;
      }));
      return characters;
    } catch (err) {
      return err;
    }
  },
};
