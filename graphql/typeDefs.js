const { gql } = require('apollo-server');

module.exports = gql`
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Post {
    id: ID!
    body: String!
    comments: [Comment]!
    createdAt: String!
    likes: [Like]!
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
    createComment(postId: ID!, body: String!): Post!
    createPost(body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    login(username: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
  }
`;
