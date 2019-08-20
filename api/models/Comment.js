/**
 * Comment.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    body: {
      type: 'string',
      required: true,
      maxLength: 500,
    },
    movieId: {
      type: 'integer',
      required: true,
    },
    ip: {
      type: 'string',
    },
  },
  validationMessages: {
    body: {
      required: 'Comment body is required',
    },
    movieId: {
      required: 'Movie ID is required',
    },
  },
};
