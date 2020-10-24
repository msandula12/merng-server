import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Form } from 'semantic-ui-react';

import { useForm } from '../util/customHooks';

function PostForm() {
  const createPostCallback = () => {
    createPost();
  };

  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log('result: ', result);
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
