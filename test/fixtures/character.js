function getRecord() {
  return {
    name: chance.name(),
    height: chance.integer({ min: 60, max: 220 }),
    gender: chance.pickone(['male', 'female', 'none', 'n/a']),
  };
}

function getRecords() {
  const record = Object.assign(this.getRecord(), { gender: 'male' });
  const secondRecord = Object.assign(this.getRecord(), { gender: 'female' });
  const thirdRecord = Object.assign(this.getRecord(), { gender: 'n/a' });
  return [record, secondRecord, thirdRecord];
}

module.exports = {
  getRecord,
  getRecords,
};
