import React from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import { useForm } from '../util/customHooks';
import { CREATE_POST, FETCH_POSTS } from '../util/graphql';

function PostForm() {
  const createPostCallback = () => {
    createPost();
  };

  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      // Update cache so new post shows up
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      });
      proxy.writeQuery({
        query: FETCH_POSTS,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
    },
    // Silently swallow errors
    onError() {},
    variables: values,
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post</h2>
        <Form.Field>
          <Form.Input
            error={Boolean(error)}
            placeholder="Hi, World!"
            name="body"
            onChange={onChange}
            value={values.body}
          />
          <Button
            color="teal"
            disabled={values.body.trim() === ''}
            fluid
            type="submit"
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: '2rem' }}>
          <ul className="list">
            <li>{error.graphQLErrors[0]?.message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PostForm;
