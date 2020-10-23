const commentsResolvers = require('./comments');
const postsResolvers = require('./posts');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...commentsResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};
