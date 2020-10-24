import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

function Home() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h2>Loading posts...</h2>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: '2rem' }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS = gql`
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

export default Home;
