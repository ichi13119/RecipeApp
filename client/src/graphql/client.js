import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';
import decode from 'jwt-decode';

const httpUrl = 'http://localhost:9000/graphql';

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    if (token) {
      const { exp } = decode(token);
      if (Date.now() <= exp * 1000){
        operation.setContext({ headers: { 'authorization': `Bearer ${token}`}});
        }
      } else {
      localStorage.setItem('token', '');
    }
    return forward(operation);
  }),
  new HttpLink({
    uri: httpUrl
  })
]);

const client = new ApolloClient({
  link: httpLink,
    fetchOptions: {
      credentials: 'include'
    },
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'no-cache'}},
});

export default client;