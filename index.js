const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  context: ({ req }) => ({ req }),
  resolvers,
  typeDefs,
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((error) => {
    console.error(error);
  });
