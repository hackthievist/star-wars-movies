const movieProvider = require('../fixtures/movie');
const commentProvider = require('../fixtures/comment');
const characterProvider = require('../fixtures/character');

describe('MovieController', () => {
  const requiredKeys = ['title', 'opening_crawl', 'release_date', 'comments'];
  const models = [
    { name: 'comment' },
  ];
  const dbData = [];
  const clearDb = (done) => {
    dbData.splice(0);
    Promise.map(models, (model) => sails.models[model.name].destroy({})).then(() => done()).catch(done);
  };
  const setUp = (done) => {
    const commentData = commentProvider.getRecord();
    Comment.create(commentData)
      .then((comment) => {
        dbData.push(comment);
        return done();
      });
  };
  let movieServiceStub;
  let movieServiceStub2;
  let movieServiceStub3;

  const stubMovieService = () => {
    const characterData = characterProvider.getRecords();
    const movieData1 = movieProvider.getRecord();
    const movieData2 = movieProvider.getRecord();
    movieServiceStub = sinon.stub(MovieService, 'getMovies');
    movieServiceStub2 = sinon.stub(MovieService, 'getCharacters');
    movieServiceStub3 = sinon.stub(MovieService, 'getMovie');
    movieServiceStub.returns([movieData1, movieData2]);
    movieServiceStub2.returns(characterData);
  };
  const restoreMovieService = () => {
    MovieService.getMovies.restore();
    MovieService.getMovie.restore();
    MovieService.getCharacters.restore();
  };

  before('clears db fixtures', clearDb);
  beforeEach('sets up db fixtures', setUp);
  afterEach('clears db fixtures', clearDb);
  beforeEach('Stub Movie service', stubMovieService);
  afterEach('Restore Movie service', restoreMovieService);

  describe('#list() [GET /movies]', () => {
    it('should return 200: Movies successfully retrieved', (done) => {
      request(sails.hooks.http.app)
        .get('/movies')
        .expect(200)
        .end((err, result) => {
          if (err) return done(err);
          result.body.should.have.property('message', 'Movies successfully retrieved');
          result.body.should.have.property('data');
          result.body.data.should.be.an('array');
          result.body.data[0].should.be.an('object').and.contain.keys(requiredKeys);
          return done();
        });
    });
  });

  describe('#listCharacters() [GET /movies]', () => {
    it('should return 200: Characters successfully retrieved', (done) => {
      movieServiceStub3.returns(movieProvider.getRecord());
      const characterKeys = ['name', 'height', 'gender'];
      const id = chance.integer({ min: 1, max: 7 });
      request(sails.hooks.http.app)
        .get(`/movies/${id}/characters`)
        .expect(200)
        .end((err, result) => {
          if (err) return done(err);
          result.body.should.have.property('message', 'Characters successfully retrieved');
          result.body.should.have.property('data');
          result.body.should.have.property('meta');
          result.body.data.should.be.an('array').with.lengthOf(3);
          result.body.data[0].should.be.an('object').and.contain.keys(characterKeys);
          result.body.meta.should.contain.keys(['characterCount', 'totalHeightInCentimeters', 'totalHeightInFeetAndInches']);
          return done();
        });
    });

    it('should return 200: Characters successfully retrieved (filter by gender)', (done) => {
      movieServiceStub3.returns(movieProvider.getRecord());
      const characterKeys = ['name', 'height', 'gender'];
      const id = chance.integer({ min: 1, max: 7 });
      request(sails.hooks.http.app)
        .get(`/movies/${id}/characters`)
        .expect(200)
        .query({ filterBy: 'gender', filterValue: 'male' })
        .end((err, result) => {
          if (err) return done(err);
          result.body.should.have.property('message', 'Characters successfully retrieved');
          result.body.should.have.property('data');
          result.body.should.have.property('meta');
          result.body.data.should.be.an('array').with.lengthOf(1);
          result.body.data[0].should.be.an('object').and.contain.keys(characterKeys);
          result.body.data[0].should.have.property('gender', 'male');
          result.body.meta.should.contain.keys(['characterCount', 'totalHeightInCentimeters', 'totalHeightInFeetAndInches']);
          return done();
        });
    });


    it('should return 200: Characters successfully retrieved (sort by height asc)', (done) => {
      movieServiceStub3.returns(movieProvider.getRecord());
      const characterKeys = ['name', 'height', 'gender'];
      const id = chance.integer({ min: 1, max: 7 });
      request(sails.hooks.http.app)
        .get(`/movies/${id}/characters`)
        .expect(200)
        .query({ sortBy: 'height', sortDir: 'asc' })
        .end((err, result) => {
          if (err) return done(err);
          result.body.should.have.property('message', 'Characters successfully retrieved');
          result.body.should.have.property('data');
          result.body.should.have.property('meta');
          result.body.data.should.be.an('array').with.lengthOf(3);
          result.body.data[0].should.be.an('object').and.contain.keys(characterKeys);
          assert.isBelow(result.body.data[0].height, result.body.data[1].height);
          result.body.meta.should.contain.keys(['characterCount', 'totalHeightInCentimeters', 'totalHeightInFeetAndInches']);
          return done();
        });
    });

    it('should return 200: Characters successfully retrieved (sort by height desc)', (done) => {
      movieServiceStub3.returns(movieProvider.getRecord());
      const characterKeys = ['name', 'height', 'gender'];
      const id = chance.integer({ min: 1, max: 7 });
      request(sails.hooks.http.app)
        .get(`/movies/${id}/characters`)
        .expect(200)
        .query({ sortBy: 'height', sortDir: 'desc' })
        .end((err, result) => {
          if (err) return done(err);
          result.body.should.have.property('message', 'Characters successfully retrieved');
          result.body.should.have.property('data');
          result.body.should.have.property('meta');
          result.body.data.should.be.an('array').with.lengthOf(3);
          result.body.data[0].should.be.an('object').and.contain.keys(characterKeys);
          assert.isBelow(result.body.data[1].height, result.body.data[0].height);
          result.body.meta.should.contain.keys(['characterCount', 'totalHeightInCentimeters', 'totalHeightInFeetAndInches']);
          return done();
        });
    });
  });
});
