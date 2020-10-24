import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/customHooks';
import { LOGIN_USER } from '../util/graphql';

function Login({ history }) {
  const context = useContext(AuthContext);

  const login = () => {
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(login, {
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // Redirect to Home page upon successful login
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
        <h1 className="page-title">Login</h1>
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
          error={Boolean(errors.password)}
          label="Password"
          placeholder="******"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" fluid primary>
          Login
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

export default Login;
