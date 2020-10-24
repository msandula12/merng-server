import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';

import DeleteButton from './DeleteButton';
import InfoPopup from './InfoPopup';
import LikeButton from './LikeButton';

import { AuthContext } from '../context/auth';

function PostCard({
  post: { body, commentCount, createdAt, id, likeCount, likes, username },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          circular
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
        <LikeButton post={{ id, likeCount, likes }} user={user} />
        <InfoPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </InfoPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
