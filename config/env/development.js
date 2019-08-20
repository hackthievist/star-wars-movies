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
    migrate: 'alter',
  },
  settings: {
    api: {
      baseUrl: 'https://swapi.co/api',
    },
  },
};
