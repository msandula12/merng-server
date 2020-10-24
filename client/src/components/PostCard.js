import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

function PostCard({
  post: {
    body,
    commentCount,
    comments,
    createdAt,
    id,
    likeCount,
    likes,
    username,
  },
}) {
  const { user } = useContext(AuthContext);

  const likePost = () => {
    console.log('Like post');
  };

  const commentOnPost = () => {
    console.log('Comment on post');
  };

  const deletePost = () => {
    console.log('Delete post');
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button
          as="div"
          labelPosition="right"
          onClick={commentOnPost}
          as={Link}
          to={`/posts/${id}`}
        >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button as="div" color="red" floated="right" onClick={deletePost}>
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
