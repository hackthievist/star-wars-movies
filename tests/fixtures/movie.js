function getRecord() {
  return {
    title: chance.name(),
    opening_crawl: chance.sentence(),
    release_date: chance.date(),
    comments: chance.integer({ min: 0 }),
  };
}

function getId() {
  const id = chance.integer({ min: 0 });
  return id;
}

module.exports = {
  getRecord,
  getId,
};
