import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import InfoPopup from './InfoPopup';

import { DELETE_COMMENT, DELETE_POST, FETCH_POSTS } from '../util/graphql';

function DeleteButton({ callback, commentId, postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteItem] = useMutation(commentId ? DELETE_COMMENT : DELETE_POST, {
    update(proxy) {
      setConfirmOpen(false);
      // Update cache so deleted post is removed
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS,
        });
        proxy.writeQuery({
          query: FETCH_POSTS,
          data: {
            getPosts: data.getPosts.filter((post) => post.id !== postId),
          },
        });
      }
      // Call callback, if present
      if (callback) {
        callback();
      }
    },
    onError() {},
    variables: { commentId, postId },
  });

  return (
    <>
      <InfoPopup content={`Delete ${commentId ? 'comment' : 'post'}`}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </InfoPopup>
      <Confirm
        content={`Are you sure you want to delete this ${
          commentId ? 'comment' : 'post'
        }?`}
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onClick={deleteItem}
        size="mini"
      />
    </>
  );
}

export default DeleteButton;
