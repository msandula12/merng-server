const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Mutation: {
    async createComment(_, { body, postId }, context) {
      const { username } = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty',
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          createdAt: new Date().toISOString(),
          username,
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },
};
