import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';

import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';

import { AuthContext } from '../context/auth';
import { FETCH_POST } from '../util/graphql';

function SinglePost({ history, match }) {
  const { user } = useContext(AuthContext);
  const postId = match.params.postId;

  const { data: { getPost: post } = {} } = useQuery(FETCH_POST, {
    update() {},
    onError() {},
    variables: { postId },
  });

  if (!post) {
    return <p>Loading post...</p>;
  }

  const commentOnPost = () => {
    console.log('Comment on post');
  };

  const onDeletePost = () => {
    history.push('/');
  };

  const {
    body,
    commentCount,
    comments,
    createdAt,
    id,
    likeCount,
    likes,
    username,
  } = post;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            floated="right"
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton post={{ id, likeCount, likes }} user={user} />
              <Button labelPosition="right" onClick={commentOnPost} as="div">
                <Button color="blue" basic>
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton postId={id} callback={onDeletePost} />
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default SinglePost;
