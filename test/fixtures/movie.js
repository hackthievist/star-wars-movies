function getRecord() {
  return {
    title: chance.name(),
    opening_crawl: chance.sentence(),
    release_date: chance.date({ string: true, american: false }),
    episode_id: chance.integer({ min: 1, max: 7 }),
    comments: chance.integer({ min: 0 }),
  };
}

module.exports = {
  getRecord,
};
