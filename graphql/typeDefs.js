const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    createdAt: String!
    email: String!
    token: String!
    username: String!
  }
  input RegisterInput {
    confirmPassword: String!
    email: String!
    password: String!
    username: String!
  }
  type Query {
    getPost(postId: ID!): Post
    getPosts: [Post]
  }
  type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    login(username: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
  }
`;
