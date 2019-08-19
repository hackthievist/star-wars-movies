module.exports = {
  port: process.env.PORT,
  connections: {
    postgres: {
      adapter: 'sails-mysql',
      pool: true,
      ssl: false,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
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
