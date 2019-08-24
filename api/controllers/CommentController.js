/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    try {
      const { body, movieId } = req.body;
      const movie = await MovieService.getMovie(movieId);
      if (!movie) {
        return res.status(404).send({
          error: 'Movie not found',
        });
      }
      const comment = await Comment.create({ body, episodeId: movie.episode_id, ip: req.ip });
      return res.status(201).send({
        message: 'Comment successfully posted',
        data: comment,
      });
    } catch (err) {
      return res.status(500).send({
        message: 'An error occurred',
        error: err.details,
      });
    }
  },

  async list(req, res) {
    try {
      const { id: movieId } = req.params;
      const movie = await MovieService.getMovie(movieId);
      if (!movie) {
        return res.status(404).send({
          error: 'Movie not found',
        });
      }
      const comments = await Comment.find({ episodeId: movie.episode_id }).sort('createdAt desc');
      return res.status(200).send({
        message: 'Comments retrieved successully',
        data: { movie: movie.title, comments },
      });
    } catch (err) {
      return res.status(500).send({
        message: 'An error occurred',
        error: err.details,
      });
    }
  },

};
