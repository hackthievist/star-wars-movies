module.exports = {
  port: process.env.PORT,
  connections: {
    postgres: {
      adapter: 'sails-mysql',
      pool: true,
      ssl: false,
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
