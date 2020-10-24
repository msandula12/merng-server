import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';

import InfoPopup from './InfoPopup';

import { LIKE_POST } from '../util/graphql';

function LikeButton({ post: { id, likeCount, likes }, user }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedByUser =
      user && likes.find((like) => like.username === user.username);
    setLiked(likedByUser);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    update() {},
    onError() {},
    variables: { postId: id },
  });

  const likeButton = user ? (
    <Button color="teal" basic={!liked}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <InfoPopup content={`${liked ? 'Unlike' : 'Like'} post`}>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </InfoPopup>
  );
}

export default LikeButton;
