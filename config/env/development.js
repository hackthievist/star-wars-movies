module.exports = {
  port: process.env.PORT,
  connections: {
    postgres: {
      adapter: 'sails-postgresql',
      pool: true,
      ssl: true,
      url: process.env.DATABASE_URL,
    },
  },
  models: {
    connection: 'postgres',
    migrate: 'alter',
  },
  settings: {
    api: {
      baseUrl: 'https://swapi.co/api',
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
};
