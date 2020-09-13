import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';

const httpUrl = 'http://localhost:9000/graphql';

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
      const token = localStorage.getItem('token');
      if (token) {
        operation.setContext({ headers: { 'authorization': `Bearer ${token}`}});
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