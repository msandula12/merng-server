import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { DELETE_POST, FETCH_POSTS } from '../util/graphql';

function DeleteButton({ callback, postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      setConfirmOpen(false);
      // Update cache so deleted post is removed
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      });
      proxy.writeQuery({
        query: FETCH_POSTS,
        data: {
          getPosts: data.getPosts.filter((post) => post.id !== postId),
        },
      });
      // Call callback, if present
      if (callback) {
        callback();
      }
    },
    onError() {},
    variables: { postId },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        content="Are you sure you want to delete this post?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onClick={deletePost}
        size="mini"
      />
    </>
  );
}

export default DeleteButton;
