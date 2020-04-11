const movieProvider = require('../fixtures/movie');
const commentProvider = require('../fixtures/comment');

const episodeId = chance.integer({ min: 1, max: 7 });

describe('CommentController', () => {
  const requiredKeys = ['body', 'episodeId', 'ip'];
  const models = [
    { name: 'comment' },
  ];
  const dbData = [];
  const clearDb = (done) => {
    dbData.splice(0);
    Promise.map(models, (model) => sails.models[model.name].destroy({})).then(() => done()).catch(done);
  };
  const setUp = (done) => {
    const commentData = Object.assign(commentProvider.getRecord(), { episodeId });
    Comment.create(commentData)
      .then((comment) => {
        dbData.push(comment);
        return done();
      });
  };

  let movieServiceStub;

  const stubMovieService = () => {
    const movieData = Object.assign(movieProvider.getRecord(), { episode_id: episodeId });
    movieServiceStub = sinon.stub(MovieService, 'getMovie');
    movieServiceStub.returns(movieData);
  };
  const restoreMovieService = () => {
    MovieService.getMovie.restore();
  };

  before('clears db fixtures', clearDb);
  beforeEach('sets up db fixtures', setUp);
  afterEach('clears db fixtures', clearDb);
  beforeEach('Stub Movie service', stubMovieService);
  afterEach('Restore Movie service', restoreMovieService);

  describe('#create() [POST /movies/comments]', () => {
    it('should return 201: Comment successfully posted', (done) => {
      const id = chance.integer({ min: 1, max: 7 });
      const newComment = commentProvider.getRecord();
      const commentObject = { ...newComment, movieId: id };
      request(sails.hooks.http.app)
        .post('/movies/comments')
        .send(commentObject)
        .expect(201)
        .end((err, result) => {
          if (err) return done(err);
          result.body.should.have.property('message', 'Comment successfully posted');
          result.body.should.have.property('data');
          result.body.data.should.be.an('object').and.contain.keys(requiredKeys);
          return done();
        });
    });
  });

  describe('#list() [GET /movies/:id/comments]', () => {
    it('should return 200: Comments retrieved successfully', async () => {
      const result = await request(sails.hooks.http.app)
        .get(`/movies/${dbData[0].id}/comments`)
        .expect(200);
      result.body.should.have.property('message', 'Comments retrieved successfully');
      result.body.should.have.property('data');
      result.body.data.should.be.an('object').and.contain.keys(['movie', 'comments']);
      result.body.data.comments.should.be.an('array').with.lengthOf(1);
      result.body.data.comments[0].should.be.an('object').and.contain.keys(requiredKeys);
    });
  });
});
