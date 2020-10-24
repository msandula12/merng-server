import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import App from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

// Automatically add Authorization header if there's a token
const authLink = setContext(() => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
