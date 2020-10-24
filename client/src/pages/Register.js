import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/customHooks';

function Register({ history }) {
  const context = useContext(AuthContext);

  const registerUser = () => {
    addUser();
  };

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // Login and redirect to Home page upon successful registration
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push('/');
    },
    // Otherwise, show input errors
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 className="page-title">Register</h1>
        <Form.Input
          error={Boolean(errors.username)}
          label="Username"
          placeholder="janedoe1"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          error={Boolean(errors.email)}
          label="Email"
          placeholder="jdoe@email.com"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          error={Boolean(errors.password)}
          label="Password"
          placeholder="Must be at least 6 characters"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          error={Boolean(errors.confirmPassword)}
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
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
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
