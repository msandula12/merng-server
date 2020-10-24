import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Form } from 'semantic-ui-react';

import { useForm } from '../util/customHooks';
import { FETCH_POSTS } from '../util/graphql';

function PostForm() {
  const createPostCallback = () => {
    createPost();
  };

  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(proxy, result) {
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
    variables: values,
  });

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi, World!"
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      commentCount
      comments {
        id
        body
        createdAt
        username
      }
      createdAt
      likeCount
      likes {
        id
        createdAt
        username
      }
      username
    }
  }
`;

export default PostForm;
