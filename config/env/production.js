module.exports = {
  port: process.env.PORT,
  connections: {
    postgres: {
      adapter: 'sails-postgresql',
      pool: true,
      ssl: true,
      url: process.env.DB_URL,
    },
  },
  models: {
    connection: 'postgres',
    migrate: 'safe',
  },
  settings: {
    api: {
      baseUrl: 'https://swapi.co/api',
    },
  },
  redis: {
    url: process.env.REDIS_URL,
  }
};
