const fetch = require('node-fetch');

const { baseUrl } = sails.config.settings.api;

module.exports = {
  async getMovie(id) {
    try {
      let movie;
      const url = `${baseUrl}/films/${id}`;
      const redisKey = url;
      const keyExists = await redisClient.exists(redisKey);
      if (keyExists === 1) {
        movie = await UtilityService.getRedisValue(redisKey);
        return movie;
      }
      const response = await fetch(url);
      movie = await response.json();
      if (movie.detail && movie.detail === 'Not found') return null;
      await redisClient.set(redisKey, JSON.stringify(movie));
      return movie;
    } catch (err) {
      return err;
    }
  },

  async getMovies() {
    try {
      let movies;
      const url = `${baseUrl}/films`;
      const redisKey = url;
      const keyExists = await redisClient.exists(redisKey);
      if (keyExists === 1) {
        movies = await UtilityService.getRedisValue(redisKey);
        return movies;
      }
      const response = await fetch(url);
      movies = await response.json();
      const { results } = movies;
      await redisClient.set(redisKey, JSON.stringify(results));
      return results;
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
