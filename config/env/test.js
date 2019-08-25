module.exports = {
  port: 2001,
  connections: {
    testDB: {
      adapter: 'sails-memory',
    },
  },
  models: {
    connection: 'testDB',
    migrate: 'drop',
  },
  _hookTimeout: 600000,
  settings: {
    api: {
      baseUrl: 'https://swapi.co/api',
    },
  },
  redis: {
    url: 'redis://localhost:6379',
  }
};
