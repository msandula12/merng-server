import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

// Actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
  user: null,
};

// Persist logged-in user as long as token is still valid
if (localStorage.getItem('jwt')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwt'));
  // The token is expired, so remove it
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwt');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem('jwt', userData.token);
    dispatch({
      type: LOGIN,
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
