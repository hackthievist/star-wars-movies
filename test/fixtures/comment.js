function getRecord() {
  return {
    body: chance.sentence(),
    episodeId: chance.integer({ min: 1, max: 7 }),
    ip: chance.ip(),
  };
}

module.exports = {
  getRecord,
};
