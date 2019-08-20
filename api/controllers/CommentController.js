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
      const comment = await Comment.create({ body, movieId, ip: req.ip });
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

};
