import React, { useContext, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
} from 'semantic-ui-react';

import DeleteButton from '../components/DeleteButton';
import InfoPopup from '../components/InfoPopup';
import LikeButton from '../components/LikeButton';

import { AuthContext } from '../context/auth';
import { CREATE_COMMENT, FETCH_POST } from '../util/graphql';

function SinglePost({ history, match }) {
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const postId = match.params.postId;

  const { data: { getPost: post } = {} } = useQuery(FETCH_POST, {
    update() {},
    onError() {},
    variables: { postId },
  });

  const [submitComment] = useMutation(CREATE_COMMENT, {
    update() {
      // Reset comment input and exit focus
      setComment('');
      if (commentInputRef.current) {
        commentInputRef.current.blur();
      }
    },
    onError() {},
    variables: { body: comment, postId },
  });

  if (!post) {
    return <p>Loading post...</p>;
  }

  const commentOnPost = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
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
              <InfoPopup content="Comment on post">
                <Button labelPosition="right" as="div" onClick={commentOnPost}>
                  <Button color="blue" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
              </InfoPopup>
              {user && user.username === username && (
                <DeleteButton postId={id} callback={onDeletePost} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Post a comment</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      name="comment"
                      onChange={(event) => setComment(event.target.value)}
                      placeholder="Comment..."
                      ref={commentInputRef}
                      type="text"
                      value={comment}
                    />
                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={comment.trim() === ''}
                      onClick={submitComment}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((comment) => (
            <Card key={comment.id} fluid>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton commentId={comment.id} postId={id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default SinglePost;
