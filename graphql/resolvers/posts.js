const Post = require('../../models/Post');

const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {
    async getPost(_parent, { postId }) {
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
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log('user: ', user);

      const newPost = new Post({
        body,
        createdAt: new Date().toISOString(),
        user: user.id,
        username: user.username,
      });

      const post = await newPost.save();

      return post;
    },
  },
};
