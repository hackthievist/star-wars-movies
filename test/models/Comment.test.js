const provider = require('../fixtures/comment');

const model = 'comment';
const dbData = [];
describe('CommentModel', () => {
  const clearDb = (done) => {
    const models = ['comment'];
    dbData.splice(0);
    Promise.map(models, (modelName) => sails.models[modelName].destroy({})).then(() => done()).catch(done);
  };
  const record = provider.getRecord();
  const createRecord = (done) => {
    const tasks = [
      sails.models[model].create(record),
    ];
    Promise.mapSeries(tasks, (result) => {
      dbData.push(result);
      return done();
    }).catch(done);
  };

  beforeEach(clearDb);
  after(clearDb);

  describe('#create()', () => {
    it('should create record', (done) => {
      const newRecord = provider.getRecord();
      sails.models[model].create(newRecord).then((_record) => {
        _record.should.have.property('id');
        return done();
      }).catch(done);
    });
  });
  describe('#find()', () => {
    beforeEach(createRecord);
    it('should find records', (done) => {
      sails.models[model].find().then((_records) => {
        _records.length.should.not.be.eql(0);
        return done();
      }).catch(done);
    });
  });
  describe('#findOne()', () => {
    beforeEach(createRecord);
    it('should find one record', (done) => {
      sails.models[model].findOne({
        id: dbData[0].id,
      }).then((_record) => {
        should.exist(_record);
        return done();
      }).catch(done);
    });
  });
  describe('#update()', () => {
    beforeEach(createRecord);
    it('should update record', (done) => {
      record.firstName = chance.first();
      sails.models[model].update({
        id: dbData[0].id,
      }, record).then((_records) => {
        _records.length.should.be.eql(1);
        _records[0].should.have.property('id', dbData[0].id);
        return done();
      }).catch(done);
    });
  });
  describe('#delete()', () => {
    beforeEach(createRecord);
    it('should destroy record', (done) => {
      sails.models[model].destroy({
        id: dbData[0].id,
      }).then((_records) => {
        _records.length.should.be.eql(1);
        _records[0].should.have.property('id', dbData[0].id);
        return done();
      }).catch(done);
    });
  });
});
