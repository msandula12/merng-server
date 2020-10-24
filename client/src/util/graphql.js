import gql from 'graphql-tag';

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
