import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';

const httpUrl = 'http://localhost:9000/graphql';

const httpLink = ApolloLink.from([
  new HttpLink({ uri: httpUrl })
]);

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'no-cache'}}
});

export default client;