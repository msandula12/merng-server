const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const { username } = checkAuth(context);
      const newPost = new Post({
        body,
        createdAt: new Date().toISOString(),
        username,
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        // Users can only delete their own posts
        if (post.username === username) {
          await post.delete();
          return 'Post successfully deleted';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        // Post already liked, so we unlike it
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Otherwise, like the post
          post.likes.push({
            createdAt: new Date().toISOString(),
            username,
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },
};
