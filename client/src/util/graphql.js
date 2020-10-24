import gql from 'graphql-tag';

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      commentCount
      comments {
        id
        body
        createdAt
        username
      }
      createdAt
      likeCount
      likes {
        id
        createdAt
        username
      }
      username
    }
  }
`;

export const FETCH_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      commentCount
      comments {
        id
        body
        createdAt
        username
      }
      createdAt
      likeCount
      likes {
        username
      }
      username
    }
  }
`;

export const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      commentCount
      comments {
        id
        body
        createdAt
        username
      }
      likeCount
      likes {
        username
      }
      createdAt
      username
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
      likes {
        id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      createdAt
      email
      token
      username
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      createdAt
      email
      token
      username
    }
  }
`;
