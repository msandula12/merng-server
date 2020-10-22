const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');

const typeDefs = require('./graphql/typeDefs');

// Models
const Post = require('./models/Post');

const resolvers = {
  Query: {
    async getPosts(){
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(MONGODB, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });