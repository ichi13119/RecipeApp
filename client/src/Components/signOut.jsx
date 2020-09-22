import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from'@apollo/client';

const signOut = (client, history) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/');
};

const SignOut = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <button
        className="headerItem signoutButton"
        onClick={() => signOut(client, history)} 
      >
        Signout
      </button>
      )
    }}
  </ApolloConsumer>
);

export default withRouter(SignOut);