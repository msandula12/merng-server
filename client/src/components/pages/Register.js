import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Form } from 'semantic-ui-react';

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log('result: ', result);
    },
    variables: values,
  });

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1 className="page-title">Register</h1>
        <Form.Input
          label="Username"
          placeholder="janedoe1"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Email"
          placeholder="jdoe@email.com"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Password"
          placeholder="Must be at least 6 characters"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Confirm Password"
          placeholder="Re-enter your password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" fluid primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      createdAt
      email
      token
      username
    }
  }
`;

export default Register;
